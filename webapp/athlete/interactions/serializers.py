from rest_framework import serializers
from .models import Athlete_Interactions

class InteractionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete_Interactions
        fields = ('__all__')