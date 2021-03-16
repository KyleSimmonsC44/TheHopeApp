"""File for Model for Posts"""
from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Post(models.Model):
    """Model for Posts"""

    user = models.ForeignKey(Token, on_delete=models.CASCADE)
    category = models.ForeignKey("Category", null=True, on_delete=models.SET_NULL)
    content = models.CharField(max_length=1500)
    publication_date = models.DateField(auto_now=False, auto_now_add=True)