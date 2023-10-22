from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BillSerializer
from invoice.models import Bill

class BillListApiView(APIView):
  def get(self, request):
    bill = Bill.objects.all()

    serializer = BillSerializer(bill, many=True)
    return Response({'bills': serializer.data, 'pagination': {}})
