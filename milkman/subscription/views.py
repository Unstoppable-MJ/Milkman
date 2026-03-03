from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        subs = Subscription.objects.all()
        serializer = SubscriptionSerializer(subs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubscriptionDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return Subscription.objects.get(pk=pk)

    def get(self, request, pk):
        sub = self.get_object(pk)
        serializer = SubscriptionSerializer(sub)
        return Response(serializer.data)

    def delete(self, request, pk):
        sub = self.get_object(pk)
        sub.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)