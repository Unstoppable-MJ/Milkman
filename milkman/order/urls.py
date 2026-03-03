from django.urls import path
from .views import CreateOrderView, MyOrdersView
from .views import CreateOrderView, MyOrdersView, RevenueView   
urlpatterns = [
    path('buy/', CreateOrderView.as_view(), name='buy-product'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),
    path('revenue/', RevenueView.as_view(), name='order-revenue'),
]