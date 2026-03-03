from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "price",
            "discount_percent",
            "discounted_price",
            "stock",
            "image",
            "category",
            "category_name",
        ]

    def get_discounted_price(self, obj):
        return obj.discounted_price()