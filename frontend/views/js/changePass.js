const oldPass = document.getElementById('oldPassword')
const newPass = document.getElementById('newPassword')
const verifyNewPass = document.getElementById('verifyNewPassword')

function Validate(){
    var valid = true
    const oldPassVal = oldPass.value.trim()
    const newPassVal = newPass.value.trim()
    const verifyNewPassVal = verifyNewPass.value.trim()

    if (oldPassVal === '') {
        errorMsg(oldPass, 'This cannot be empty.')
        return valid = false
    } successMsg(oldPass)

    if (newPassVal === '') {
        errorMsg(newPass, 'This cannot be empty.')
        return valid = false
    } successMsg(newPass)
    
    if (verifyNewPassVal === '') {
        errorMsg(verifyNewPass, 'This cannot be empty.')
        return valid = false
    }else if (newPassVal != verifyNewPassVal) {
        errorMsg(verifyNewPass, 'Your passwords do not match.')
        return valid = false
    } else successMsg(verifyNewPass)

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
