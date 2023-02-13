
const edit_popup = document.getElementById('edit-popup');
const mask = document.getElementById('page-mask');
const popups = document.getElementsByClassName('popup-box');

const submit_driver = document.getElementById('submit-new-driver');
const driver_fname = document.getElementById('edit-driver-firstname');
const driver_lname = document.getElementById('edit-driver-lastname');
const driver_bodyNum = document.getElementById('edit-driver-bodynum');
const driver_contact = document.getElementById('edit-driver-contact');
const driver_toda = document.getElementById('toda');
const driverid = document.getElementById('driver-id');



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
  if(driver_contact.value !== null && driver_contact.value != "") {
      var counter = driver_contact.value;
    
    if(counter.length !== 10) {
        //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
        Err(driver_contact);
        return valid = false
    } else {
    //KINUKUHA YUNG FIRST DIGIT NG INPUT
      var firstDigit = counter.slice(0,1);
      
      if(parseInt(firstDigit) !== 9) {
          Err(driver_contact);
          return valid = false
      } else {
        Success(driver_contact);
      }
    }
  } else {
      Err(driver_contact);
      return valid = false
  }
}

function Success(input) {
  input.className = 'form-control success';
}
  
function Err(input) {
  input.className = 'form-control error';  
}