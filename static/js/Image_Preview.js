


function ImagePreview(ImageInput,ImagePreview, ImagePreviewDefault)
{
    $(ImagePreviewDefault).fadeOut()
  
    const image_input = document.querySelector(ImageInput)
    const image_preview =  document.querySelector(ImagePreview)

    
    const [file] = image_input.files
    image_preview.src = URL.createObjectURL(file)
    setTimeout(()=>{
        $(ImagePreview).fadeIn('1000')
            
    }, 1000)
    
    
    

}