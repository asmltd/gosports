from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class AthleteLimitOffsetPagination(LimitOffsetPagination):
    max_limit = 10
    default_limit = 2


class AthletePageNumberPagination(PageNumberPagination):
    page_size = 5
