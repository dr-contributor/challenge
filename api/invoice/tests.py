import pytest
from datetime import datetime, date
from decimal import *
from django.core.management import call_command
from django.contrib.auth.models import User as Investor
from invoice.models import Bill, Investment
from invoice.services import bill_generator

@pytest.fixture(scope="module")
def django_db_setup(django_db_setup, django_db_blocker):
  with django_db_blocker.unblock():
    call_command('loaddata', 'test_data.json')

@pytest.mark.django_db
def test_no_subscription_bill_for_more_than_fifty_thousand_invested():
  bill_generator.generate_bills()
  bills = Bill.objects.filter(investor_id = 3, bill_type = Bill.BillType.SUBSCRIPTION)

  assert len(bills) == 0 # user invested more than 50_000

@pytest.mark.django_db
def test_generates_subscription_bill_if_does_not_exists():
  bill_generator.generate_bills()
  bill = Bill.objects.get(investor_id = 1, bill_type = Bill.BillType.SUBSCRIPTION)

  assert bill.total == 3000

@pytest.mark.django_db
def test_no_subscription_bill_for_year_if_one_exists():
  bill_generator.generate_bills()
  bills = Bill.objects.filter(investor_id = 2, bill_type = Bill.BillType.SUBSCRIPTION, date = date.today())

  assert len(bills) == 0

@pytest.mark.django_db
def test_bill_for_upfront_fees():
  bill_generator.generate_bills()

  bill_upfront_fees = Bill.objects.get(investment_id = "000199fb-7353-4388-8528-797866930574")
  investment_upfront_fees = bill_upfront_fees.investment
  expected = (5 * investment_upfront_fees.fee_percentage * investment_upfront_fees.amount_invested)
  assert bill_upfront_fees.total == expected

@pytest.mark.django_db
def test_no_bill_for_subsequent_years_after_upfront_fees():
  bill_generator.generate_bills()

  bills = Bill.objects.filter(investor_id = 4, bill_type = Bill.BillType.FEES)
  assert len(bills) == 1
  assert bills.first().date.year == 2020

@pytest.mark.django_db
def test_calculates_fees_for_investment_before_04_2019():
  bill_generator.generate_bills()

  bill_before_2019_04 = Bill.objects.get(investment_id = "ade25d9d-0969-4d76-91ff-974dda50c04e")
  investment_before_2019_04 = bill_before_2019_04.investment
  assert bill_before_2019_04.total == (investment_before_2019_04.fee_percentage * investment_before_2019_04.amount_invested)

@pytest.mark.django_db
def test_calculates_fees_for_investment_for_current_year():
  getcontext().prec = 5
  now = datetime.now()
  day_of_year = now.timetuple().tm_yday
  bill_generator.generate_bills()

  bill_current_year = Bill.objects.get(investment_id = "398ccbdf-b278-4b3e-82da-336cc193562d")
  investment_current_year = bill_current_year.investment
  expected = (Decimal(day_of_year / 365) * investment_current_year.fee_percentage * investment_current_year.amount_invested)
  assert bill_current_year.total == expected

@pytest.mark.django_db
def test_calculates_fees_for_investment_after_several_years_invested():
  getcontext().prec = 5
  now = datetime.now()
  bill_generator.generate_bills()

  bill_years_invested = Bill.objects.get(investment_id = "8bf226c4-b4c5-4104-97b3-e4f11c96604e")
  investment_years_invested = bill_years_invested.investment
  expected = ((investment_years_invested.fee_percentage - Decimal(0.01)) * investment_years_invested.amount_invested)
  assert bill_years_invested.total == expected
