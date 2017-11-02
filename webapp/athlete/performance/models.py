# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from django.db import models
from ui.models import user_details

# Create your models here.
class Athlete_Performance(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    competition = models.CharField(max_length=100, default= '')
    start_date = models.DateField(default=datetime.date.today)
    end_date = models.DateField(default=datetime.date.today)
    location = models.CharField(max_length=20, default='')
    event = models.CharField(max_length=50,default='')
    competition_level = models.CharField(max_length=50, default='')
    score = models.CharField(max_length=10,default='')
    position = models.IntegerField(default=0)
