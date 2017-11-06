# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from ui.models import user_details
from django.db import models

# Create your models here.
class Wellness_Details(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    time_recorded = models.DateField(default=datetime.date.today)
    stress = models.CharField(max_length=15, default= '')
    sleep = models.CharField(max_length=15, default= '')
    fatigue = models.CharField(max_length=15, default= '')
    soreness = models.CharField(max_length=15, default= '')
    energy = models.CharField(max_length=15, default='')