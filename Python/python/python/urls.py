from . import views
from django.contrib import admin
from django.urls import path




urlpatterns = [
    path('', views.login, name='login'),
    path('signup', views.signup, name='signup')
]
