"""File for Model for Posts"""
from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Contact(models.Model):
    """Model for Posts"""

    user = models.ForeignKey(Token, on_delete=models.CASCADE)
    name = models.CharField(max_length=1500)
    relationship = models.CharField(max_length=1500)
    contact = models.CharField(max_length=1500)