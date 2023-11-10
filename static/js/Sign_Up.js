var form = document.getElementById('form')
var username = document.getElementById('id_username')
var email = document.getElementById('id_email')
var password = document.getElementById('id_password')
var account_type = document.getElementById('account-type')


btn_account_type_ep = document.querySelector('#btn-account-type-ep')
btn_account_type_ni = document.querySelector('#btn-account-type-ni')
btn_account_type_un = document.querySelector('#btn-account-type-un')

btn_account_type_ep.addEventListener('click', ()=>{
    account_type.value = 'Empresarial'
    $('#card-account-type').slideUp(1500)
})
btn_account_type_ni.addEventListener('click', ()=>{
    account_type.value = 'Negócio_Individual'
    $('#card-account-type').slideUp(1500)
})
btn_account_type_un.addEventListener('click', ()=>{
    account_type.value = 'Usuário_Normal'
    $('#card-account-type').slideUp(1500)
})




setInterval(() => {
    var usernamevalue = username.value.trim()
    var passwordvalue = password.value.trim()

    if(usernamevalue.length >= 8){
        $('#error-icon-1').fadeOut('2000')
        $('#validate-icon-1').fadeIn('2000')
    }else{
        $('#error-icon-1').fadeIn('2000')
        $('#validate-icon-1').fadeOut('1000')
    }
    // use the length for verify if the password is valid | to do later
    if( passwordvalue.length >= 7){
        $('#error-icon-3').fadeOut('2000')
        $('#validate-icon-3').fadeIn('2000')
    }else{
        $('#error-icon-3').fadeIn('2000')
        $('#validate-icon-3').fadeOut('2000')
    }

    
    if( usernamevalue.length >= 8 && account_type.value !== '' && passwordvalue.length >= 8) 
    {   
        document.querySelector('#sign-up').disabled = false
    }else{
        document.querySelector('#sign-up').disabled = true
    }

    

}, 10);




function ValidateEmail()
    {
        
        const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        data = new FormData()
        data.append('email', email.value)
        
        fetch('/accounts/validate_email/', {
            method:'POST',
            headers: {
                "X-CSRFToken": csrf_token,
            },
            body:data,
        }).then(function(result){
            return result.json()
        }).then(function(data)
        {
            const status_email = data['status_email']

            if(status_email === "validated")
                {
                    $('#error-icon-2').fadeOut('2000')
                    $('#validate-icon-2').fadeIn('2000')
                    var passwordvalue = password.value.trim()
                setInterval(() => {
                    if(username.value.trim().length >= 8 && account_type.value == "" && passwordvalue.length >= 7)
                    {
                        show('#card-account-type')  
                    }
                }, 2000);
                    
                }            
            if(status_email === 'invalid')
                {
                    $('#error-icon-2').fadeIn('2000')
                    $('#validate-icon-2').fadeOut('2000')
                    $('#div-alert').fadeIn()
                    document.querySelector('#p-info-sign-up').innerHTML = "E-mail inválido"
                    setTimeout(()=>{
                        $('#div-alert').fadeOut()
                    }, 5000)
                }
            if(status_email === 'user invalid')
                {
                    $('#error-icon-2').fadeIn('2000')
                    $('#validate-icon-2').fadeOut('2000')
                    $('#div-alert').fadeIn()
                    document.querySelector('#p-info-sign-up').innerHTML = "Já existe um usuário com este e-mail"
                    setTimeout(()=>{
                        $('#div-alert').fadeOut()
                    }, 5000)
                }
        })
    }



    

form.addEventListener('keyup', ()=>{ 
    if(email.value.trim().indexOf('.com') !== -1)
        {
            ValidateEmail()
        }
})


function SignUp()
    {
        
        
        $('#create-account').fadeIn()
        $('.spinner-border').fadeIn()
        
        const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

        data = new FormData()
        data.append('username', username.value)
        data.append('email', email.value)
        data.append('password', password.value)
        data.append('account_type', account_type.value)

        fetch('/accounts/sign_up/', 
            {
                method: 'POST',
                headers:
                    {
                        'X-CSRFToken': csrf_token,
                    },
                body:data,
                
                    
                }).then((result)=>{
                    return result.json()
                }).then((data)=>{
                    const infoCreateAccount = data['infoCreateAccount']
                    username.value = ''
                    email.value = ''
                    password.value = ''
                    account_type.value = ''
                    $('#error-icon-2').fadeIn('2000')
                    $('#validate-icon-2').fadeOut('2000')
                    if(infoCreateAccount === 'Created')
                        {
                            $('.spinner-border').fadeOut()

                            setTimeout(()=>{
                                $('#created-account-icon').fadeIn()
                            }, 500)
                        
                            setTimeout(() => {
                                $('#created-account-icon').fadeOut('1000')
                                $('#create-account').fadeOut('1000')

                                setTimeout(()=>{
                                    document.querySelector('#p-info-sign-up').innerHTML = "Usuário criado com sucesso redirecting..."
                                    $('#div-alert').fadeIn()
                                    setTimeout(() => {
                                        redirect('/accounts/sign_in')
                                    }, 1000);
                                }, 500)

                            }, 1000);
                            
                        }else
                        {
                            $('.spinner-border').fadeOut('1000')
                            $('#error-create-account-icon').fadeIn('1000')
                        }
                    
            })
                

        

    }

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    SignUp()
})


