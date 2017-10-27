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

#url/api/coach/
class ListCoachsAPIView(ListAPIView):
    queryset = Coach_Details.objects.all()
    serializer_class = CoachSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, )


#Retrieve details about an Coach
#url/api/coach/coach_id/
class CoachIndividualAPIView(RetrieveAPIView):
    queryset = Coach_Details.objects.all()
    serializer_class = CoachSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#Update particular Coach details
#url/api/Coach/Coach_id/edit
class CoachEditAPIView(RetrieveUpdateAPIView):
    queryset = Coach_Details.objects.all()
    serializer_class = CoachSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)