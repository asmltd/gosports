from django.views.decorators.csrf import csrf_exempt

from .models import Athlete_details
from .serializers import AthleteSerializer, AthleteSerializerPartial
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView

from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class AthleteEditAPIView(RetrieveUpdateAPIView):
    """
    Update particular athlete details
    api ==> hostname:port/api/athlete/athlete_id/edit
    """
    queryset = Athlete_details.objects.all()
    serializer_class = AthleteSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AthleteListAPIView(ListAPIView):
    """
    Get all Athletes list
    api ==> hostname:port/api/athlete/
    """
    queryset = Athlete_details.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = AthleteSerializerPartial
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AthleteIndividualAPIView(RetrieveAPIView):
    """
    Retrieve details about an athlete
    api ==> hostname:port/api/athlete/athlete_id/
    """
    queryset = Athlete_details.objects.all()
    serializer_class = AthleteSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)