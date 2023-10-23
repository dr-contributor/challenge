import uuid
from django.contrib.auth.models import User as Investor
from django.db import models
from invoice import validators

class BaseModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    abstract = True

class PaymentDetails(BaseModel):
  iban = models.CharField(max_length=34, validators=[validators.iban_validator])
  provider = models.CharField(max_length=255)
  address = models.CharField(max_length=255)

class Investment(BaseModel):
  name = models.CharField(max_length=50, null=False)
  description = models.CharField(max_length=255, null=True)
  upfront_fees = models.BooleanField(default=False)
  fee_percentage = models.DecimalField(null=False, decimal_places=2, max_digits=3)
  amount_invested = models.DecimalField(null=False, decimal_places=2, max_digits=20)
  investor = models.ForeignKey(Investor, on_delete=models.DO_NOTHING, blank=False, null=False)

  @property
  def investor_user(self):
    return self.investor

  class Meta:
    constraints = [models.UniqueConstraint(fields=["name", "investor_id"], name="unique_investment_name_by_investor")]

class Invoice(BaseModel):
  class InvoiceStatus(models.TextChoices):
    VALIDATED = "validated"
    SENT = "sent"
    PAID = "paid"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"

  number = models.CharField(max_length=20, unique=True)
  issued_date = models.DateField(null=False)
  due_date = models.DateField(null=False)
  investor = models.ForeignKey(Investor, on_delete=models.DO_NOTHING, blank=False, null=False)
  status = models.CharField(max_length=50, choices=InvoiceStatus.choices)
  payment_details = models.ForeignKey(PaymentDetails, on_delete=models.DO_NOTHING, blank=False, null=False)

  @property
  def investor_user(self):
    return self.investor
  
  @property
  def payment_details_object(self):
    return self.payment_details

class Bill(BaseModel):
  class BillType(models.TextChoices):
    SUBSCRIPTION = "subscription"
    FEES = "fees"

  bill_type = models.CharField(max_length=50, choices=BillType.choices, null=False)
  total = models.DecimalField(null=False, decimal_places=2, max_digits=20)
  date = models.DateField(null=False)
  investor = models.ForeignKey(Investor, on_delete=models.DO_NOTHING, blank=False, null=False)
  investment = models.ForeignKey(Investment, on_delete=models.DO_NOTHING, blank=True, null=True)
  invoice = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, blank=True, null=True)

  @property
  def investor_user(self):
    return self.investor
  
  @property
  def investment_object(self):
    return self.investment
  
  @property
  def invoice_object(self):
    return self.invoice
