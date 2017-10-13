from django.views.decorators.csrf import csrf_exempt
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import *
from athlete.models import *
import json

from .models import *

class SessionViewSet(ViewSet):
    base_url = r'/session'
    base_name = ''

    def list(self, request):
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if request.method == "GET":
            users = user_details.objects.get(id=request.user.id)
            result = {
                "username" : users.username,
                "first_name" : users.first_name,
                "last_name" : users.last_name,
                "id" : users.id,
                "email" : users.email,
                "usertype" : users.usertype
            }

            return Response(result)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(ViewSet):
    base_url = r'/users'
    base_name = ''

    @csrf_exempt
    def create(self, request):
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            data = request.data
            usertype = data['usertype'] if 'usertype' in data.keys() else ""
            newuser = user_details.objects.create(username=data['username'] if 'username' in data.keys() else "",
                                                  first_name=data[
                                                      'first_name'] if 'first_name' in data.keys() else "",
                                                  last_name=data['last_name'] if 'last_name' in data.keys() else "",
                                                  email=data['email'] if 'email' in data.keys() else "",
                                                  usertype=usertype)
            password = data['password'] if 'password' in data.keys() else ""
            newuser.set_password(password)
            newuser.save()
            if usertype != "":
                Athlete_details.objects.create(athlete=newuser,first_name=newuser.username)
            return Response({"result": "User created successfully", "status": True})

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if request.method == "GET":
            users = user_details.objects.all()
            result = []
            for user in users:
                result.append({"id": user.id, "name": user.username, "email": user.email})
            return Response(result)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if user_details.objects.filter(pk=pk).exists():
            return Response(user_details.objects.get(pk=pk).json_ready())
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    @csrf_exempt
    def partial_update(self, request, pk=None):
        try:
            if user_details.objects.filter(id=pk).count() > 0:
                user = user_details.objects.get(id=pk)
                data = json.loads(request.body)

                if "username" in data:
                    user.username = data['username']
                if "email" in data:
                    user.email = data['email']
                if "password" in data:
                    user.set_password(data['password'])
                user.save()
                return Response({"result": "Updated successfully", "status": True})
            else:
                return Response({"result": "Failed - User not found", "status": False})
        except Exception as e:
            print e
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        if pk and request.user.is_authenticated():
            user = user_details.objects.get(id=pk)
            user.delete()
            return Response({"result": "User removed successfully", "status": True})
        return Response({"result": "User was not removed successfully", "status": False})
