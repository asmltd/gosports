from django.conf.urls import url
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    # url(r'^create/$', achievements_list, name='achievements_list'),
     url(r'^create/$', FinanceCreateAPIView.as_view(), name='finance_create'),
     url(r'^$', FinanceListAPIView.as_view(), name='finance_list'),
     url(r'^(?P<athlete>[\w-]+)/$', FinanceGetAthleteAPIView.as_view(), name='finance_details'),
     url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/$', FinanceDetailAPIView.as_view(), name='finance_details_id'),
     url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/edit$', FinanceUpdateAPIView.as_view(), name='finance_edit'),
     url(r'^(?P<athlete>[\w-]+)/(?P<pk>\d+)/delete$', FinanceDeleteAPIView.as_view(), name='finance_delete'),
]
urlpatterns += router.urls

