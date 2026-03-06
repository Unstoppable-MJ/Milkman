from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductSerializer
from accounts.permissions import IsAdminUserRole

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUserRole]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.role == "admin":
            return Product.objects.all()
        return Product.objects.filter(is_active=True)