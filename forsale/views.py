from django.shortcuts import render
from django.contrib.auth.decorators import login_required 

def Home(request):
    return render(request, 'Home.html')
    
@login_required
def MyAccount(request):
    return render(request, 'MyAccount.html')