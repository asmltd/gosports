from rest_framework import routers
from django.conf.urls import url
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^$', ListManagersAPIView.as_view(), name='managers_list'),
    url(r'^(?P<pk>\d+)/$', ManagerIndividualAPIView.as_view(), name='managers_id'),
    url(r'^(?P<pk>\d+)/edit$', ManagerEditAPIView.as_view(), name='managers_edit'),

]