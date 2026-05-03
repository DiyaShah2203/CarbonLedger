# calculator/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('calculate/', views.calculator_input_view, name='calculator_input'),
    path('result/', views.result_view, name='result'),
    path('about/', views.about_view, name='about'),
]