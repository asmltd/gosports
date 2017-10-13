# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from ui.models import *

# Create your models here.

class Athlete_achievements(models.Model):
    athlete = models.ForeignKey(user_details)
    achievements = models.CharField(max_length=1000, default='')
