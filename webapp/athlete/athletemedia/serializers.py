from rest_framework import serializers
from .models import *

class Media_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete_Media
        fields = ("__all__")