from rest_framework import generics, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum

from .models import Order
from .serializers import OrderSerializer, AdminUpdateOrderSerializer
from accounts.permissions import IsAdminUserRole, IsCustomerUser


# 🔹 BUY PRODUCT (CUSTOMER ONLY)
class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsCustomerUser]

# 🔹 ORDER HISTORY (CUSTOMER ONLY)
class MyOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsCustomerUser]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).order_by('-created_at')

# 🔹 ALL ORDERS (ADMIN ONLY)
class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUserRole]

# 🔹 UPDATE ORDER STATUS (ADMIN ONLY)
class AdminOrderUpdateView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = AdminUpdateOrderSerializer
    permission_classes = [IsAdminUserRole]

# 🔹 DASHBOARD ANALYTICS (ADMIN ONLY)
class AnalyticsAPIView(APIView):
    permission_classes = [IsAdminUserRole]

    def get(self, request):
        total_revenue = Order.objects.filter(status='Delivered').aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        total_orders = Order.objects.count()
        from accounts.models import User
        total_customers = User.objects.filter(role='customer').count()
        from subscription.models import Subscription
        total_subscriptions = Subscription.objects.filter(is_active=True).count()

        # Monthly revenue for chart (last 6 months - simplified)
        # Note: In a real app we'd group by month. For this demo, let's return some mock time-series or simple aggregation.
        # We can use extra(select={'month': "strftime('%%m', created_at)"}) for SQLite
        monthly_stats = Order.objects.filter(status='Delivered').values('created_at__month').annotate(revenue=Sum('total_amount')).order_by('created_at__month')

        return Response({
            "total_revenue": total_revenue,
            "total_orders": total_orders,
            "total_customers": total_customers,
            "total_subscriptions": total_subscriptions,
            "monthly_stats": monthly_stats
        })