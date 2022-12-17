const edit = document.getElementById('edit')
const save = document.getElementById('save');
const cancel = document.getElementById('cancel');
const inputs = document.getElementsByClassName('form-control');

const fullName = document.getElementById('full-name');
const address = document.getElementById('address');
const birthday = document.getElementById('birthday');
const phoneNum = document.getElementById('phone-num');
const email = document.getElementById('email');
const password = document.getElementById('password');

const defaultFullName = fullName.value = "Hannah Liwanag";
const defaultAddress = address.value = "De La Paz, Binan Laguna";
const defaultBirthday = birthday.value = "2001-03-30";
const defaultPhoneNum = phoneNum.value = "0912345";
const defaultEmail = email.value = "andy@yopmail.com";
const defaultPassword = password.value = "root";

edit.addEventListener('click', toEdit);
cancel.addEventListener('click', cancelEdit);
save.addEventListener('click', saveEdit);

function toEdit() {
    save.style.visibility = "visible";
    cancel.style.visibility = "visible";
    edit.style.visibility = "hidden";

	for(const input of inputs) {
        input.readOnly = false;
  }
}

function cancelEdit() {
    //returns the default name
      fullName.value = defaultFullName;
      birthday.value = defaultBirthday;
      address.value = defaultAddress;
      phoneNum.value = defaultPhoneNum;
      email.value = defaultEmail;
      password.value = defaultPassword;

        edit.style.visibility = "visible";
        save.style.visibility = "hidden";
        cancel.style.visibility = "hidden";
      
        for(const input of inputs) {
          input.readOnly = true;
      }
    }

    function saveEdit() {
        if(fullName.value==='' || address.value==='' || birthday.value==='' || email.value==='' || phoneNum.value==='' || password.value==='') {
          console.log("Empty field");
      } else {
          const newFullName = document.getElementById('full-name').value;
          const newAddress = document.getElementById('address').value;
          const newBirthday = document.getElementById('birthday').value;
          const newEmail = document.getElementById('email').value;
          const newPassword = document.getElementById('password').value;
          const newPhoneNum = document.getElementById('phone-num').value;

          fullName.value = newFullName;
          address.value = newAddress;
          birthday.value = newBirthday;
          email.value = newEmail;
          password.value = newPassword;
          phoneNum.value = newPhoneNum;
        
        edit.style.visibility = "visible";
        save.style.visibility = "hidden";
        cancel.style.visibility = "hidden";
    
        for(const input of inputs) {
          input.readOnly = true;
        }
      }
    }