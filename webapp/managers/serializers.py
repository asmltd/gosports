
from rest_framework import serializers
from .models import Managers_Details

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Managers_Details
        fields = ('__all__')