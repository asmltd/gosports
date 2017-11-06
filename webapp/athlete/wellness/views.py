# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, \
    RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import WellnessSerializer
from .models import Wellness_Details

from django.shortcuts import render

# Create your views here.

class WellnessCreateAPIView(CreateAPIView):
    """
    Create a new Wellness Record
    api ==> hostname:port/api/athlete/wellness/create/
    """
    queryset = Wellness_Details.objects.all()
    serializer_class = WellnessSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class WellnessListAPIView(ListAPIView):
    """
    Pull out all wellness, this is given with pagination
    api ==> hostname:port/api/athlete/wellness/
    """
    queryset = Wellness_Details.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = WellnessSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class WellnessGetAthleteAPIView(ListAPIView):
    """
    get the wellness of particular athlete
    api ==> hostname:port/api/athlete/wellness/athlete_id/
    """
    serializer_class = WellnessSerializer

    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Wellness_Details.objects.filter(athlete_id=athlete)


class WellnessDetailAPIView(RetrieveAPIView):
    """
    Retrieve a particular Wellness
    api ==> hostname:port/api/athlete/wellness/athlete_id/id/ where id = unique id for the wellness
    """
    queryset = Wellness_Details.objects.all()
    serializer_class = WellnessSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class WellnessUpdateAPIView(RetrieveUpdateAPIView):
    """
    update particular Wellness
    api ==> hostname:port/api/wellness/athlete_id/id/edit
    """
    queryset = Wellness_Details.objects.all()
    serializer_class = WellnessSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class WellnessDeleteAPIView(RetrieveDestroyAPIView):
    """
    Delete an Wellness
    api ==> hostname:port/api/athlete/wellness/athlete_id/id/delete
    """
    queryset = Wellness_Details.objects.all()
    serializer_class = WellnessSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
