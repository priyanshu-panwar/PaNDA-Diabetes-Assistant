from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
# from django.db.models.base import ModelBase


class Lead(models.Model):

    sugarLevel = models.CharField(max_length=4)
    dose = models.CharField(max_length=4)
    # typePatient = models.CharField(max_length=1, choices=)
    takenAtDate = models.DateField(auto_now_add=True, null=True)
    takenAtTime = models.TimeField(auto_now_add=True, null=True)
    # doseType = models.CharField(max_length=1, choices=)
    patient = models.ForeignKey(
        get_user_model(), related_name="leads", on_delete=models.CASCADE, null=True)
    patient_name = models.CharField(max_length=100, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.patient_name = get_user_model().objects.get(
            id=self.patient.id).username
        super(Lead, self).save(*args, **kwargs)
