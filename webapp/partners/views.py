# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Partner_Details
from .serializers import PartnerSerializer

from django.shortcuts import render


class ListPartnerAPIView(ListAPIView):
    """
    List all Partners
    api ==> hostname:port/api/partner/
    """
    queryset = Partner_Details.objects.all()
    serializer_class = PartnerSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (BasicAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)


class PartnerIndividualAPIView(RetrieveAPIView):
    """
    Retrieve details about an partner
    api ==> hostname:port/url/api/partner/partner_id/
    """
    queryset = Partner_Details.objects.all()
    serializer_class = PartnerSerializer
    authentication_classes = (BasicAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)


class PartnerEditAPIView(RetrieveUpdateAPIView):
    """
    Update particular partner details
    api ==> hostname:port/api/partner/partner_id/edit
    """
    queryset = Partner_Details.objects.all()
    serializer_class = PartnerSerializer
    authentication_classes = (BasicAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)