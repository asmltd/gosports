from rest_framework import serializers
from .models import Wellness_Details

class WellnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wellness_Details
        fields = ('__all__')