from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
     url(r'^create/$', AthleteMediaCreateAPIView.as_view(), name='athletemedia_create'),
     url(r'^$', AthleteMediaListAPIView.as_view(), name='athletemedia_list'),
     url(r'^(?P<athlete>[\w-]+)/$', AthleteMediaGetAthleteAPIView.as_view(), name='athletemedia_details'),
     url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', AthleteMediaDetailAPIView.as_view(), name='athletemedia_details_id'),
     url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', AthleteMediaUpdateAPIView.as_view(), name='athletemedia_edit'),
     url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', AthleteMediaDeleteAPIView.as_view(), name='athletemedia_delete'),
]
urlpatterns += router.urls

