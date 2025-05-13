from rest_framework import serializers

class EsewaInitiateSerializer(serializers.Serializer):
    total_amount = serializers.CharField()

class EsewaVerificationSerializer(serializers.Serializer):
    encoded_response = serializers.CharField()

class KhaltiInitiateSerializer(serializers.Serializer):
    return_url = serializers.URLField()
    website_url = serializers.URLField()
    amount = serializers.IntegerField(min_value=1)
    purchase_order_name = serializers.CharField()
    name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()

class KhaltiVerifySerializer(serializers.Serializer):
    pidx = serializers.CharField()