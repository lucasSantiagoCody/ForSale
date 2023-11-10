

document.querySelector('.i-first-name').addEventListener('click',()=>{
    document.querySelector('[name=first_name]').disabled = false
    $('.i-first-name').fadeOut('2000')
})
document.querySelector('.i-email').addEventListener('click',()=>{
    document.querySelector('[name=email]').disabled = false
    $('.i-email').fadeOut('2000')
})
document.querySelector('.i-account-type').addEventListener('click',()=>{
    document.querySelector('[name=account_type]').disabled = false
    $('.i-account-type').fadeOut('2000')
})
document.querySelector('.i-phone-number').addEventListener('click',()=>{
    document.querySelector('[name=phone_number]').disabled = false
    $('.i-phone-number').fadeOut('2000')
})
document.querySelector('.i-nif').addEventListener('click',()=>{
    document.querySelector('[name=nif]').disabled = false
    $('.i-nif').fadeOut('2000')
})
document.querySelector('.i-localization').addEventListener('click',()=>{
    document.querySelector('[name=localization]').disabled = false
    $('.i-localization').fadeOut('2000')
})
document.querySelector('.i-born-date').addEventListener('click',()=>{
    document.querySelector('[name=born_date]').disabled = false
    $('.i-born-date').fadeOut('2000')
})
    










document.querySelector('#btn-settings').addEventListener('click', ()=>{
    document.querySelector('.hidden').classList.add('show')
    document.querySelector('#btn-settings').classList.add('set-border-bottom')
})
document.querySelector('#card-my-info').addEventListener('click', ()=>{
    hide('#cards-settings')
    setTimeout(()=>{
        show('#settings-my-info')
    }, 200)
    

})
document.querySelector('#card-config-account').addEventListener('click', ()=>{
    hide('#cards-settings')
    setTimeout(()=>{
        show('#settings-config-account')
    },200)
})


    const csrft_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    fetch('/accounts/settings/my_info/', {
        method:'GET',
        headers: {
            "X-CSRFToken": csrft_token,
        }
    }).then((result)=>{
        return result.json()
    }).then((data)=>{
        main_informations = data['user_informations']['main_informations']
        additional_informations = data['user_informations']['additional_informations']
        document.getElementById('first_name').value = main_informations['first_name']
        document.getElementById('email').value = main_informations['username']
        document.getElementById('account_type').value = main_informations['account_type']
        if(additional_informations !== "")
            {
                document.getElementById('phone_number').value = additional_informations['phone_number']
                document.getElementById('nif').value = additional_informations['nif']
                document.getElementById('born_date').value = additional_informations['born_date']
                document.getElementById('localization').value = additional_informations['localization']
       
            }else{
                document.getElementById('phone_number').style.display = "none"
                document.getElementById('nif').style.display = "none"
                document.getElementById('born_date').style.display = "none"
                document.getElementById('localization').style.display = "none"
       
            }
    })
