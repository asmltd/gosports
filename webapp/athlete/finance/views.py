# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import FinanceSerializer
from .models import Athlete_Finance
from webapp.settings import *

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

    def delete(self, request, *args, **kwargs):
        import os
        instance = self.get_object()
        filepath = instance.finance_proof
        filepath_whole = str(MEDIA_ROOT)+ "/"+ str(filepath)
        os.remove(filepath_whole)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)