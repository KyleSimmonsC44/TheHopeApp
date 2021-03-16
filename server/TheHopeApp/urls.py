from TheHopeAppapi.views.comments import Comments
from TheHopeAppapi.views.posts import Posts
from TheHopeAppapi.models.post import Post
from TheHopeAppapi.views.contacts import Contacts
from TheHopeAppapi.views.categories import Categories
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from TheHopeAppapi.views import register_user, login_user, list_rehabs, retrieve_rehab

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'categories', Categories, 'category')
router.register(r'contacts', Contacts, 'contact')
router.register(r'posts', Posts, 'post')
router.register(r'comments', Comments, 'comment')

urlpatterns = [
    path('rehab',list_rehabs),
    path('rehab/<int:pk>', retrieve_rehab),
    path('', include(router.urls)),
    path('register', register_user),
    path('login', login_user),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
]