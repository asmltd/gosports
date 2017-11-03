# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from .models import Coach_Details
from .serializers import CoachSerializer


from django.shortcuts import render

# Create your views here.

class ListCoachsAPIView(ListAPIView):
    """
    List all Coach
    api ==> hostname:port/api/coach/
    """
    queryset = Coach_Details.objects.all()
    serializer_class = CoachSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, )


class CoachIndividualAPIView(RetrieveAPIView):
    """
    Retrieve details about an Coach
    api ==> hostname:port/api/coach/coach_id/
    """
    queryset = Coach_Details.objects.all()
    serializer_class = CoachSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class CoachEditAPIView(RetrieveUpdateAPIView):
    """
    Update particular Coach details
    api ==> hostname:port/api/Coach/Coach_id/edit
    """
    queryset = Coach_Details.objects.all()
    serializer_class = CoachSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)