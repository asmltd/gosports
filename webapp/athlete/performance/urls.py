from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^create/$', PerformanceCreateAPIView.as_view(), name='performance_create'),
    url(r'^$', PerformanceListAPIView.as_view(), name='performance_list'),
    url(r'^(?P<athlete>[\w-]+)/$', PerformanceGetAthleteAPIView.as_view(), name='performance_details'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', PerformanceDetailAPIView.as_view(), name='performance_details_id'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', PerformanceUpdateAPIView.as_view(), name='performance_edit'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', PerformanceDeleteAPIView.as_view(), name='performance_delete'),
]
urlpatterns += router.urls