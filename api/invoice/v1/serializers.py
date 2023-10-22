from rest_framework import serializers
from invoice.models import PaymentDetails, Investment, Invoice, Bill

class PaymentDetailsSerializer(serializers.ModelSerializer):
  class Meta:
     model = PaymentDetails
     fields = ('id', 'iban', 'provider', 'address', 'created_at', 'updated_at')

class InvestmentSerializer(serializers.ModelSerializer):
  class Meta:
     model = Investment
     fields = ('id', 'name', 'description', 'upfront_fees', 'fee_percentage', 'amount_invested', 'investor')

class BillSerializer(serializers.ModelSerializer):
  class Meta:
     model = Bill
     fields = ('id', 'bill_type', 'total', 'date', 'investor', 'investment', 'invoice')

class InvoiceSerializer(serializers.ModelSerializer):
  bills = BillSerializer(source="bill_set", many=True, read_only=True)

  class Meta:
     model = Invoice
     fields = ('id', 'number', 'issued_date', 'due_date', 'investor', 'status', 'payment_details', 'bills')
