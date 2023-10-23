from django.contrib.auth.models import User as Investor
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import InvestorSerializer

class InvestorListApiView(APIView):
  def get(self, request):
    investors = Investor.objects.all()

    serializer = InvestorSerializer(investors, many=True)
    return Response({'investors': serializer.data, 'pagination': {}})
