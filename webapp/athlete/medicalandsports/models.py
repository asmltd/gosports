# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime
from ui.models import user_details
from django.db import models

# Create your models here.
class MedicalandSports_details(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    consultation_or_test = models.CharField(max_length=50, default='')
    consultant_or_faculty = models.CharField(max_length=50, default='')
    doagnose_type = models.CharField(max_length=50, default='')
    quarter = models.CharField(max_length=5, default='')
    due_date = models.DateField(default=datetime.date.today)
    actual_date = models.DateField(default=datetime.date.today)