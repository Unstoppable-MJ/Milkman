from django.db import models
from django.conf import settings   # ✅ IMPORTANT

class Customer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,   # ✅ FIXED
        on_delete=models.CASCADE
    )
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username