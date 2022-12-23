const form = document.getElementById('form');
const bodyNum = document.getElementById('body-num');
const driverName = document.getElementById('driver-name');
const TODA = document.getElementById('toda')
const driverDesc = document.getElementById('driver-desc')
const violation = document.getElementById('violation-type')
const date = document.getElementById('date');
const incidentDesc = document.getElementById('incident-desc');
const complainant = document.getElementById('complainant');
const evidence = document.getElementById('evidence');



form.addEventListener('submit', e => {
    e.preventDefault();

    formValidation();
})

function formValidation() {
    const bodyNumVal = bodyNum.value.trim();
    const driverNameVal = driverName.value.trim();
    const TODAVal = TODA.value.trim()
    const driverDescVal = driverDesc.value.trim();
    const violationVal = violation.value.trim()
    const dateVal = date.value.trim();
    const incidentDescVal = incidentDesc.value.trim();
    const complainantVal = complainant.value.trim();

    
    if(bodyNumVal === '') {
        errorMsg(bodyNum, 'This field cannot be blank.');
    } else if(bodyNumVal.length !== 4) {
        errorMsg(bodyNum, 'Invalid number of Body Number');
    }
    else {
        successMsg(bodyNum);
    }
    
    if(driverNameVal === '') {
        errorMsg(driverName, 'This field cannot be blank.');
    } else {
        successMsg(driverName);
    }

    if(TODAVal === '') {
        errorMsg(TODA, 'This field cannot be blank.');
    } else {
        successMsg(TODA);
    }

    if(driverDescVal === '') {
        errorMsg(driverDesc, 'Please provide further information.');
    } else {
        successMsg(driverDesc);
    }

    if(violationVal === '') {
        errorMsg(violation, 'Please provide further information.');
    } else {
        successMsg(violation);
    }
    
    if(dateVal === '') {
        errorMsg(date, 'This field cannot be blank.');
    } else {
        successMsg(date);
    }
    
    if(incidentDescVal === '') {
        errorMsg(incidentDesc, 'Please provide further information.');
    } else {
        successMsg(incidentDesc);
    }

    if(complainantVal === '') {
        errorMsg(complainant, 'Please provide further information.');
    } else {
        successMsg(complainant);
    }

}

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('.form-text');

    small.innerHTML = msg;

    formItem.className = 'form-item error';
}

function successMsg(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}
