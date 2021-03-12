from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth.models import User
from TheHopeAppapi.models import Post, Category

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'category', 'user', 'content', 'publication_date')


class Posts(ViewSet):

    def list(self, request):

        post = Post.objects.all()

        user_token = self.request.query_params.get('user_token', None)

        category_id = self.request.query_params.get('category_id', None)

        if category_id is not None:
            post = post.filter(category__id=category_id)
            if user_token is not None:
                post = post.filter(user=User.objects.get(auth_token=user_token))


        serializer = PostSerializer(
            post, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            post = Post.objects.get(pk=pk)

            serializer = PostSerializer(post, context={'request': request})
            return Response(serializer.data)
        except Post.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):

        post=Post()
        post.category = Category.objects.get(pk=request.data["categoryId"])
        post.user = request.auth.user
        post.content = request.data['content']

        try:
            post.save()
            serializer = PostSerializer(post, context={'request': request})
            return Response(serializer.data)
        
        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):

        post = Post.objects.get(pk=pk)
        post.category = Category.objects.get(pk=request.data["categoryId"])
        post.user = request.auth.user
        post.content = request.data['content']

        post.save()

        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):

        try:
            post = Post.objects.get(pk=pk)
            post.delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)

        except Post.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)