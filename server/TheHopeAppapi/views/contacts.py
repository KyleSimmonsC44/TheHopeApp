from TheHopeAppapi.models.contact import Contact
from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'name', 'relationship', 'contact', 'user')

class Contacts(ViewSet):

    def list(self, request):

        contacts = Contact.objects.all()

        user_token = self.request.query_params.get('user_token', None)

        if user_token is not None:

            logged_user = User.objects.get(auth_token=user_token)

            contacts = Contact.objects.filter(user=logged_user)


        serializer = ContactSerializer(contacts, many=True, context={'request': request})
        return Response(serializer.data)
    