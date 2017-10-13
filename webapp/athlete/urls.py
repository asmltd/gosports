from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
     url(r'^$', AthleteListAPIView.as_view(), name='achievements_list'),
     url(r'^(?P<pk>\d+)/$', AthleteIndividualAPIView.as_view(), name='achievements_details_id'),
     url(r'^(?P<pk>\d+)/edit$', AthleteEditAPIView.as_view(), name='achievements_edit'),
]
urlpatterns += router.urls
