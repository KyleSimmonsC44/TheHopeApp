from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import status
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from TheHopeAppapi.models import Comment, Post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'post', 'content', 'created_on', 'user')
        depth=1

class Comments(ViewSet):

    def list(self, request):

        comment = Comment.objects.all()

        post = self.request.query_params.get('post_id', None)

        if post is not None:
            comment = comment.filter(post__id=post)

        serializer = CommentSerializer(comment, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request):

        comment = Comment()
        comment.post = Post.objects.get(pk=request.data["postId"])
        comment.user = request.auth
        comment.content = request.data['content']

        try:
            comment.save()
            serializer = CommentSerializer(comment, context={'request': request})
            return Response(serializer.data)
        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):

        comment= Comment.objects.get(pk=pk)
        comment.post = Post.objects.get(pk=request.data["postId"])
        comment.user = request.auth
        comment.content = request.data['content']
        comment.save()

        return Response({}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):

        try:
            comment = Comment.objects.get(pk=pk)
            comment.delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        except Comment.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)