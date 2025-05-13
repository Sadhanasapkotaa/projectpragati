import base64
import json
from .serializers import (
    EsewaVerificationSerializer,
    EsewaInitiateSerializer,
    KhaltiInitiateSerializer,
    KhaltiVerifySerializer
)
import stripe
import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import generate_signature
import json
# import requests  # Remove this line

import urllib.request
import urllib.error

from django.conf import settings
from rest_framework.permissions import AllowAny
# import uuid
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import EsewaInitiateSerializer
# from .utils import generate_signature  # your helper
# import json

stripe.api_key = settings.STRIPE_SECRET_KEY

class EsewaInitiateView(APIView):
    def post(self, request):
        serializer = EsewaInitiateSerializer(data=request.data)
        if serializer.is_valid():
            total_amount = serializer.validated_data['total_amount']
            transaction_uuid = str(uuid.uuid4())
            product_code = "EPAYTEST"
            secret_key = "8gBm/:&EnhH.1/q"

            # Use only fields required for signature, in exact order
            signed_field_names = "total_amount,transaction_uuid,product_code"
            message = f"total_amount={float(total_amount):.2f},transaction_uuid={transaction_uuid},product_code={product_code}"
            signature = generate_signature(secret_key, message)

            form_data = {
                "amount": f"{float(total_amount) - 10:.2f}",  # adjust based on tax
                "tax_amount": "10.00",
                "total_amount": f"{float(total_amount):.2f}",
                "transaction_uuid": transaction_uuid,
                "product_code": product_code,
                "product_service_charge": "0.00",
                "product_delivery_charge": "0.00",
                "success_url": "http://localhost:3000/subscription-plans/subscription/esewa/success",
                "failure_url": "http://localhost:3000/subscription-plans/subscription/esewa/failure",
                "signed_field_names": signed_field_names,
                "signature": signature,
                "esewa_redirect_url": "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            }

            return Response(form_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EsewaVerifyView(APIView):
    def post(self, request):
        serializer = EsewaVerificationSerializer(data=request.data)
        if serializer.is_valid():
            encoded_data = serializer.validated_data['encoded_response']
            try:
                decoded = base64.b64decode(encoded_data).decode('utf-8')
                data = json.loads(decoded)

                signed_field_names = data.get("signed_field_names")
                received_signature = data.get("signature")

                # Check for missing fields
                fields = signed_field_names.split(",") if signed_field_names else []
                missing_fields = [field for field in fields if field not in data]
                if missing_fields:
                    return Response({"error": f"Missing fields: {', '.join(missing_fields)}"}, status=400)

                # Recreate message and generate signature
                message = ",".join([f"{field}={data[field]}" for field in fields])
                secret_key = "8gBm/:&EnhH.1/q"
                generated_signature = generate_signature(secret_key, message)

                if received_signature == generated_signature:
                    return Response({"status": "verified", "data": data})
                else:
                    return Response({"status": "signature_mismatch"}, status=400)

            except Exception as e:
                return Response({"error": str(e)}, status=400)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class KhaltiInitiateView(APIView):
    def post(self, request):
        try:
            data = request.data
            purchase_order_id = str(uuid.uuid4())
            payload = {
                "return_url": "http://localhost:3000/subscription-plans/subscription/khalti",  # Changed return URL
                "website_url": data.get("website_url"),
                "amount": data.get("amount"),
                "purchase_order_id": purchase_order_id,
                "purchase_order_name": data.get("purchase_order_name"),
                "customer_info": {
                    "name": data.get("name"),
                    "email": data.get("email"),
                    "phone": data.get("phone")
                }
            }

            headers = {
                "Authorization": f"key {settings.KHALTI_SECRET_KEY}",
                "Content-Type": "application/json"
            }

            req = urllib.request.Request(
                "https://a.khalti.com/api/v2/epayment/initiate/",
                data=json.dumps(payload).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            
            with urllib.request.urlopen(req) as response:
                resp_data = response.read()
                resp_json = json.loads(resp_data.decode("utf-8"))
                return Response({
                    "pidx": resp_json.get("pidx"),
                    "payment_url": resp_json.get("payment_url"),
                    "expires_at": resp_json.get("expires_at"),
                    "expires_in": resp_json.get("expires_in")
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST, 
                content_type="application/json"
            )

class KhaltiVerifyView(APIView):
    def get(self, request):
        serializer = KhaltiVerifySerializer(data=request.query_params)
        if serializer.is_valid():
            pidx = serializer.validated_data['pidx']

            headers = {
                "Authorization": f"key {settings.KHALTI_SECRET_KEY}",
                "Content-Type": "application/json"
            }

            req = urllib.request.Request(
                "https://a.khalti.com/api/v2/epayment/lookup/",
                data=json.dumps({"pidx": pidx}).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            try:
                with urllib.request.urlopen(req) as response:
                    resp_data = response.read()
                    data = json.loads(resp_data.decode("utf-8"))
                    if data.get("status") == "Completed":
                        return Response(data, status=status.HTTP_200_OK, content_type="application/json")
                    return Response(data, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")
            except urllib.error.HTTPError as e:
                error_data = e.read()
                try:
                    data = json.loads(error_data.decode("utf-8"))
                except Exception:
                    data = {"error": "Unknown error"}
                return Response(data, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST, content_type="application/json")
    

class CreatePaymentIntentView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        try:
            amount = request.data.get('amount')  # amount in dollars
            if not amount:
                return Response({"error": "Amount required"}, status=400)

            intent = stripe.PaymentIntent.create(
                amount=int(float(amount) * 100),  # convert to cents
                currency='usd',
                automatic_payment_methods={'enabled': True},
            )
            return Response({
                'clientSecret': intent['client_secret']
            })
        except Exception as e:
            return Response({'error': str(e)}, status=500)