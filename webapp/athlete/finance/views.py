# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, DestroyAPIView, \
    RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from .serializers import FinanceSerializer
from .models import Athlete_Finance


class FinanceCreateAPIView(CreateAPIView):
    queryset = Athlete_Finance.objects.all()
    serializer_class = FinanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



class FinanceListAPIView(ListAPIView):
    queryset = Athlete_Finance.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = FinanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class FinanceGetAthleteAPIView(ListAPIView):
    serializer_class = FinanceSerializer

    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_Finance.objects.filter(athlete_id=athlete)



class FinanceDetailAPIView(RetrieveAPIView):
    queryset = Athlete_Finance.objects.all()
    serializer_class = FinanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



class FinanceUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Athlete_Finance.objects.all()
    serializer_class = FinanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class FinanceDeleteAPIView(RetrieveDestroyAPIView):
    queryset = Athlete_Finance.objects.all()
    serializer_class = FinanceSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)