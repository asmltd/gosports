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

#Create a new Achivement
#url/api/athlete/performance/create/
class PerformanceCreateAPIView(CreateAPIView):
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#Pull out all performance, this is given with pagination
#url/api/athlete/performance/
class PerformanceListAPIView(ListAPIView):
    queryset = Athlete_Performance.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#get the performance of particular athlete
#url/api/athlete/performance/athlete_id/
class PerformanceGetAthleteAPIView(ListAPIView):
    serializer_class = PerformanceSerializer

    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_Performance.objects.filter(athlete_id=athlete)


#Retrieve a particular Performance
#url/api/athlete/performance/athlete_id/id/ where id = unique id for the performance
class PerformanceDetailAPIView(RetrieveAPIView):
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


#update particular Performance
#url/api/performance/athlete_id/id/edit
class PerformanceUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


#Delete an Performance
#url/api/athlete/performance/athlete_id/id/delete
class PerformanceDeleteAPIView(RetrieveDestroyAPIView):
    queryset = Athlete_Performance.objects.all()
    serializer_class = PerformanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
