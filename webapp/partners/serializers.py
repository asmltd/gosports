from rest_framework import serializers
from .models import Partner_Details

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner_Details
        fields = ('__all__')