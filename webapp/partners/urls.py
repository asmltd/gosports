from rest_framework import routers
from django.conf.urls import url
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^$', ListPartnerAPIView.as_view(), name='partners_list'),
    url(r'^(?P<pk>\d+)/$', PartnerIndividualAPIView.as_view(), name='partner_id'),
    url(r'^(?P<pk>\d+)/edit$', PartnerEditAPIView.as_view(), name='partner_edit'),
]