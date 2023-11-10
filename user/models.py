from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
	account_type = models.CharField(max_length=18)
	
	

class UserInformation(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	phone_number = models.CharField(max_length=9)
	nif = models.CharField(max_length=14)
	# change this field for models.datefield 
	born_date = models.DateField()
	localization = models.CharField(max_length=20)