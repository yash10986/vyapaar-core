from django.contrib import admin
from .models import (
    Product, CompanyProfiles, 
    CustomerLedgers, Inventory, Invoices, 
    Ledger, Orders, PaymentReceipts, 
    PaymentReminders, SystemLogs, SystemOperators, 
    Tenants, Warehouses, Wholesalers
)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    change_list_template = "admin/inventory_live_refresh.html"
    list_display = ["item_id", "sku", "item_name", "stock_quantity", "unit_price", "warning_threshold"]
    search_fields = ["item_name"]
    ordering = ["item_name"]

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    change_list_template = "admin/inventory_live_refresh.html"
    list_display = ["item_id", "sku", "item_name", "stock_quantity", "unit_price", "warning_threshold"]
    search_fields = ["item_name"]
    ordering = ["item_name"]

# Registering all your other Vyapaar Core database tables
admin.site.register(CompanyProfiles)
admin.site.register(CustomerLedgers)
admin.site.register(Invoices)
admin.site.register(Ledger)
admin.site.register(Orders)
admin.site.register(PaymentReceipts)
admin.site.register(PaymentReminders)
admin.site.register(SystemLogs)
admin.site.register(SystemOperators)
admin.site.register(Tenants)
admin.site.register(Warehouses)
admin.site.register(Wholesalers)