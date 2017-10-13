from .models import Athlete_details
from .serializers import AthleteSerializer, AthleteSerializerPartial
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView

from rest_framework.pagination import LimitOffsetPagination


#Update particular athlete details
#url/api/athlete/athlete_id/edit
class AthleteEditAPIView(UpdateAPIView):
    queryset = Athlete_details.objects.all()
    serializer_class = AthleteSerializer


#Get all Athletes list
#url/api/athlete/
class AthleteListAPIView(ListAPIView):
    queryset = Athlete_details.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = AthleteSerializerPartial


#Retrieve details about an athlete
#url/api/athlete/athlete_id/
class AthleteIndividualAPIView(RetrieveAPIView):
    queryset = Athlete_details.objects.all()
    serializer_class = AthleteSerializer