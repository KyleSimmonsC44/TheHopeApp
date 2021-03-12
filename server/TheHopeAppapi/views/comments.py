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
        fields = ('id', 'post', 'user', 'content', 'created_on')
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
        comment.user = request.auth.user
        comment.content = request.data['content']

        try:
            comment.save()
            serializer = CommentSerializer(comment, context={'request': request})
            return Response(serializer.data)
        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)


