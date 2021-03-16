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
        fields = ('id', 'name', 'relationship', 'contact')

class Contacts(ViewSet):

    def list(self, request):

        contacts = Contact.objects.all()

        user_token = self.request.query_params.get('user_token', None)

        if user_token is not None:

            logged_user = User.objects.get(auth_token=user_token)

            contacts = Contact.objects.filter(user=logged_user)


        serializer = ContactSerializer(contacts, many=True, context={'request': request})
        return Response(serializer.data)
    
    def create(self, request):

        contact = Contact()
        contact.name = request.data["name"]
        contact.relationship = request.data['relationship']
        contact.contact = request.data['contact']
        contact.user = request.auth

        try:
            contact.save()
            serializer = ContactSerializer(contact, context={'request': request})
            return Response(serializer.data)

        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):

        contact = Contact.objects.get(pk=pk)
        contact.name = request.data['name']
        contact.relationship = request.data['relationship']
        contact.contact = request.data['contact']
        contact.user = request.auth

        contact.save()

        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):

        try:
            contact = Contact.objects.get(pk=pk)
            contact.delete()
            return Response({}, status=status.HTTP_204_NO_CONTENT)
            
        except Contact.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)