from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User as Investor
from .serializers import InvestmentSerializer
from invoice.models import Investment

class InvestmentListApiView(APIView):
  def get(self, request):
    investment = Investment.objects.all()

    serializer = InvestmentSerializer(investment, many=True)
    return Response({'investments': serializer.data, 'pagination': {}})

  def post(self, request):
    name = request.data.get("name")
    description = request.data.get("description")
    upfront_fees = request.data.get("upfront_fees")
    fee_percentage = request.data.get("fee_percentage")
    amount_invested = request.data.get("amount_invested")
    investor_id = request.data.get("investor_id")

    investor = get_object_or_404(Investor, pk=investor_id)
    investment = Investment.objects.filter(name=name, investor_id=investor.id)

    if (len(investment) > 0):
      return Response({"message": f'investor with id {investor.id} already invested in {name}'}, status=status.HTTP_400_BAD_REQUEST)

    data = {
      "name": name,
      "description": description,
      "upfront_fees": upfront_fees,
      "fee_percentage": fee_percentage,
      "amount_invested": amount_invested,
      "investor": investor.id
    }

    serializer = InvestmentSerializer(data=data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    else:
      return Response({"message": f'investment not valid {serializer.errors}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class InvestmentApiView(APIView):
  def get(self, request, id):
    investment = get_object_or_404(Investment, pk=id)
    serializer = InvestmentSerializer(investment)

    return Response(serializer.data)

  def patch(self, request, id):
    investmentToUpdate = get_object_or_404(Investment, pk=id)
    name = request.data.get("name")
    description = request.data.get("description")
    upfront_fees = request.data.get("upfront_fees")
    fee_percentage = request.data.get("fee_percentage")
    amount_invested = request.data.get("amount_invested")
    investor_id = request.data.get("investor_id")

    investor = get_object_or_404(Investor, pk=investor_id)
    investment = Investment.objects.filter(name=name, investor_id=investor.id)

    # if the investor gets updated, the check is performed
    if (investmentToUpdate.investor.id != investor_id and len(investment) > 0):
      return Response({"message": f'investor with id {investor.id} already invested in {name}'}, status=status.HTTP_400_BAD_REQUEST)

    data = {
      "name": name,
      "description": description,
      "upfront_fees": upfront_fees,
      "fee_percentage": fee_percentage,
      "amount_invested": amount_invested,
      "investor": investor.id
    }

    serializer = InvestmentSerializer(instance=investmentToUpdate, data=data)
    if (serializer.is_valid()):
      serializer.save()
      return Response(serializer.data)
    else:
      return Response({"message": f'outcome not valid {serializer.errors}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  def delete(self, request, id):
    investment = get_object_or_404(Investment, pk=id)

    investment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
