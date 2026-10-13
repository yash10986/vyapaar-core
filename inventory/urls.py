from django.urls import path

from .views import inventory_home, inventory_items, restock_item, create_or_update_product, delete_product

urlpatterns = [
    path("", inventory_home, name="inventory-home"),
    path("items/", inventory_items, name="inventory-items"),
    path("restock/", restock_item, name="inventory-restock"),
    path("product/", create_or_update_product, name="inventory-product-create-update"),
    path("product/delete/", delete_product, name="inventory-product-delete"),
]