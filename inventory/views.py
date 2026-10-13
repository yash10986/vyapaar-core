import json

from django.db import models
from django.db.models import Sum
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Inventory, InventoryMovement, Product


def product_sku(item_id):
    return f"VYP-SKU-{int(item_id):04d}"


def add_cors_headers(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


def inventory_home(request):
    # Renders your main Vyapaar Core dashboard template
    return render(request, "index.html", {
        "operator_user": "Enterprise Operator",
        "user_email": "operator@vyapaarcore.local",
        "user_role": "Administrator",
    })


def inventory_items(request):
    for item in Product.objects.filter(sku__isnull=True):
        item.sku = product_sku(item.item_id)
        item.save(update_fields=["sku"])

    items = Product.objects.all().values(
        "item_id",
        "item_name",
        "sku",
        "stock_quantity",
        "unit_price",
        "warning_threshold",
    )
    # Map fields to match legacy frontend keys for total ecosystem sync
    mapped_items = []
    for item in items:
        mapped_items.append({
            "id": item["item_id"],
            "item_id": item["item_id"],
            "name": item["item_name"],
            "sku": item["sku"] or product_sku(item["item_id"]),
            "category": "OTHERS",
            "opening_stock": item["stock_quantity"],
            "current_stock": item["stock_quantity"],
            "reorder_level": item["warning_threshold"],
            "purchase_price": float(item["unit_price"]),
            "selling_price": float(item["unit_price"]),
            "gst_rate": 0.0,
            "last_updated": "",
        })
    response = JsonResponse({"items": mapped_items})
    return add_cors_headers(response)


def read_json_or_form(request):
    if request.content_type and "application/json" in request.content_type.lower():
        try:
            payload = json.loads(request.body.decode("utf-8") or "{}")
            if isinstance(payload, dict):
                return payload
        except (TypeError, ValueError):
            return {}
    return request.POST


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def restock_item(request):
    if request.method == "OPTIONS":
        response = JsonResponse({"status": "ok"})
        return add_cors_headers(response)

    payload = read_json_or_form(request)
    item_id = payload.get("item_id") or request.POST.get("item_id")
    quantity = int(payload.get("quantity", 0) or request.POST.get("quantity", 0) or 0)
    notes = payload.get("notes", "") or request.POST.get("notes", "")

    if not item_id or quantity <= 0:
        response = JsonResponse({"status": "error", "message": "Valid item_id and quantity are required."}, status=400)
        return add_cors_headers(response)

    item = Product.objects.filter(item_id=item_id).first()
    if not item:
        response = JsonResponse({"status": "error", "message": "Inventory item not found."}, status=404)
        return add_cors_headers(response)

    item.stock_quantity += quantity
    item.save(update_fields=["stock_quantity"])

    InventoryMovement.objects.create(
        item=item,
        movement_type="IN",
        quantity=quantity,
        reference="restock",
        notes=notes or "Stock replenishment via backend API",
    )

    response = JsonResponse({
        "status": "ok",
        "message": f"Restocked {item.item_name} by {quantity} units.",
        "current_stock": item.stock_quantity,
    })
    return add_cors_headers(response)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def create_or_update_product(request):
    if request.method == "OPTIONS":
        response = JsonResponse({"status": "ok"})
        return add_cors_headers(response)

    try:
        payload = read_json_or_form(request)
        product_id = str(payload.get("item_id") or payload.get("id") or "").strip() or None
        name = str(payload.get("name", "") or "").strip()
        current_stock = int(payload.get("current_stock", 0) or 0)
        reorder_level = int(payload.get("reorder_level", 0) or 0)
        selling_price = float(payload.get("selling_price", 0) or 0)

        if not name or selling_price <= 0:
            response = JsonResponse(
                {"status": "error", "message": "Name and Selling Price are required."},
                status=400
            )
            return add_cors_headers(response)

        # Create or update product
        if product_id:
            item = Product.objects.filter(item_id=product_id).first()
            if not item:
                response = JsonResponse(
                    {"status": "error", "message": "Product not found."},
                    status=404
                )
                return add_cors_headers(response)
            item.item_name = name
            item.stock_quantity = current_stock
            item.warning_threshold = reorder_level
            item.unit_price = selling_price
            if not item.sku:
                item.sku = product_sku(item.item_id)
            item.save()
            action = "updated"
        else:
            item = Product.objects.create(
                item_name=name,
                stock_quantity=current_stock,
                warning_threshold=reorder_level,
                unit_price=selling_price,
                sku=None
            )
            item.sku = product_sku(item.item_id)
            item.save(update_fields=["sku"])
            action = "created"

        response = JsonResponse({
            "status": "ok",
            "message": f"Product {action} successfully: {item.item_name}",
            "product": {
                "id": item.item_id,
                "item_id": item.item_id,
                "name": item.item_name,
                "sku": item.sku or product_sku(item.item_id),
                "category": "OTHERS",
                "current_stock": item.stock_quantity,
                "reorder_level": item.warning_threshold,
                "selling_price": str(item.unit_price),
            }
        })
        return add_cors_headers(response)

    except Exception as e:
        response = JsonResponse(
            {"status": "error", "message": f"Server error: {str(e)}"},
            status=500
        )
        return add_cors_headers(response)


@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def delete_product(request):
    if request.method == "OPTIONS":
        response = JsonResponse({"status": "ok"})
        return add_cors_headers(response)

    try:
        payload = read_json_or_form(request)
        product_id = str(payload.get("item_id") or payload.get("id") or "").strip()
        
        if not product_id:
            response = JsonResponse(
                {"status": "error", "message": "Product ID is required."},
                status=400
            )
            return add_cors_headers(response)

        item = Product.objects.filter(item_id=product_id).first()
        if not item:
            response = JsonResponse(
                {"status": "error", "message": "Product not found."},
                status=404
            )
            return add_cors_headers(response)

        product_name = item.item_name
        item.delete()

        response = JsonResponse({
            "status": "ok",
            "message": f"Product deleted: {product_name}",
        })
        return add_cors_headers(response)

    except Exception as e:
        response = JsonResponse(
            {"status": "error", "message": f"Server error: {str(e)}"},
            status=500
        )
        return add_cors_headers(response)