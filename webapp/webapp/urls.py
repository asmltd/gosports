"""webapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    url(r'^docs/', include('rest_framework_docs.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls')),
    url(r'^', include('ui.urls')),
    url(r'^api/athlete/', include("athlete.urls", namespace="athletes-api")),
    url(r'^api/athlete/achievements/', include("athlete.achievements.urls", namespace="athlete-achievements-api")),
    url(r'^api/athlete/finance/', include("athlete.finance.urls", namespace="athlete-finance-api")),
    url(r'^api/athlete/interactions/', include("athlete.interactions.urls", namespace="athlete-interactions-api")),
    url(r'^api/athlete/performance/', include("athlete.performance.urls", namespace="athlete-performance-api")),
    url(r'^api/athlete/media/', include("athlete.athletemedia.urls", namespace="athlete-athletemedia-api")),
    url(r'^api/manager/', include("managers.urls", namespace="managers-api")),
    url(r'^api/coach/', include("coach.urls", namespace="coach-api")),
    url(r'^api/partner/', include("partners.urls", namespace="partner-api")),
    url(r'^api/calendar/', include("calender.urls", namespace="calendar-api")),
]

urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
    ]