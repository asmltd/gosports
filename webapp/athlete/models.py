from __future__ import unicode_literals
import datetime

from django.db import models
from ui.models import *
# Create your models here.
class Athlete_details(models.Model):
    athlete = models.ForeignKey(user_details)
    sport = models.CharField(max_length=50, default='')
    hometown = models.CharField(max_length=100, default='')
    dateofbirth = models.DateField(default=datetime.date.today)
    coach = models.CharField(max_length=50, default='')
    staff = models.CharField(max_length=50, default='')
    training_base = models.CharField(max_length=100, default='')
    international_debute = models.CharField(max_length=100, default='')
    short_term_goal = models.CharField(max_length=100, default='')
    long_term_goal = models.CharField(max_length=100, default='')