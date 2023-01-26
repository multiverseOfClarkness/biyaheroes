const form = document.getElementById('form');
const bodyNum = document.getElementById('body-num');
const driverName = document.getElementById('driver-name');
const toda = document.getElementById('toda')
const driverDesc = document.getElementById('driver-desc')
const violation = document.getElementById('violation')
const date = document.getElementById('date');
const incidentDesc = document.getElementById('incident-desc');
const complainantMe = document.getElementById('me')
const complainantSomeoneElse = document.getElementById('someone-else')
const evidence = document.getElementById('evidence');
const error_popup = document.getElementById('error-popup');
const mask = document.getElementById('page-mask');
const popups = document.getElementsByClassName('popup-box');

function errorPopout() {
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
}
function formValidation() {
    var valid = true
    const bodyNumVal = bodyNum.value.trim();
    const driverNameVal = driverName.value.trim();
    const todaVal = toda.value
    const driverDescVal = driverDesc.value.trim();
    const violationVal = violation.value
    const dateVal = date.value.trim();
    const incidentDescVal = incidentDesc.value.trim();
    
    if(bodyNumVal === '') {
        errorMsg(bodyNum, 'Please provide body number.');
        return valid = false
    } else if(bodyNumVal.length !== 4) {
        errorMsg(bodyNum, 'Invalid number of Body Number');
        return valid = false
    }
    else {
        successMsg(bodyNum);
    }
    
    if(driverNameVal === '') {
        errorMsg(driverName, `Please provide driver's name or alias.`);
        return valid = false
    } else {
        successMsg(driverName);
    }

    if(todaVal === `Select the Driver's TODA`) {
        errorMsg(toda, `Please choose the toda.`)
        return valid = false
    } else {
        successMsg(toda);
    }

    if(driverDescVal === '') {
        errorMsg(driverDesc, 'Please provide further information.');
        return valid = false
    } else {
        successMsg(driverDesc);
    }

    if(violationVal === 'Select Type of Violation') {
        errorMsg(violation, 'Please choose type of violation.');
        return valid = false
    } else {
        successMsg(violation);
    }
    
    if(dateVal === '') {
        errorMsg(date, 'Please provide date of incident.');
        return valid = false
    } else {
        successMsg(date);
    }
    
    if(incidentDescVal === '') {
        errorMsg(incidentDesc, 'Please provide further information.');
        return valid = false
    } else {
        successMsg(incidentDesc);
    }

    if(complainantMe.checked){
        successMsgRadioButton(complainantMe)
    }else if (complainantSomeoneElse.checked){
        successMsgRadioButton(complainantSomeoneElse)
    }else {
       errorMsgRadioButton(complainantSomeoneElse, 'Please indicate complainant.')
       return valid = false
    }

}



function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('.form-text');

    small.innerHTML = msg;

    formItem.className = 'form-item error';
}

function errorMsgRadioButton(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('.form-text');

    small.innerHTML = msg;

    formItem.className = 'form-item-radio error';
}

function successMsg(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}

function successMsgRadioButton(input) {
    const formItem = input.parentElement   
    formItem.className = 'form-item-radio success';
}
