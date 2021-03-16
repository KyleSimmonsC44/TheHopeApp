from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth.models import Permission, User
from TheHopeAppapi.models import Rehab
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework import permissions
from django.http import HttpResponse
import json


class RehabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rehab
        fields = ('id','name','number','website','licensed','treatment_programs','program_length','twelve_step','aftercare','dietian')

# class Rehabs(ViewSet):
#     permission_classes_by_action = {
#         'create': (permissions.IsAuthenticated,),
#         'list': (permissions.AllowAny,),
#         'retrieve': (permissions.AllowAny,),
#         'update': (permissions.AllowAny,),
#         'destroy': (permissions.IsAuthenticated,),
#         'search': (permissions.IsAuthenticated,)
#     }

@csrf_exempt
def list_rehabs(request):


    rehab = Rehab.objects.all()

    serializer = RehabSerializer(rehab, many=True, context={'request':request})
    return HttpResponse(json.dumps(serializer.data), content_type='application/json')

@csrf_exempt
def retrieve_rehab(request, pk=None):

    try:
        rehab = Rehab.objects.get(pk=pk)
        serializer = RehabSerializer(rehab, context={'request': request})
        return HttpResponse(json.dumps(serializer.data), content_type='application/json')
    except Rehab.DoesNotExist as ex:
        return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)