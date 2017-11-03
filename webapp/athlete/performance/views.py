# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, \
    RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import PerformanceSerializer
from .models import Athlete_Performance

from django.shortcuts import render

# Create your views here.

class PerformanceCreateAPIView(CreateAPIView):
    """
    Create a new Achivement
    api ==> hostname:port/api/athlete/performance/create/
    """
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class PerformanceListAPIView(ListAPIView):
    """
    Pull out all performance, this is given with pagination
    api ==> hostname:port/api/athlete/performance/
    """
    queryset = Athlete_Performance.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class PerformanceGetAthleteAPIView(ListAPIView):
    """
    get the performance of particular athlete
    api ==> hostname:port/api/athlete/performance/athlete_id/
    """
    serializer_class = PerformanceSerializer

    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_Performance.objects.filter(athlete_id=athlete)


class PerformanceDetailAPIView(RetrieveAPIView):
    """
    Retrieve a particular Performance
    api ==> hostname:port/api/athlete/performance/athlete_id/id/ where id = unique id for the performance
    """
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class PerformanceUpdateAPIView(RetrieveUpdateAPIView):
    """
    update particular Performance
    api ==> hostname:port/api/performance/athlete_id/id/edit
    """
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class PerformanceDeleteAPIView(RetrieveDestroyAPIView):
    """
    Delete an Performance
    api ==> hostname:port/api/athlete/performance/athlete_id/id/delete
    """
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
