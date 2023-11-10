from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse 
from django.urls import reverse

import json
from .forms import SignUpForm, SignInForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from .models import User, UserInformation
import re 
from django.core import serializers


def ValidateEmail(request):
    if request.method == 'GET':
        return redirect(reverse('SignIn'))
    else:
        email = request.POST.get('email')
        user = User.objects.filter(username=email)
        valid_email = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

        if re.search(valid_email, email):
            if not user:
                return JsonResponse({'status_email':'validated'})
            else:
                return JsonResponse({'status_email': 'invalid'})
        else:
            return JsonResponse({'status_email': 'invalid'})
    


def SignUp(request):
    form = SignUpForm()
    context = {'form': form}
    
    if request.method == 'GET':
        return render(request, 'Sign_Up.html', context)

    elif request.method == 'POST':

        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        account_type = request.POST.get('account_type')
        
        try:
            user = User.objects.create_user(username=email, first_name=username, password=password, account_type=account_type)
            user.save()
            return JsonResponse({'infoCreateAccount':'Created'})
        except:
            return JsonResponse({'infoCreateAccount':"Erro"})
        
        return render(request, 'Sign_Up.html', context)
        


def SignIn(request):
    form = SignInForm()
    status = request.GET.get('status')
    context = {'form': form, 'status': status}
    

    if request.method == 'GET':
            return render(request, 'Sign_In.html', context)
    else:

        email = request.POST.get('email')
        password = request.POST.get('password')
        
        user = authenticate(username=email, password=password)
        if not user:
            verify_email = User.objects.filter(username=email)
            if not verify_email:
                return JsonResponse({'infoSignIn': 'Usuário não Existente!'})
            else:
                return JsonResponse({'infoSignIn': 'Senha Incorreta!'})
        else:
            login(request, user)
            return JsonResponse({'infoSignIn': 'login feito com sucesso redirecting ...', 'SignIn':'Success'})
        
    


def SignOut(request):
    request.session.flush()
    if not request.user.is_authenticated:
        return redirect(reverse('SignIn'))
    else:
        return redirect('/?status=0')

@login_required
def SettingsMyInfo(request):
    if request.method == 'GET':
        user_informations = {}
        main_informations = User.objects.filter(id=request.user.id)
        additional_informations = UserInformation.objects.filter(user=request.user)

        main_informations_json = json.loads(serializers.serialize('json', main_informations))[0]['fields']
        main_informations_json['password'] = None
        user_informations['main_informations'] = main_informations_json

        if additional_informations:
            additional_informations_json = json.loads(serializers.serialize('json', additional_informations))[0]['fields']
            user_informations['additional_informations'] = additional_informations_json    
        else:
            user_informations['additional_informations'] = 'nothing'
        
        return JsonResponse({'user_informations': user_informations})
    elif request.method == 'POST':
        pass

@login_required()
def SettingsConfigAccount(request):
    pass



        
def AddImage(request):
    file = request.FILES
    print(file)
    return HttpResponse('ola')