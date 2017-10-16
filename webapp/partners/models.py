# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from ui.models import *

# Create your models here.

class Partner_Details(models.Model):
    partner = models.ForeignKey(user_details)
    partner_name = models.CharField(max_length=50, default='')
    location = models.CharField(max_length=50, default='')
    partner_image = models.ImageField(null=True,blank=True,upload_to='manager_images/')