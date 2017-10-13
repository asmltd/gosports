from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    # url(r'^create/$', achievements_list, name='achievements_list'),
    url(r'^create/$', AchievementCreateAPIView.as_view(), name='achievements_create'),
    url(r'^$', AchievementListAPIView.as_view(), name='achievements_list'),
    url(r'^(?P<athlete>[\w-]+)/$', AchievementGetAthleteAPIView.as_view(), name='achievements_details'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', AchievementDetailAPIView.as_view(), name='achievements_details_id'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', AchievementUpdateAPIView.as_view(), name='achievements_edit'),
    url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', AchievementDeleteAPIView.as_view(), name='achievements_delete'),
]
urlpatterns += router.urls

