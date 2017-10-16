# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated

from .models import Partner_Details
from .serializers import PartnerSerializer

from django.shortcuts import render

# Create your views here.

#url/api/partner/
class ListPartnerAPIView(ListAPIView):
    queryset = Partner_Details.objects.all()
    serializer_class = PartnerSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (BasicAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

#Retrieve details about an partner
#url/api/partner/partner_id/
class PartnerIndividualAPIView(RetrieveAPIView):
    queryset = Partner_Details.objects.all()
    serializer_class = PartnerSerializer
    authentication_classes = (BasicAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

#Update particular partner details
#url/api/partner/partner_id/edit
class PartnerEditAPIView(RetrieveUpdateAPIView):
    queryset = Partner_Details.objects.all()
    serializer_class = PartnerSerializer
    authentication_classes = (BasicAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)