from rest_framework import serializers
from .models import Order, OrderItem
from product.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_image', 'quantity', 'price_at_time_of_order']
        read_only_fields = ['price_at_time_of_order']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'total_amount', 'payment_method', 'created_at', 'updated_at', 'items']
        read_only_fields = ['user', 'total_amount', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)
        
        total_amount = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            
            if product.stock < quantity:
                raise serializers.ValidationError(f"Not enough stock for {product.name}")
            
            product.stock -= quantity
            product.save()
            
            price = product.discounted_price()
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_at_time_of_order=price
            )
            total_amount += price * quantity
            
        order.total_amount = total_amount
        order.save()
        
        return order

class AdminUpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']