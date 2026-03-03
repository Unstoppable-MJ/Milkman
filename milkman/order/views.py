from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum

from .models import Order
from .serializers import OrderSerializer
from product.models import Product

# 🔥 Import custom permissions
from accounts.permissions import IsAdminUserRole, IsCustomerUser


# 🔹 TOTAL REVENUE (ADMIN ONLY)
class RevenueView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        total = Order.objects.aggregate(
            Sum('total_price')
        )['total_price__sum'] or 0

        return Response({
            "total_revenue": total
        })


# 🔹 BUY PRODUCT (CUSTOMER ONLY)
class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsCustomerUser]

    def perform_create(self, serializer):
        product_id = self.request.data.get('product')
        quantity = int(self.request.data.get('quantity'))

        product = Product.objects.get(id=product_id)

        if product.stock < quantity:
            raise serializers.ValidationError("Not enough stock available")

        # Reduce stock
        product.stock -= quantity
        product.save()

        total_price = product.discounted_price() * quantity

        serializer.save(
            user=self.request.user,
            total_price=total_price
        )


# 🔹 ORDER HISTORY (CUSTOMER ONLY)
class MyOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsCustomerUser]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).order_by('-ordered_at')