from rest_framework import serializers

from .models import Athlete_achievements

class AchievementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Athlete_achievements
        fields = ("__all__")