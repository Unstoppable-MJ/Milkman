from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Subscription
from .serializers import SubscriptionSerializer
from accounts.permissions import IsAdminUserRole

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Subscription.objects.all()
        # Non-admins can only see their own subscriptions
        from customer.models import Customer
        try:
            customer = Customer.objects.get(user=self.request.user)
            return Subscription.objects.filter(customer=customer)
        except Customer.DoesNotExist:
            return Subscription.objects.none()

    def perform_create(self, serializer):
        # Auto-assign customer if not admin
        if self.request.user.role != 'admin':
            from customer.models import Customer
            customer = Customer.objects.get(user=self.request.user)
            serializer.save(customer=customer)
        else:
            serializer.save()