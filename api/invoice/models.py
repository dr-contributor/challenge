import uuid
from django.contrib.auth.models import User as Investor
from django.db import models

class BaseModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True

class PaymentDetails(BaseModel):
  iban = models.CharField(max_length=34)
  provider = models.CharField(max_length=255)
  address = models.CharField(max_length=255)

class Investment(BaseModel):
  name = models.CharField(max_length=50, null=False)
  description = models.CharField(max_length=255, null=True)
  upfront_fees = models.BooleanField(default=False)
  fee_percentage = models.DecimalField(null=False, decimal_places=2, max_digits=3)
  amount_invested = models.DecimalField(null=False, decimal_places=2, max_digits=20)
  investor = models.ForeignKey(Investor, on_delete=models.DO_NOTHING, blank=False, null=False)

  class Meta:
    constraints = [models.UniqueConstraint(fields=["name", "investor_id"], name="unique_investment_name_by_investor")]

class Invoice(BaseModel):
  class InvoiceStatus(models.TextChoices):
    VALIDATED = "validated"
    SENT = "sent"
    PAID = "paid"
    OVERDUE = "overdue"

  number = models.CharField(max_length=20, unique=True)
  issued_date = models.DateField(null=False)
  due_date = models.DateField(null=False)
  investor = models.ForeignKey(Investor, on_delete=models.DO_NOTHING, blank=False, null=False)
  status = models.CharField(max_length=50, choices=InvoiceStatus.choices)
  payment_details = models.ForeignKey(PaymentDetails, on_delete=models.DO_NOTHING, blank=False, null=False)

class Bill(BaseModel):
  class BillType(models.TextChoices):
    SUBSCRIPTION = "subscription"
    FEES = "fees"

  bill_type = models.CharField(max_length=50, choices=BillType.choices, null=False)
  total = models.DecimalField(null=False, decimal_places=2, max_digits=20)
  date = models.DateField(null=False)
  investment = models.ForeignKey(Investment, on_delete=models.DO_NOTHING, blank=True, null=True)
  invoice = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, blank=True, null=True)
