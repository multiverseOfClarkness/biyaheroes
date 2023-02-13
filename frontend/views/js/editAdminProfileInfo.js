const edit_popup = document.getElementById('edit-popup');


const submit_driver = document.getElementById('submit-new-driver');
const phone = document.getElementById('phone')



const editDriverInfo = (e) =>{
  var tds = e.getElementsByClassName('driver-data');
  
  edit_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const myArray = tds[0].innerHTML.trim().split(" ");
  
  driver_fname.setAttribute('value', myArray[0])
  driver_lname.setAttribute('value', myArray[1])
  driver_bodyNum.setAttribute('value', tds[1].innerHTML.trim())
  
  driver_contact.setAttribute('value', tds[2].innerHTML.trim().replace("+63", ""))
  driverid.setAttribute('value', tds[3].innerHTML.trim())
  
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

function ValidateNum() {
  let valid = true
  if(phone.value !== null && phone.value != "") {
      var counter = phone.value;
    
    if(counter.length !== 10) {
        //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
        Err(phone);
        return valid = false
    } else {
    //KINUKUHA YUNG FIRST DIGIT NG INPUT
      var firstDigit = counter.slice(0,1);
      
      if(parseInt(firstDigit) !== 9) {
          Err(phone);
          return valid = false
      } else {
        Success(phone);
      }
    }
  } else {
      Err(phone);
      return valid = false
  }
}

function Success(input) {
  input.className = 'form-control success';
}
  
function Err(input) {
  input.className = 'form-control error';  
}