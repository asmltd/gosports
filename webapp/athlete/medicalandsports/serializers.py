from rest_framework import serializers
from .models import MedicalandSports_details

class MedicalandSportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalandSports_details
        fields = ('__all__')