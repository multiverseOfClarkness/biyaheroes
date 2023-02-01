const form = document.getElementById('form');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const birthday = document.getElementById('birthday');
const address = document.getElementById('address');
const phonenum = document.getElementById('phone-num');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_pass = document.getElementById('confirm-pass');
const errorText = document.getElementById('error-msg')
const user = document.getElementById('users')
const userVal = user.value.split(',')




function InputValidation() {
    
    let firstNameVal = first_name.value.trim();
    let lastNameVal = last_name.value.trim();
    let birthdayVal = birthday.value.trim();
    let addressVal = address.value.trim();
    let phoneNumVal = phonenum.value.trim();
    let emailVal = email.value;
    let passwordVal = password.value.trim();
    let confirmPassVal = confirm_pass.value.trim();
    
    let valid = true

    if(firstNameVal === '') {
        errorMsg(first_name, 'Please provide first name.');
        return valid = false;
    } successMsg(first_name);

    if(lastNameVal === '') {
        errorMsg(last_name, 'Please provide last name.');
        return valid = false;
    } successMsg(last_name);

    if(birthdayVal === '') {
        errorMsg(birthday, 'Please provide birthday.');
        return valid = false;
    } successMsg(birthday);

    if(addressVal === '') {
        errorMsg(address, 'Please provide address.');
        return valid = false;
    } successMsg(address);

    if(phoneNumVal === '') {
        errorMsg(phonenum, 'Please provide phone number.');
        return valid = false;
    } else if (!isPhoneNum(phoneNumVal)) {
        errorMsg(phonenum, 'Please provide valid phone number (Format: 09---).');
        return valid = false;
    } successMsg(phonenum);

    if(emailVal === '') {
        errorMsg(email, 'Please provide email.');
        return valid = false;
    }else if (!isEmail(emailVal)) {
        errorMsg(email, 'Please provide a valid email.');
        return valid = false;
    } else if (userVal.includes(emailVal)){
        errorMsg(email, 'Email already used.');
        return valid = false;
    } successMsg(email);

    if(passwordVal === '') {
        errorMsg(password, 'Please enter password.');
        return valid = false;
    } successMsg(password);

    if(confirmPassVal === '') {
        errorMsg(confirm_pass, 'Please re-enter password.');
        return valid = false;
    } else if (confirmPassVal !== passwordVal){
        errorMsg(confirm_pass, `Passwords don't match.`);
        return valid = false;
    } successMsg(confirm_pass);

    
}

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('small');
    
    small.innerHTML = msg;
    formItem.className = 'form-item error'
    input.className = 'form-control error';
}

function successMsg(input) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('small');
    
    small.style.visibility = 'hidden';
    input.className = 'form-control success';

}

function isPhoneNum(phoneNum) {
    return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phoneNum);
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    
}