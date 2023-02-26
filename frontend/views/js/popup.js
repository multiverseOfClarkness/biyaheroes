const error_popup = document.getElementById('error-popup');
const success_popup = document.getElementById('success-popup');
const closebtn = document.getElementById('okay')
const maskk = document.getElementById('page-mask');

// const mask = document.getElementById('page-mask');
const successPopup = () => {
    success_popup.style.display = 'block'
    mask.style.visibility = 'visible'

    closebtn.addEventListener('click', () => {
        success_popup.style.display = 'none'
        mask.style.visibility = 'hidden'
    })
}
const errorPopup = () => {
    error_popup.style.display = 'block'
    mask.style.visibility = 'visible'

    closebtn.addEventListener('click', () => {
        error_popup.style.display = 'none'
        mask.style.visibility = 'hidden'
    })
}



function ErrorAutoClosePopup() {
    error_popup.style.display = 'none';
    
    mask.style.visibility = 'hidden';
}

setTimeout(ErrorAutoClosePopup, 5000);

function SuccessAutoClosePopup() {
    success_popup.style.display = 'none';
    
    mask.style.visibility = 'hidden';
}

setTimeout(SuccessAutoClosePopup, 5000);
