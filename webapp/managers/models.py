# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from ui.models import *

# Create your models here.

class Managers_Details(models.Model):
    manager = models.ForeignKey(user_details, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    location = models.CharField(max_length=50, default='')
    image = models.ImageField(null=True,blank=True,upload_to='manager_images/')
