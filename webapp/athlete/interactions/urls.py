from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^create/$', InteractionCreateAPIView.as_view(), name='interactions_create'),
    url(r'^$', InteractionListAPIView.as_view(), name='interactions_list'),
    url(r'^(?P<athlete>[\w-]+)/$', InteractionGetAthleteAPIView.as_view(), name='interactions_details'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', InteractionDetailAPIView.as_view(), name='interactions_details_id'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', InteractionUpdateAPIView.as_view(), name='interactions_edit'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', InteractionDeleteAPIView.as_view(), name='interactions_delete'),
]
urlpatterns += router.urls