from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import PaymentDetailsSerializer
from invoice.models import PaymentDetails

class PaymentDetailsListApiView(APIView):
  def get(self, request):
    payment_details = PaymentDetails.objects.all()

    serializer = PaymentDetailsSerializer(payment_details, many=True)
    return Response({'payment_details': serializer.data, 'pagination': {}})

  def post(self, request):
    iban = request.data.get("iban")
    provider = request.data.get("provider")
    address = request.data.get("address")

    data = {
      "iban": iban,
      "provider": provider,
      "address": address
    }

    serializer = PaymentDetailsSerializer(data=data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    else:
      return Response({"message": f'outcome not valid {serializer.errors}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class PaymentDetailsApiView(APIView):
  def get(self, request, id):
    payment_detail = get_object_or_404(PaymentDetails, pk=id)
    serializer = PaymentDetailsSerializer(payment_detail)

    return Response(serializer.data)

  def patch(self, request, id):
    payment_details = get_object_or_404(PaymentDetails, pk=id)
    iban = request.data.get("iban")
    provider = request.data.get("provider")
    address = request.data.get("address")

    data = {
      "iban": iban,
      "provider": provider,
      "address": address
    }

    serializer = PaymentDetailsSerializer(instance=payment_details, data=data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    else:
      return Response({"message": f'payment details not valid {serializer.errors}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  def delete(self, request, id):
    payment_detail = get_object_or_404(PaymentDetails, pk=id)

    payment_detail.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
