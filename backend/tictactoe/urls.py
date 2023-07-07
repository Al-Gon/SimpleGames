# Django imports.
from django.urls import re_path
from django.urls import path
from django.conf.urls import include

# tictactoe application imports.
from . import views

# Specifies the app name for name spacing.
app_name = 'tictactoe'

urlpatterns = [
    path('api/v1/', views.GameListAPIView.as_view()),
    path('api/v1/<int:pk>/', views.GameListAPIView.as_view()),
    re_path(r'^api/v1/auth/', include('djoser.urls')),     
    re_path(r'^auth/', include('djoser.urls.authtoken')), 
]