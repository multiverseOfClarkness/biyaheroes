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

function validate() {
    var valid = true
    const bodyNumVal = bodyNum.value.trim();
    const driverNameVal = driverName.value.trim();
    const todaVal = toda.value
    const driverDescVal = driverDesc.value.trim();
    const dateVal = date.value.trim();
    const itemDescriptionVal = itemDescription.value.trim();
    
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

    // if(itemTypeVal === 'Select Type of Violation') {
    //     errorMsg(violation, 'Please choose type of violation.');
    //     return valid = false
    // } else {
    //     successMsg(violation);
    // }
    
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
