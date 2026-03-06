from rest_framework import serializers
from accounts.models import User
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Customer
        fields = ["id", "username", "email", "phone"]
        read_only_fields = ["id", "username", "email"]