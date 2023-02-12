const error_popup = document.getElementById('error-popup');
const mask = document.getElementById('page-mask');
const popups = document.getElementsByClassName('popup-box');

const errorPopout = () => {
    error_popup.style.display = 'block';
    mask.style.visibility = 'visible';
    const x_btns = document.getElementsByClassName('close');
    
      for(var x of x_btns) {
        x.addEventListener('click', ClosePopup);
      }
  }

function ClosePopup() {
    mask.style.visibility = 'hidden';

    for(var popup of popups) {
        popup.style.display = 'none';
    }

    const inputs = document.getElementsByClassName('form-control');

    //REMOVES THE ERROR CLASS
    for(var input of inputs) {
        if(input.classList.contains('error')) {
        input.classList.remove('error');
        }
    }
}