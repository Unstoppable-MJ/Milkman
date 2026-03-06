from django.urls import path
from .views import CreateOrderView, MyOrdersView, AdminOrderListView, AdminOrderUpdateView, AnalyticsAPIView

urlpatterns = [
    path('buy/', CreateOrderView.as_view(), name='buy-product'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),
    path('admin/all/', AdminOrderListView.as_view(), name='admin-all-orders'),
    path('admin/update/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin-update-order'),
    path('admin/analytics/', AnalyticsAPIView.as_view(), name='admin-analytics'),
]