# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Managers_Details
from .serializers import ManagerSerializer


from django.shortcuts import render

# Create your views here.

#url/api/manager/
class ListManagersAPIView(ListAPIView):
    queryset = Managers_Details.objects.all()
    serializer_class = ManagerSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated, )


#Retrieve details about an Manager
#url/api/manager/manager_id/
class ManagerIndividualAPIView(RetrieveAPIView):
    queryset = Managers_Details.objects.all()
    serializer_class = ManagerSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#Update particular Manager details
#url/api/Manager/Manager_id/edit
class ManagerEditAPIView(RetrieveUpdateAPIView):
    queryset = Managers_Details.objects.all()
    serializer_class = ManagerSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)