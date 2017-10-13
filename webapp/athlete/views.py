from django.views.decorators.csrf import csrf_exempt

from .models import Athlete_details
from .serializers import AthleteSerializer, AthleteSerializerPartial
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView

from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


#Update particular athlete details
#url/api/athlete/athlete_id/edit
class AthleteEditAPIView(RetrieveUpdateAPIView):
    queryset = Athlete_details.objects.all()
    serializer_class = AthleteSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


#Get all Athletes list
#url/api/athlete/

class AthleteListAPIView(ListAPIView):
    queryset = Athlete_details.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = AthleteSerializerPartial
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



#Retrieve details about an athlete
#url/api/athlete/athlete_id/
class AthleteIndividualAPIView(RetrieveAPIView):
    queryset = Athlete_details.objects.all()
    serializer_class = AthleteSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)