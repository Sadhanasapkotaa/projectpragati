from django.urls import path
from .views import EsewaInitiateView, EsewaVerifyView, KhaltiInitiateView, KhaltiVerifyView, CreatePaymentIntentView

urlpatterns = [
    path('esewa-initiate/', EsewaInitiateView.as_view(), name='esewa-initiate'),
    path('esewa-verify/', EsewaVerifyView.as_view(), name='esewa-verify'),
    path('khalti-initiate/', KhaltiInitiateView.as_view(), name='khalti-initiate'),
    path('khalti-verify/', KhaltiVerifyView.as_view(), name='khalti-verify'),
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),

]