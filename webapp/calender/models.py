# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from ui.models import *
import datetime

# Create your models here.
class Calendar(models.Model):
    event=models.CharField(max_length=100, default='')
    user_id=models.ForeignKey(user_details)
    user_type=models.CharField(max_length=10, default='')
    event_date_time = models.DateTimeField(default=datetime.date.today)