from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^create/$', WellnessCreateAPIView.as_view(), name='wellness_create'),
    url(r'^$', WellnessListAPIView.as_view(), name='wellness_list'),
    url(r'^(?P<athlete>[\w-]+)/$', WellnessGetAthleteAPIView.as_view(), name='wellness_details'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', WellnessDetailAPIView.as_view(), name='wellness_details_id'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', WellnessUpdateAPIView.as_view(), name='wellness_edit'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', WellnessDeleteAPIView.as_view(), name='wellness_delete'),
]
urlpatterns += router.urls