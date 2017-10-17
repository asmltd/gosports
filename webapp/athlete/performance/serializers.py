from rest_framework import serializers
from .models import Athlete_Performance

class PerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete_Performance
        fields = ('__all__')