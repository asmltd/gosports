from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^create/$', MedicalandSportsCreateAPIView.as_view(), name='medicalandsports_create'),
    url(r'^$', MedicalandSportsListAPIView.as_view(), name='medicalandsports_list'),
    url(r'^(?P<athlete>[\w-]+)/$', MedicalandSportsGetAthleteAPIView.as_view(), name='medicalandsports_details'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', MedicalandSportsDetailAPIView.as_view(), name='medicalandsports_details_id'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', MedicalandSportsUpdateAPIView.as_view(), name='medicalandsports_edit'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', MedicalandSportsDeleteAPIView.as_view(), name='medicalandsports_delete'),
]
urlpatterns += router.urls