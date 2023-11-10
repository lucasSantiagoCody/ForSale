from django.urls import path
from . import views


urlpatterns = [
    path('sign_in/', views.SignIn, name='SignIn'),
    path('sign_up/', views.SignUp, name='SignUp'),
    path('sign_out/', views.SignOut, name='SignOut'),
    path('validate_email/', views.ValidateEmail, name='ValidateEmail'),
    path('settings/my_info/', views.SettingsMyInfo, name="Settings"),
    path('settings/config_account/', views.SettingsConfigAccount, name="Settings"),
    path('add_image/', views.AddImage, name='AddImage'),
    
]

