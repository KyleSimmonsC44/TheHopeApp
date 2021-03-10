"""File for Model for Posts"""
from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    """Model for Posts"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=1500)
    relationship = models.CharField(max_length=1500)
    contact = models.CharField(max_length=1500)