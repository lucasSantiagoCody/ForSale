from django.urls import path
from .views import Home, MyAccount

urlpatterns = [
    path('', Home, name='Home'),
    path('my_account/',MyAccount, name='MyAccount'),
]