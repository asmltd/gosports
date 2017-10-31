from rest_framework import routers
from django.conf.urls import url
from .views import *

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^$', ListCalendarAPIView.as_view(), name='calendar_list'),
    url(r'^create/$', CreateCalendarAPIView.as_view(), name='calendar_list'),
    url(r'^calendernotify/$',Notifyusers, name='user_notification'),
    url(r'^(?P<user_type>[\w-]+)/$', ListUserTypeCalendarAPIView.as_view(), name='calender_date'),
    url(r'^(?P<user_type>[\w-]+)/(?P<year>\d+)/$', ListUserTypeYearlyCalendarAPIView.as_view(), name='calender_year'),
    url(r'^(?P<user_type>[\w-]+)/(?P<year>\d+)/(?P<month>\d+)/$', ListUserTypeMonthlyCalendarAPIView.as_view(), name='calender_month'),
    url(r'^(?P<user_type>[\w-]+)/(?P<year>\d+)/(?P<month>\d+)/(?P<date>\d+)/$', ListUserTypeDailyCalendarAPIView.as_view(), name='calender_date'),
    url(r'^(?P<pk>\d+)/edit$', UpdateCalenderAPIView.as_view(), name='calendar_update'),
    url(r'^(?P<pk>\d+)/delete', DeleteCalenderEventAPIView.as_view(), name='calendar_delete'),
]