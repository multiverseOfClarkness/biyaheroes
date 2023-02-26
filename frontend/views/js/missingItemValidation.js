const form = document.getElementById('form');
const bodyNum = document.getElementById('bodyNum');
const driverName = document.getElementById('driverName');
const toda = document.getElementById('toda')
const driverDesc = document.getElementById('driverDesc')
const itemType = document.getElementById('itemType')
const date = document.getElementById('date');
const itemDescription = document.getElementById('itemDescription');
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

function validate() {
    var valid = true
    const bodyNumVal = bodyNum.value.trim();
    const driverNameVal = driverName.value.trim();
    const todaVal = toda.value
    const driverDescVal = driverDesc.value.trim();
    const dateVal = date.value.trim();
    const itemDescriptionVal = itemDescription.value.trim();
    const itemTypeVal = itemType.value.trim();
    
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
    

    if(todaVal === `Select the Driver's TODA`) {
        errorMsg(toda, `Please choose the toda.`)
        return valid = false
    } else {
        successMsg(toda);
    }

    if(itemTypeVal === '') {
        errorMsg(itemType, 'Please choose type of violation.');
        return valid = false
    } else {
        successMsg(itemType);
    }
    
    if(dateVal === '') {
        errorMsg(date, 'Please provide date of incident.');
        return valid = false
    } else {
        successMsg(date);
    }
    
    if(itemDescriptionVal === '') {
        errorMsg(itemDescription, 'Please provide further information.');
        return valid = false
    } else {
        successMsg(itemDescription);
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
