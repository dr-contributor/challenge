from datetime import datetime, date
from decimal import Decimal
from django.contrib.auth.models import User as Investor
from django.db import transaction
from django.db.models import Sum
from invoice.models import Bill, Invoice, Investment

@transaction.atomic(using="default")
def generate_bills():
  print("generating bills....")
  now = datetime.now()
  current_year = now.year
  day_of_year = now.timetuple().tm_yday
  investors = Investor.objects.filter(is_active=True)

  bills_created = []
  for investor in investors:
    bills = Bill.objects.filter(investor_id = investor.id, bill_type = Bill.BillType.SUBSCRIPTION, date__year = current_year)
    investments = Investment.objects.filter(investor_id = investor.id)
    if (len(bills) == 0):
      total_invested = investments.aggregate(Sum('amount_invested'))['amount_invested__sum']
      if (total_invested < 50_000):
        bill = Bill(
          bill_type = Bill.BillType.SUBSCRIPTION,
          total = 3_000,
          date = date.today(),
          investor_id = investor.id
        )

        bill.save()
        bills_created.append(bill)

    for investment in investments:
      bills = Bill.objects.filter(investment_id = investment.id)
      if (investment.upfront_fees):
        if (len(bills) == 0):
          bill = Bill(
            bill_type = Bill.BillType.FEES,
            total = investment.fee_percentage * investment.amount_invested * 5,
            date = date.today(),
            investment_id = investment.id,
            investor_id = investor.id
          )

          bill.save()
          bills_created.append(bill)
      else:
        bills = bills.filter(date__year = current_year)
        if (len(bills) == 0):
          invested_at = investment.created_at
          years_invested = current_year - invested_at.year
          first_year = years_invested == 0
          fees = 0

          # months start from 0, so 3 (April) is equivalent to 2019/04
          if (invested_at.month < 3 and invested_at.year <= 2019):
            if (first_year):
              fees = Decimal(day_of_year / 365) * investment.fee_percentage * investment.amount_invested
            else:
              fees = investment.fee_percentage * investment.amount_invested
          else:
            if (first_year):
              fees = Decimal(day_of_year / 365) * investment.fee_percentage * investment.amount_invested
            elif (years_invested == 1):
              fees = investment.fee_percentage * investment.amount_invested
            elif (years_invested == 2):
              fees = (investment.fee_percentage - Decimal(0.002)) * investment.amount_invested
            elif (years_invested == 3):
              fees = (investment.fee_percentage - Decimal(0.005)) * investment.amount_invested
            else:
              fees = (investment.fee_percentage - Decimal(0.01)) * investment.amount_invested

          bill = Bill(
            bill_type = Bill.BillType.FEES,
            total = fees,
            date = date.today(),
            investment_id = investment.id,
            investor_id = investor.id
          )

          bill.save()
          bills_created.append(bill)
    
  return bills_created
