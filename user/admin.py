from django.contrib import admin
from .models import User, UserInformation
from django.contrib import admin 
from django.contrib.auth import admin as admin_auth
from .forms import UserChangeForm, UserCreationForm

# Register your models here.

admin.site.register(User)
 
class UserAdmin_auth(admin_auth.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    model = User
     

admin.site.register(UserInformation)