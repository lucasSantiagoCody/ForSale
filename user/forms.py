from django import forms
from .models import User
from django.contrib.auth import forms as forms_auth

class SignUpForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            field.widget.attrs['placeholder'] = f"{field_name}:".capitalize()  
            
class SignInForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            field.widget.attrs['placeholder'] = f"{field_name}:".capitalize()     

class UserChangeForm(forms_auth.UserChangeForm):
    class Meta(forms_auth.UserChangeForm.Meta):
        model = User

class UserCreationForm(forms_auth.UserCreationForm):
    class Meta(forms_auth.UserCreationForm.Meta):
        model = User