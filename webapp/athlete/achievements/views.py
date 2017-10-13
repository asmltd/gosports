from .models import Athlete_achievements
from .serializers import AchievementsSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

# from .pagination import AthleteLimitOffsetPagination, AthletePageNumberPagination ==> for importing custom pagination

#Create a new Achivement
#url/api/achievements/create/
class AchievementCreateAPIView(CreateAPIView):
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer


#Pull out all achievements, this is given with pagination
#url/api/achievements/
class AchievementListAPIView(ListAPIView):
    queryset = Athlete_achievements.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = AchievementsSerializer


#get the achievements of particular athlete
#url/api/achievements/athlete_id/
class AchievementGetAthleteAPIView(ListAPIView):
    serializer_class = AchievementsSerializer

    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_achievements.objects.filter(athlete_id=athlete)


#Retrieve a particular achievement
#url/api/achievements/athlete_id/id/ where id = unique id for the achievements
class AchievementDetailAPIView(RetrieveAPIView):
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer


#update particular achievement
#url/api/achievements/athlete_id/id/edit
class AchievementUpdateAPIView(UpdateAPIView):
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer


#Delete an achievement
#url/api/achievements/athlete_id/id/delete
class AchievementDeleteAPIView(DestroyAPIView):
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer



#this is the method implementation of GET and POST

# @api_view(['GET', 'POST'])
# def achievements_list(request):
#     """
#     List all tasks, or create a new task.
#     """
#     if request.method == 'GET':
#         tasks = Athlete_achievements.objects.all()
#         serializer = AchievementsSerializer(tasks, many=True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = AchievementsSerializer(data=request.DATA)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(
#                 serializer.errors, status=status.HTTP_400_BAD_REQUEST)