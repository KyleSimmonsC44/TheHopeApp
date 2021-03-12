from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth.models import User
from TheHopeAppapi.models import Rehab

class RehabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rehab
        fields = ('id','name','number','website','licensed','treatment_programs','program_length','twelve_step','aftercare','dietian')

class Rehabs(ViewSet):

    def list(self,request):


        rehab = Rehab.objects.all()

        serializer = RehabSerializer(rehab, many=True, context={'request':request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):

        try:
            rehab = Rehab.objects.get(pk=pk)
            serializer = RehabSerializer(rehab, context={'request': request})
            return Response(serializer.data)
        except Rehab.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)