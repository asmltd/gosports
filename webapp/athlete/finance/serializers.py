from rest_framework import serializers

from .models import Athlete_Finance


class FinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete_Finance
        fields = ("__all__")