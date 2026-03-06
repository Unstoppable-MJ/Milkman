from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsAdminUserRole
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUserRole]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Customer.objects.all()
        return Customer.objects.filter(user=self.request.user)