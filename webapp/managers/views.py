# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from .models import Managers_Details
from .serializers import ManagerSerializer


from django.shortcuts import render

# Create your views here.

class ListManagersAPIView(ListAPIView):
    """
    List all Managers
    api ==> hostname:port/api/manager/
    """
    queryset = Managers_Details.objects.all()
    serializer_class = ManagerSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, )


class ManagerIndividualAPIView(RetrieveAPIView):
    """
    Retrieve details about an Manager
    api ==> hostname:port/api/manager/manager_id/
    """
    queryset = Managers_Details.objects.all()
    serializer_class = ManagerSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class ManagerEditAPIView(RetrieveUpdateAPIView):
    """
    Update particular Manager details
    api ==> hostname:port/api/Manager/Manager_id/edit
    """
    queryset = Managers_Details.objects.all()
    serializer_class = ManagerSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)