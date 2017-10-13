from rest_framework import serializers
from .models import Athlete_details

class AthleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete_details
        fields = ('__all__')


class AthleteSerializerPartial(serializers.ModelSerializer):
    class Meta:
        model = Athlete_details
        fields = ('id', 'first_name', 'last_name', 'sport', 'image')