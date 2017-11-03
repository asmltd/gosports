from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Athlete_achievements
from .serializers import AchievementsSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, DestroyAPIView, CreateAPIView, RetrieveUpdateAPIView, \
    RetrieveDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

# from .pagination import AthleteLimitOffsetPagination, AthletePageNumberPagination ==> for importing custom pagination


class AchievementCreateAPIView(CreateAPIView):
    """
    Create a new Achivement
    api ==> hostname:port/api/athlete/achievements/create/
    """
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AchievementListAPIView(ListAPIView):
    """
    Pull out all achievements, this is given with pagination
    api ==> hostname:port/api/athlete/achievements/
    """
    queryset = Athlete_achievements.objects.all()
    pagination_class = LimitOffsetPagination
    serializer_class = AchievementsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AchievementGetAthleteAPIView(ListAPIView):
    """
    get the achievements of particular athlete
    api ==> hostname:port/api/athlete/achievements/athlete_id/
    """
    serializer_class = AchievementsSerializer
    pagination_class = LimitOffsetPagination
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        athlete = self.kwargs['athlete']
        return Athlete_achievements.objects.filter(athlete_id=athlete)


class AchievementDetailAPIView(RetrieveAPIView):
    """
    Retrieve a particular achievement
    api ==> hostname:port/api/athlete/achievements/athlete_id/id/ where id = unique id for the achievements
    """
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AchievementUpdateAPIView(RetrieveUpdateAPIView):
    """
    update particular achievement
    api ==> hostname:port/api/achievements/athlete_id/id/edit
    """
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)


class AchievementDeleteAPIView(RetrieveDestroyAPIView):
    """
    Delete an achievement
    api ==> hostname:port/api/athlete/achievements/athlete_id/id/delete
    """
    queryset = Athlete_achievements.objects.all()
    serializer_class = AchievementsSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (IsAuthenticated,)



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