# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from django.db import models
from ui.models import *

# Create your models here.
class Athlete_Interactions(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=datetime.date.today)
    interaction_subject = models.CharField(max_length=200, default='')
    type_of_interaction = models.CharField(max_length=200, default='')
    interaction = models.CharField(max_length=500, default='')
    status_of_athlete = models.CharField(max_length=100, default='')
    interaction_status = models.CharField(max_length=100, default='')