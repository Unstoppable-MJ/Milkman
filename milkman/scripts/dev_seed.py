import os
import sys
from pathlib import Path

# Ensure project root is on sys.path
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "milkman.settings")
django.setup()

from staff.models import Staff  # noqa: E402

email = "admin@gmail.com"
defaults = {
    "name": "Admin",
    "phone": "9999999999",
    "address": "HQ",
    "password": "admin123",
    "is_active": True,
}
obj, created = Staff.objects.get_or_create(email=email, defaults=defaults)
print("created" if created else "exists", obj.email)
