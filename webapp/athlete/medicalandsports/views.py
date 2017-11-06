# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, \
    RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import MedicalandSportsSerializer
from .models import MedicalandSports_details

from django.shortcuts import render

# Create your views here.

class MedicalandSportsCreateAPIView(CreateAPIView):
    """
    Create a new Medical and Sports entry
    api ==> hostname:port/api/athlete/medical/create/
    """
    queryset = MedicalandSports_details.objects.all()
    serializer_class = MedicalandSportsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class MedicalandSportsListAPIView(ListAPIView):
    """
    Pull out all medical and sports, this is given with pagination
    api ==> hostname:port/api/athlete/medical/
    """
    queryset = MedicalandSports_details.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = MedicalandSportsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class MedicalandSportsGetAthleteAPIView(ListAPIView):
    """
    get the medical and sports of particular athlete
    api ==> hostname:port/api/athlete/medical/athlete_id/
    """
    serializer_class = MedicalandSportsSerializer

    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return MedicalandSports_details.objects.filter(athlete_id=athlete)


class MedicalandSportsDetailAPIView(RetrieveAPIView):
    """
    Retrieve a particular Medical and Sports
    api ==> hostname:port/api/athlete/medical/athlete_id/id/ where id = unique id for the medical and sports
    """
    queryset = MedicalandSports_details.objects.all()
    serializer_class = MedicalandSportsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class MedicalandSportsUpdateAPIView(RetrieveUpdateAPIView):
    """
    update particular Medical and Sports
    api ==> hostname:port/api/medical/athlete_id/id/edit
    """
    queryset = MedicalandSports_details.objects.all()
    serializer_class = MedicalandSportsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class MedicalandSportsDeleteAPIView(RetrieveDestroyAPIView):
    """
    Delete an Medical and Sports
    api ==> hostname:port/api/athlete/medical/athlete_id/id/delete
    """
    queryset = MedicalandSports_details.objects.all()
    serializer_class = MedicalandSportsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
