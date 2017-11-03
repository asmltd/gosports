# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, \
    RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import InteractionsSerializer
from .models import Athlete_Interactions

from django.shortcuts import render

# Create your views here.

class InteractionCreateAPIView(CreateAPIView):
    """
    Create a new Achivement
    api ==> hostname:port/api/athlete/interactions/create/
    """
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class InteractionListAPIView(ListAPIView):
    """
    Pull out all interactions, this is given with pagination
    api ==> hostname:port/api/athlete/interactions/
    """
    queryset = Athlete_Interactions.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class InteractionGetAthleteAPIView(ListAPIView):
    """
    get the interactions of particular athlete
    api ==> hostname:port/api/athlete/interactions/athlete_id/
    """
    serializer_class = InteractionsSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_Interactions.objects.filter(athlete_id=athlete)


class InteractionDetailAPIView(RetrieveAPIView):
    """
    Retrieve a particular Interaction
    api ==> hostname:port/api/athlete/interactions/athlete_id/id/ where id = unique id for the interactions
    """
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class InteractionUpdateAPIView(RetrieveUpdateAPIView):
    """
    update particular Interaction
    api ==> hostname:port/api/interactions/athlete_id/id/edit
    """
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class InteractionDeleteAPIView(RetrieveDestroyAPIView):
    """
    Delete an Interaction
    api ==> hostname:port/api/athlete/interactions/athlete_id/id/delete
    """
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
