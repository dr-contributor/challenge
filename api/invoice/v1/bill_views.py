from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from invoice.services import bill_generator
from .serializers import BillSerializer
from invoice.models import Bill

class BillListApiView(APIView):
  def get(self, request):
    investor_id = request.query_params.get('investor')
    bills = Bill.objects.all()

    if (investor_id is not None):
      bills = bills.filter(investor_id = investor_id)

    serializer = BillSerializer(bills, many=True)
    return Response({'bills': serializer.data, 'pagination': {}})

class BillGenerationApiView(APIView):
  def post(self, request):
    bills = bill_generator.generate_bills()

    return Response({"bills_created": BillSerializer(bills, many=True).data})
