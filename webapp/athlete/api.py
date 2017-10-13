# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.viewsets import ViewSet
# from rest_framework.response import Response
# from rest_framework import status
# from .models import *
# from ui.models import *
# import json
#
# from .models import *
#
#
# class AthleteViewSet(ViewSet):
#     base_url = r''
#     base_name = ''
#
#     @csrf_exempt
#     def create(self, request):
#         if not request.user.is_authenticated():
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
#         try:
#             data = request.data
#
#             user = user_details.objects.all().filter(username=data['username'])[0]
#             newathlete = Athlete_details.objects.create(athlete=user,
#                                                         sport=data['sport'] if 'sport' in data.keys() else "",
#                                                         hometown=data['hometown'] if 'hometown' in data.keys() else "",
#                                                         dateofbirth=data[
#                                                             'dateofbirth'] if 'dateofbirth' in data.keys() else "",
#                                                         coach=data['coach'] if 'coach' in data.keys() else "",
#                                                         usertype=data['usertype'] if 'usertype' in data.keys() else "")
#
#             newathlete.save()
#             return Response({"result": "User created successfully", "status": True})
#
#         except Exception as e:
#             print str(e)
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#
#     def list(self, request):
#         if not request.user.is_authenticated():
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
#         if request.method == "GET":
#             users = Athlete_details.objects.all()
#             result = []
#             for user in users:
#                 result.append({"id": user.id,
#                                "name": user.athlete.username,
#                                "dateofbirth": user.dateofbirth,
#                                "coach": user.coach,
#                                "sport": user.sport,
#                                "staff": user.staff,
#                                "hometown": user.hometown})
#             message = {"result": result,
#                        "number_of_rows": len(result),
#                        "total_rows": len(result),
#                        "page": 1,
#
#                        }
#             return Response(message)
#         else:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#
#     @csrf_exempt
#     def partial_update(self, request, pk=None):
#         try:
#             if Athlete_details.objects.filter(id=pk).count() > 0:
#                 user = Athlete_details.objects.get(id=pk)
#                 data = json.loads(request.body)
#
#                 if "short_term_goal" in data:
#                     user.short_term_goal = data['short_term_goal']
#                 if "long_term_goal" in data:
#                     user.long_term_goal = data['long_term_goal']
#                 if "training_base" in data:
#                     user.training_base = data['training_base']
#                 if "international_debute" in data:
#                     user.international_debute = data['international_debute']
#
#                 user.save()
#                 return Response({"result": "Updated successfully", "status": True})
#             else:
#                 return Response({"result": "Failed - User not found", "status": False})
#         except Exception as e:
#             print e
#             return Response(status=status.HTTP_400_BAD_REQUEST)
#
#     def retrieve(self, request, pk=None):
#         if not request.user.is_authenticated():
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
#         if Athlete_details.objects.filter(pk=pk).exists():
#             return Response(Athlete_details.objects.get(pk=pk).json_ready())
#         return Response(status=status.HTTP_401_UNAUTHORIZED)
#
#     def destroy(self, request, pk=None):
#         if pk and request.user.is_authenticated():
#             athlete = Athlete_details.objects.get(id=pk)
#             athlete.delete()
#             return Response({"result": "Athlete removed successfully", "status": True})
#         return Response({"result": "Athlete was not removed", "status": False})
