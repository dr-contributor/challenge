import uuid
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction

from django.contrib.auth.models import User as Investor
from .serializers import InvoiceSerializer, BillSerializer
from invoice.models import Invoice, PaymentDetails, Bill

class InvoiceListApiView(APIView):
  def get(self, request):
    invoice = Invoice.objects.all()

    serializer = InvoiceSerializer(invoice, many=True)
    return Response({'invoices': serializer.data, 'pagination': {}})

  def post(self, request):
    number = request.data.get("number")
    issued_date = request.data.get("issued_date")
    due_date = request.data.get("due_date")
    investor_id = request.data.get("investor_id")
    invoice_status = request.data.get("status")
    payment_details_id = request.data.get("payment_details_id")
    bill_ids = request.data.get("bills")

    if (bill_ids is None or len(bill_ids) == 0):
      return Response({"message": f'invoice {number} must have at least one bill associated'})

    bill_ids = [uuid.UUID(el) for el in bill_ids]
    bills = Bill.objects.filter(id__in=bill_ids)

    investor = get_object_or_404(Investor, pk=investor_id)
    payment_details = get_object_or_404(PaymentDetails, pk=payment_details_id)
    invoice = Invoice.objects.filter(number=number)

    if (len(invoice) > 0):
      return Response({"message": f'invoice {number} already exists'})

    if (len(bills) == 0):
      return Response({"message": f'invoice {number} must have at least one bill associated'})

    data = {
      "number": number,
      "issued_date": issued_date,
      "due_date": due_date,
      "investor": investor.id,
      "status": invoice_status,
      "payment_details": payment_details.id
    }

    serializer = InvoiceSerializer(data=data)
    if (serializer.is_valid()):
      with transaction.atomic(using="default"):
        invoice = serializer.save()
        for bill in bills:
          invoice.bill_set.add(bill)

        invoice.save()
      return Response(serializer.data)
    else:
      return Response({"message": f'invoice not valid {serializer.errors}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class InvoiceApiView(APIView):
  def get(self, request, id):
    invoice = get_object_or_404(Invoice, pk=id)
    serializer = InvoiceSerializer(invoice)

    return Response(serializer.data)
  
  def delete(self, request, id):
    invoice = get_object_or_404(Invoice, pk=id)

    invoice.status = Invoice.InvoiceStatus.CANCELLED
    invoice.bill_set.clear()
    invoice.save()
    return Response(status=status.HTTP_204_NO_CONTENT)
