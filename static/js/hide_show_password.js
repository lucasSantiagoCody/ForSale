inputPassword = document.getElementById('id_password')
imageEye = document.querySelector('.fa-eye')
imageEyeSlash = document.querySelector('.fa-eye-slash')

inputPassword.type = 'password'

imageEyeSlash.addEventListener('click', 
    ()=>{
            
        $('.fa-eye-slash').fadeOut(500)
        $('.fa-eye').fadeIn(1000)
        inputPassword.type = 'text'
            
    })
       
imageEye.addEventListener('click', 
    ()=>{
        
       
        $('.fa-eye').fadeOut(500)
        $('.fa-eye-slash').fadeIn(1000)
        inputPassword.type = 'password'
            
    })
        
    

