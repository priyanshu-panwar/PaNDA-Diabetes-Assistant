from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image

from .constants import RAPID_INSULIN, LONG_ACTING

SEX_CHOICES = (
    ('M', 'MALE'),
    ('F', 'FEMALE'),
)


class User(AbstractUser):
    age = models.IntegerField(blank=True, null=True)
    sex = models.CharField(
        max_length=1, choices=SEX_CHOICES, null=True, blank=True)
    phone = models.CharField(max_length=10, null=True, blank=True)
    crno = models.CharField(max_length=10, null=True, blank=True)
    bedno = models.CharField(max_length=5, null=True, blank=True)
    weight = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)
    is_extreme = models.BooleanField(default=False)
    rapid_insulin = models.CharField(
        max_length=2, choices=RAPID_INSULIN, null=True, blank=True)
    long_acting = models.CharField(
        max_length=2, choices=LONG_ACTING, null=True, blank=True)
