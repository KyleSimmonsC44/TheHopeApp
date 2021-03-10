"""File for Model for Posts"""
from django.db import models

class Rehab(models.Model):
    """Model for Posts"""

    name = models.CharField(max_length=1500)
    number = models.CharField(max_length=1500)
    website = models.CharField(max_length=1500)
    licensed = models.BooleanField()
    treatment_programs = models.CharField(max_length=1500)
    program_length = models.CharField(max_length=1500)
    twelve_step = models.BooleanField()
    aftercare = models.BooleanField()
    dietian = models.BooleanField()