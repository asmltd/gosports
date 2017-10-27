from rest_framework import routers
from django.conf.urls import url
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^$', ListCoachsAPIView.as_view(), name='coach_list'),
    url(r'^(?P<pk>\d+)/$', CoachIndividualAPIView.as_view(), name='coach_id'),
    url(r'^(?P<pk>\d+)/edit$', CoachEditAPIView.as_view(), name='coach_edit'),

]