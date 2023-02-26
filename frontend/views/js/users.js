
//LOGIN INPUTS
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

//SIGNUP INPUTS
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const birthday = document.getElementById('birthday');
const address = document.getElementById('address');
const phoneNum = document.getElementById('phone-num');
const confirmPass = document.getElementById('confirm-pass');


function Validation() {
    
    var valid = true
    //login validation
    const emailValue = email.value.trim();
    const passValue = password.value.trim();

    //sign-up validation
    const fnameVal = firstName.value.trim();
    const lnameVal = lastName.value.trim();
    const birthdayVal = birthday.value.trim();
    const addressVal = address.value.trim();
    const phoneNumVal = phoneNum.value.trim();
    const confirmPassVal = confirmPass.value.trim();

    if (fnameVal === '') {
        errorMsg(firstName, 'This field cannot be blank.');
        return valid = false;
    } 
        successMsg(firstName);
    


    if (lnameVal === '') {
        errorMsg(lastName, 'This field cannot be blank.');
        return valid = false;
    } 
        successMsg(lastName);
        
    

    if (birthdayVal === '') {
        errorMsg(birthday, 'This field cannot be blank.');
        return valid = false;
    } 
        successMsg(birthday);
        
    

    if (addressVal === '') {
        errorMsg(address, 'This field cannot be blank.');
        return valid = false;
    } 
        successMsg(address);
        
    

    if (phoneNumVal === '') {
        errorMsg(phoneNum, 'This field cannot be blank.');
        return valid = false;
    } else if (!isPhoneNum(phoneNumVal)) {
        errorMsg(phoneNum, 'Enter a valid phone number.');
        return valid = false;
    }
        successMsg(phoneNum);

    
        //email validation
    if (emailValue === '') {
        errorMsg(email, 'This field cannot be blank.');
        return valid = false;
        
    } else if (!isEmail(emailValue)) {
        errorMsg(email, 'Enter a valid email.');
        return valid = false;
    } 
    successMsg(email);
        
        
    //password validation
    if (passValue === '') {
        errorMsg(password, 'This field cannot be blank.');
        return valid = false;
    } 
        successMsg(password);
        
    

    if (confirmPassVal === '') {
        errorMsg(confirmPass, 'This field cannot be blank.');
        return valid = false
    } else if (confirmPassVal !== passValue) {
        errorMsg(confirmPass, 'Your passwords do not match.');
        return valid = false
    } 
        successMsg(confirmPass);
        
}

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('small');

    small.innerHTML = msg;

    formItem.className = 'form-item error';
}

function successMsg(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}

//validates if the input is a valid email
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    
}

//validates phone number input
function isPhoneNum(phoneNum) {
    return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phoneNum);
}



