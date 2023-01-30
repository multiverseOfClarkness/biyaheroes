function validateEmptyField() {
  let x = document.getElementById("old-password").value;
  let y = document.getElementById("new-password").value;
  let z = document.getElementById("confirm-password").value;
  let valid = true;

  if (x === "") {
    document.getElementById("error").style.display = "block";
    return (valid = false);
  } else {
    document.getElementById("error").style.display = "none";
  }

  if (y === "") {
    document.getElementById("error").style.display = "block";
    return (valid = false);
  } else {
    document.getElementById("error").style.display = "none";
  }

  if (z === "") {
    document.getElementById("error").style.display = "block";
    return (valid = false);
  } else {
    document.getElementById("error").style.display = "none";
  }
}

const success_popup = document.getElementById('success-popup')
const error_popup = document.getElementById('error-popup');
function errorPopup() {
  
  error_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const x_btns = document.getElementsByClassName('close');
  
    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }