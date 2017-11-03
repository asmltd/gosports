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

from .serializers import Media_Serializer
from .models import Athlete_Media
from webapp.settings import *

class AthleteMediaCreateAPIView(CreateAPIView):
    """
    Create an media Entry
    api ==> hostname:port/api/media/create
    """
    queryset = Athlete_Media.objects.all()
    serializer_class = Media_Serializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AthleteMediaListAPIView(ListAPIView):
    """
    List all media Entries
    api ==> hostname:port/api/media/
    """
    queryset = Athlete_Media.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = Media_Serializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AthleteMediaGetAthleteAPIView(ListAPIView):
    """
    List all media Entries related to an athlete
    api ==> hostname:port/api/media/athlete_id/
    """
    serializer_class = Media_Serializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_Media.objects.filter(athlete_id=athlete)


class AthleteMediaDetailAPIView(RetrieveAPIView):
    """
    Retrieve an media entry
    api ==> hostname:port/api/media/athlete_id/id/ where id is "id" of the media entry
    """
    queryset = Athlete_Media.objects.all()
    serializer_class = Media_Serializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AthleteMediaUpdateAPIView(RetrieveUpdateAPIView):
    """
    Edit an media Entry
    api ==> hostname:port/api/media/athlete_id/id/edit/
    """
    queryset = Athlete_Media.objects.all()
    serializer_class = Media_Serializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AthleteMediaDeleteAPIView(RetrieveDestroyAPIView):
    """
    Delete an media Entry
    api ==> hostname:port/api/media/athlete_id/id/delete/
    this will also delete the document attached to it
    """
    queryset = Athlete_Media.objects.all()
    serializer_class = Media_Serializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        import os
        instance = self.get_object()
        filepath = instance.mediafile
        filepath_whole = str(MEDIA_ROOT)+ "/"+ str(filepath)
        os.remove(filepath_whole)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)