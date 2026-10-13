from django.db.models import DO_NOTHING
from django.db import models


# =====================================================================
# UNIFIED ECOSYSTEM INVENTORY & PRODUCT MODELS
# =====================================================================

class Inventory(models.Model):
    item_id = models.AutoField(primary_key=True)
    tenant = models.ForeignKey('Tenants', DO_NOTHING, db_column='tenant_id', blank=True, null=True)
    item_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True, blank=True, null=True)
    stock_quantity = models.IntegerField(default=0)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    warning_threshold = models.IntegerField(default=0)

    class Meta:
        managed = False
        db_table = 'inventory'
        ordering = ["item_name"]

    def __str__(self):
        return f"{self.item_name} (Stock: {self.stock_quantity})"

    @property
    def name(self):
        return self.item_name

    @property
    def current_stock(self):
        return self.stock_quantity

    @property
    def selling_price(self):
        return self.unit_price

    @property
    def stock_status(self):
        if self.stock_quantity <= self.warning_threshold:
            return "low"
        return "healthy"


class Product(Inventory):
    class Meta:
        proxy = True
        app_label = "inventory"
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["item_name"]

    def __str__(self):
        return f"{self.item_name} (Stock: {self.stock_quantity})"


class InventoryMovement(models.Model):
    MOVEMENT_TYPES = [
        ("IN", "Inward"),
        ("OUT", "Outward"),
        ("ADJUST", "Adjustment"),
        ("RETURN", "Return"),
    ]

    item = models.ForeignKey(Inventory, on_delete=models.CASCADE, related_name="movements", db_column="item_id")
    movement_type = models.CharField(max_length=20, choices=MOVEMENT_TYPES)
    quantity = models.IntegerField(default=0)
    reference = models.CharField(max_length=120, blank=True, default="")
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'inventory_movement'

    def __str__(self):
        return f"{self.item.item_name} {self.movement_type} {self.quantity}"


# =====================================================================
# AUTO-GENERATED DATABASE TABLES FROM YOUR SQL SCHEMA
# =====================================================================

class AuditLogs(models.Model):
    operator_id = models.IntegerField()
    operator_username = models.CharField(max_length=100)
    action = models.CharField(max_length=120)
    module = models.CharField(max_length=80)
    resource_id = models.CharField(max_length=100, blank=True, null=True)
    detail = models.TextField(blank=True, null=True)
    ip_address = models.CharField(max_length=45, blank=True, null=True)
    user_agent = models.CharField(max_length=255, blank=True, null=True)
    metadata = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'audit_logs'


class CompanyProfiles(models.Model):
    tenant_code = models.CharField(unique=True, max_length=80)
    company_name = models.CharField(max_length=255)
    trade_name = models.CharField(max_length=255, blank=True, null=True)
    owner_name = models.CharField(max_length=255, blank=True, null=True)
    gstin = models.CharField(max_length=32, blank=True, null=True)
    pan = models.CharField(max_length=20, blank=True, null=True)
    cin = models.CharField(max_length=30, blank=True, null=True)
    license_number = models.CharField(max_length=100, blank=True, null=True)
    license_valid_till = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=150, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    bank_name = models.CharField(max_length=150, blank=True, null=True)
    bank_account = models.CharField(max_length=50, blank=True, null=True)
    ifsc_code = models.CharField(max_length=20, blank=True, null=True)
    invoice_prefix = models.CharField(max_length=50, blank=True, null=True)
    footer_note = models.TextField(blank=True, null=True)
    is_active = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'company_profiles'


class CustomerLedgers(models.Model):
    invoice_no = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'customer_ledgers'


class Invoices(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    tenant = models.ForeignKey('Tenants', DO_NOTHING, db_column='tenant_id', blank=True, null=True)
    grand_total = models.DecimalField(max_digits=12, decimal_places=2)
    payment_mode = models.CharField(max_length=50)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'invoices'


class Ledger(models.Model):
    ref = models.CharField(max_length=50)
    timestamp = models.DateTimeField()
    debit = models.CharField(max_length=100)
    credit = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'ledger'


class Orders(models.Model):
    reference = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=150)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'orders'


class PaymentReceipts(models.Model):
    tx_ref = models.CharField(unique=True, max_length=100)
    customer_name = models.CharField(max_length=150)
    invoice_refs = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'payment_receipts'


class PaymentReminders(models.Model):
    invoice_no = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=150)
    medium = models.CharField(max_length=20)
    contact = models.CharField(max_length=150)
    reminder_link = models.CharField(max_length=255)
    sent_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'payment_reminders'


class SystemLogs(models.Model):
    type = models.CharField(max_length=20)
    message = models.TextField()
    detail = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'system_logs'


class SystemOperators(models.Model):
    fullname = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    email = models.CharField(unique=True, max_length=150)
    username = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=255)
    security_key = models.CharField(max_length=6)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'system_operators'


class Tenants(models.Model):
    tenant_id = models.AutoField(primary_key=True)
    business_name = models.CharField(max_length=255)
    gst_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'tenants'


class Warehouses(models.Model):
    code = models.CharField(unique=True, max_length=50)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table='warehouses'


class Wholesalers(models.Model):
    firm_name = models.CharField(max_length=255)
    gstin = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    ifsc_code = models.CharField(max_length=20, blank=True, null=True)
    status = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'wholesalers'