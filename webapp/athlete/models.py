from __future__ import unicode_literals
import datetime

from django.db import models
from ui.models import *

# Create your models here.
class Athlete_details(models.Model):
    athlete = models.ForeignKey(user_details, on_delete=models.CASCADE)
    sport = models.CharField(max_length=50, default='')
    first_name = models.CharField(max_length=50, default='')
    last_name = models.CharField(max_length=50, default='')
    father_name = models.CharField(max_length=50, default='')
    mobile_number = models.CharField(max_length=11, default='')
    hometown = models.CharField(max_length=100, default='')
    dateofbirth = models.DateField(default=datetime.date.today)
    coach = models.CharField(max_length=50, default='')
    staff = models.CharField(max_length=50, default='')
    training_base = models.CharField(max_length=100, default='')
    international_debute = models.CharField(max_length=100, default='')
    short_term_goal = models.CharField(max_length=100, default='')
    long_term_goal = models.CharField(max_length=100, default='')
    image = models.ImageField(null=True,blank=True,upload_to='user_images/')

    # def json_ready(self, detailed=False):
    #     data = {'id': self.id,
    #             'username': self.athlete.username,
    #             'first_name': self.athlete.first_name,
    #             'last_name': self.athlete.last_name,
    #             'email': self.athlete.email,
    #             'image': str(self.athlete.image),
    #             'sport' : self.sport,
    #             'hometown' : self.hometown,
    #             'dateofbirth' : self.dateofbirth,
    #             'coach' : self.coach,
    #             'training_base' : self.training_base,
    #             'international_debute' : self.international_debute,
    #             'short_term_goal' : self.short_term_goal,
    #             'long_term_goal' : self.long_term_goal
    #             }
    #
    #     if detailed:
    #         pass
    #
    #     return data