const form = document.getElementById('form');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const birthday = document.getElementById('birthday');
const address = document.getElementById('address');
const phonenum = document.getElementById('phone-num');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_pass = document.getElementById('confirm-pass');


function InputValidation() {
    let firstNameVal = first_name.value.trim();
    let lastNameVal = last_name.value.trim();
    let birthdayVal = birthday.value.trim();
    let addressVal = address.value.trim();
    let phoneNumVal = phonenum.value.trim();
    let emailVal = email.value.trim();
    let passwordVal = password.value.trim();
    let confirmPassVal = confirm_pass.value.trim();
    let valid = true

    if(firstNameVal === '') {
        errorMsg(first_name);
        return valid = false;
    } successMsg(first_name);

    if(lastNameVal === '') {
        errorMsg(last_name);
        return valid = false;
    } successMsg(last_name);

    if(birthdayVal === '') {
        errorMsg(birthday);
        return valid = false;
    } successMsg(birthday);

    if(addressVal === '') {
        errorMsg(address);
        return valid = false;
    } successMsg(address);

    if(phoneNumVal === '') {
        errorMsg(phonenum);
        return valid = false;
    } else if (!isPhoneNum(phoneNumVal)) {
        errorMsg(phonenum);
        return valid = false;
    } successMsg(phonenum);

    if(emailVal === '') {
        errorMsg(email);
        return valid = false;
    }else if (~isEmail(emailVal)) {
        errorMsg(email);
        return valid = false;
    } successMsg(email);

    if(passwordVal === '') {
        errorMsg(password);
        return valid = false;
    } successMsg(password);

    if(confirmPassVal === '') {
        errorMsg(confirm_pass);
        return valid = false;
    } else if (confirmPassVal !== passwordVal){
        errorMsg(confirm_pass);
        return valid = false;
    } successMsg(confirm_pass);

    
    
}

function errorMsg(input) {
    input.className = 'form-control error';
}

function successMsg(input) {
    input.className = 'form-control success';
}

function isPhoneNum(phoneNum) {
    return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phoneNum);
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    
}