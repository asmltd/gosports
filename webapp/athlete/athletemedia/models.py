# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime
from django.db import models
from ui.models import *

# Create your models here.
class Athlete_Media(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    mediafile = models.FileField(null=True, blank=True, upload_to='athlete_media/')
    uploaded_time = models.DateField(default=datetime.date.today)
