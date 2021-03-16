from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class Comment(models.Model):
    """Model for Comments"""

    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    user = models.ForeignKey( Token, on_delete=models.CASCADE)
    content = models.CharField(max_length=280)
    created_on = models.DateTimeField(auto_now=False, auto_now_add=True)
