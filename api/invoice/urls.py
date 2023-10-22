from django.urls import path
from .v1 import (
  payment_detail_views,
  investment_views,
  invoice_views,
  bill_views
)

urlpatterns = [
  path("v1/payment-details", payment_detail_views.PaymentDetailsListApiView.as_view()),
  path("v1/payment-details/<uuid:id>", payment_detail_views.PaymentDetailsApiView.as_view()),
  path("v1/investments", investment_views.InvestmentListApiView.as_view()),
  path("v1/investments/<uuid:id>", investment_views.InvestmentApiView.as_view()),
  path("v1/invoices", invoice_views.InvoiceListApiView.as_view()),
  path("v1/invoices/<uuid:id>", invoice_views.InvoiceApiView.as_view()),
  path("v1/bills", bill_views.BillListApiView.as_view()),
  path("v1/bills/generate", bill_views.BillGenerationApiView.as_view())
]
