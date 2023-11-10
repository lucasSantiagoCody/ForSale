form_config_account = document.querySelector('#form-config-account')




// ================================================================================




function EditAccount()
    {
        const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]')
        let name = document.querySelector('[name=first_name]').value
        let email = document.querySelector('[name=email]').value
        let password = document.querySelector('[name=password]').value
        let account_type = document.querySelector('[name=account_type]').value
        data = new FormData()

        data.append('name', name)
        data.append('email', email)
        data.append('password', password)
        data.append('account_type', account_type)
        data.append('configured_account', 'NO')
        
        // if form config account is null the account is configured
        if(form_config_account === null)
            {
    
                let phone_number = document.querySelector('[name=phone_number]').value
                let nif = document.querySelector('[name=nif]').value
                let born_date = document.querySelector('[name=born_date]').value
                let localization = document.querySelector('[name=localization]').value
                data.append('configured_account', 'YES')
                data.append('phone_number', phone_number)
                data.append('nif', nif)
                data.append('born_date', born_date)
                data.append('localization', localization)
            }
    
        
        

        fetch('/Accounts/Edit_Account',
        {
            method: 'POST',
            headers:
                {
                    "X-CSRFToken": csrf_token.value,
                },
            body:data,
        }).then((result)=>{
            return result.json()
        }).then((data)=>{
            operation = data['operation']
            $('.div-alert').fadeIn('2000')
            document.querySelector('.p-info').innerHTML = operation
            setTimeout(()=>{
                $('.div-alert').fadeOut('2000')
            }, 2000)


            
            
        })

    }

document.querySelector('#form-user-info').addEventListener('submit', (e)=>{
    e.preventDefault()
    EditAccount()
})
   
function ConfigAccount() 
    {
        document.getElementById('card-finally-operation').style.display = 'block'
        const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        phone_number =  document.querySelector('[name=phone_number]').value
        nif = document.querySelector('[name=nif]').value
        born_date = document.querySelector('[name=born_date]').value
        localization = document.querySelector('[name=localization]').value

        data = new FormData()
        data.append('phone_number', phone_number)
        data.append('nif', nif)
        data.append('born_date', born_date)
        data.append('localization', localization)

        fetch('/Accounts/Config_Account',
        {
            method: 'POST',
            headers:{
                "X-CSRFToken": csrf_token,
            },
            body:data,
        }).then((result)=>{
            return result.json()
        }).then((data)=>{
            info = data['operation']
            
            
            $('.spinner-border').fadeOut('2000')
            setTimeout(()=>{
                if(info === "success")
                    {
                        $('.success-icon').fadeIn('2000')
                        setTimeout(()=>{
                            $('.success-icon').fadeOut('1000')
                        }, 1000)
                    }
                else   
                    {
                        error_description = data['description']
                        document.querySelector('#error-description').innerHTML = error_description
                        $('.error-icon').fadeIn('1000') 
                        setTimeout(()=>{
                            document.querySelector('#error-description').innerHTML = ""
                            $('.error-icon').fadeOut('1000')
                            
                        }, 1000)         
                    }
            }, 1000)
            setTimeout(()=>{
                $('#card-finally-operation').fadeOut()
                setTimeout(()=>{
                    document.querySelector('.spinner-border').style.display = 'block'
                }, 2000)
                
            }, 2000)
            
            
        })
    }
    

if(form_config_account !== null)
    {
        document.querySelector('#form-config-account').addEventListener('submit', (e)=>
        {
            e.preventDefault()
            ConfigAccount()
        })

    }

    
