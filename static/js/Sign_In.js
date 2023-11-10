const form = document.querySelector('#form')
email = document.querySelector('#id_email')
password = document.querySelector('#id_password')

setInterval(()=>{
    emailvalue = document.getElementById('id_email').value.trim()
    passwordvalue = document.getElementById('id_password').value.trim()

    if( passwordvalue.length >= 7 && emailvalue.indexOf('.com') !== -1){
        document.querySelector('#sign-in').disabled = false
    }else{
        document.querySelector('#sign-in').disabled = true
    }
}, 1000)

function SignIn()
    {
        $('#div-sign-in-progress').fadeIn()
        document.querySelector('.spinner-border').style.display = 'block'
        const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

        data = new FormData()
        data.append('email', email.value)
        data.append('password', password.value)


        
        fetch("/accounts/sign_in/",
            {
                method: 'POST',
                headers:
                    {
                        "X-CSRFToken": csrf_token,
                    },
                body:data,
                
                    
                }).then((result)=>{
                    return result.json()
                }).then((data)=>{
                    info_response = data['infoSignIn']
                    signin_response = data['SignIn']
                    document.querySelector('#p-info-sign-in').innerHTML = info_response
                    $('#div-sign-in-progress').fadeOut()
                    document.querySelector('.spinner-border').style.display = 'none'
                    $('#div-alert').fadeIn()

                    setTimeout(()=>{
                        $('#div-alert').fadeOut()
                        
                    },5000)

                    if(signin_response === 'Success')
                        {
                            setTimeout(() => {
                                redirect("/forsale")
                            }, 500);
                    }
                    
                    
            })  
    }



form.addEventListener('submit', (e)=>{
    e.preventDefault()
    SignIn()
            
})





    
    
