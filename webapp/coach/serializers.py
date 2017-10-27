
from rest_framework import serializers
from .models import Coach_Details

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach_Details
        fields = ('__all__')