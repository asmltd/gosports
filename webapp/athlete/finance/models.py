# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import datetime

from django.db import models
from ui.models import *

# Create your models here.
class Athlete_Finance(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    invoice_date = models.DateField(default=datetime.date.today)
    expense_type = models.CharField(max_length=50, default='')
    particulars = models.CharField(max_length=200, default='')
    amount = models.CharField(max_length=10, default='')
    finance_proof = models.FileField(null=True,blank=True,upload_to='finance_documents/')