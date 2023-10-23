from django.contrib.auth.models import User as Investor
from rest_framework import serializers
from invoice.models import PaymentDetails, Investment, Invoice, Bill

class InvestorSerializer(serializers.ModelSerializer):
  class Meta:
     model = Investor
     fields = ('id', 'email', 'username', 'first_name', 'last_name', 'is_active', 'is_staff')

class PaymentDetailsSerializer(serializers.ModelSerializer):
  class Meta:
     model = PaymentDetails
     fields = ('id', 'iban', 'provider', 'address', 'created_at', 'updated_at')

class InvestmentSerializer(serializers.ModelSerializer):
  investor_user = InvestorSerializer(read_only=True)

  class Meta:
     model = Investment
     fields = ('id', 'name', 'description', 'upfront_fees', 'fee_percentage', 'amount_invested', 'investor', 'investor_user', 'created_at', 'updated_at')

class InvoiceBillSerializer(serializers.ModelSerializer):
  class Meta:
    model = Invoice
    fields = ('id', 'number')

class BillSerializer(serializers.ModelSerializer):
  investor_user = InvestorSerializer(read_only=True)
  investment_object = InvestmentSerializer(read_only=True)
  invoice_object = InvoiceBillSerializer(read_only=True)

  class Meta:
     model = Bill
     fields = ('id', 'bill_type', 'total', 'date', 'investor', 'investor_user', 'investment', 'investment_object', 'invoice', 'invoice_object')

class InvoiceSerializer(serializers.ModelSerializer):
  bills = BillSerializer(source="bill_set", many=True, read_only=True)
  investor_user = InvestorSerializer(read_only=True)
  payment_details_object = PaymentDetailsSerializer(read_only=True)

  class Meta:
     model = Invoice
     fields = ('id', 'number', 'issued_date', 'due_date', 'investor', 'investor_user', 'status', 'payment_details', 'payment_details_object', 'bills')
