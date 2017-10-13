from django.db import models
from django.contrib.sessions.backends.db import SessionStore as DBStore
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import AbstractUser, Group
import datetime

class user_details(AbstractUser):
    usertype = models.CharField(max_length=50, default='')

    def json_ready(self, detailed=False):
        data = {'id': self.id,
                'username': self.username,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'email': self.email,
                'image': str(self.image),
                'usertype': self.usertype if self.usertype else "",
                }

        if detailed:
            pass

        return data



