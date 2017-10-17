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

#Create a new Achivement
#url/api/athlete/interactions/create/



class InteractionCreateAPIView(CreateAPIView):
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#Pull out all interactions, this is given with pagination
#url/api/athlete/interactions/
class InteractionListAPIView(ListAPIView):
    queryset = Athlete_Interactions.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#get the interactions of particular athlete
#url/api/athlete/interactions/athlete_id/
class InteractionGetAthleteAPIView(ListAPIView):
    serializer_class = InteractionsSerializer

    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_Interactions.objects.filter(athlete_id=athlete)


#Retrieve a particular Interaction
#url/api/athlete/interactions/athlete_id/id/ where id = unique id for the interactions
class InteractionDetailAPIView(RetrieveAPIView):
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


#update particular Interaction
#url/api/interactions/athlete_id/id/edit
class InteractionUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


#Delete an Interaction
#url/api/athlete/interactions/athlete_id/id/delete
class InteractionDeleteAPIView(RetrieveDestroyAPIView):
    queryset = Athlete_Interactions.objects.all()
    serializer_class = InteractionsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)
