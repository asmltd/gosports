# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Calendar
from .serializers import CalendarSerializer


# Create your views here.
class ListCalendarAPIView(ListAPIView):
    """
    List all Calender Events
    API ==> hostname:port/api/calendar/
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, IsAdminUser)


class CreateCalendarAPIView(CreateAPIView):
    """
    Create a new Calender Event
    API ==> hostname:port/api/calendar/create/
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class UpdateCalenderAPIView(RetrieveUpdateAPIView):
    """
    Edit a Calender Event
    API ==> hostname:port/api/calendar/calender_id/edit
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

class ListUserTypeCalendarAPIView(ListAPIView):
    """
    Retrieve an Calender Event based on user type
    Provide any on of the usertypes (athlete, partner, manager, coach...), otherwise give all for listing all users
    API to get all events ==> hostname:port/api/calendar/all/
    API to get athlete events==> hostname:port/api/calendar/athlete/
    """
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_type = self.kwargs['user_type']

        if (user_type == "all"):
            return Calendar.objects.all()
        else:
            return Calendar.objects.filter(user_type=user_type)


class ListUserTypeYearlyCalendarAPIView(ListAPIView):
    """
    Retrieve an Calender Event based on year
    API ==> hostname:port/api/calendar/all/2017
    """
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        year_arg = self.kwargs['year']
        user_type = self.kwargs['user_type']
        if(user_type == "all"):
            return Calendar.objects.filter(event_date_time__contains=year_arg)
        else:
            return Calendar.objects.filter(user_type=user_type).filter(event_date_time__contains=year_arg)


class ListUserTypeMonthlyCalendarAPIView(ListAPIView):
    """
    Retrieve an Calender Event based on year and month
    API ==> hostname:port/api/calendar/athlete/2017/10
    """
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_type = self.kwargs['user_type']
        query=str(self.kwargs['year']+ "-"+self.kwargs['month'])
        if (user_type == "all"):
            return Calendar.objects.filter(event_date_time__contains=query)
        else:
            return Calendar.objects.filter(user_type=user_type).filter(event_date_time__contains=query)

class ListUserTypeDailyCalendarAPIView(ListAPIView):
    """
    Retrieve an Calender Event based on year, month and date
    API ==> hostname:port/api/calendar/partner/2017/10/25
    """
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_type = self.kwargs['user_type']
        query = str(self.kwargs['year'] + "-" + self.kwargs['month']+ "-" +self.kwargs['date'])
        if (user_type == "all"):
            return Calendar.objects.filter(event_date_time__contains=query)
        else:
            return Calendar.objects.filter(user_type=user_type).filter(event_date_time__contains=query)


class DeleteCalenderEventAPIView(RetrieveDestroyAPIView):
    """
    Delete an Calender Event based on calender_id
    API ==> hostname:port/api/calendar/calender_id/delete
    """
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

@api_view(['GET'])
def Notifyusers(request):
    """
    This is used to send notification emails to the users who are having Events for that day
    :param request:
    :return:
    """
    import notifyusers
    notifyusers.trigger_email()
    return HttpResponse("OK")

