const add_btn = document.getElementById('add-admin');
const add_admin_popup = document.getElementById('add-admin-popup');
const edit_admin_popup = document.getElementById('edit-admin-popup');
const admins = document.getElementsByClassName('grid-item');
const popups = document.getElementsByClassName('popup-box');
const edit_btns = document.getElementsByTagName('small');
const error_popup = document.getElementById('error-popup');
const mask = document.getElementById('page-mask');

// SUBMIT BUTTON
const submit = document.getElementById('create-new-admin');

//NEW ADMIN FORM INPUT FIELDS
const new_admin_fname = document.getElementById('new-admin-fname');
const new_admin_lname = document.getElementById('new-admin-lname');
const new_admin_position = document.getElementById('new-admin-position');
const new_admin_email = document.getElementById('new-admin-email');
const new_admin_password = document.getElementById('new-admin-password');

function errorPopout() {
  error_popup.style.display = 'block';
  mask.style.visibility = 'visible';
  const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function NewAdmin() {
    add_admin_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }

    //ADD EVENT LISTENER TO THE SUBMIT BUTTON INSIDE THE POPUP
    submit.addEventListener('click', AdminValidation);
}

function AdminValidation() {

  if(new_admin_fname.value === '') {
    Err(new_admin_fname);
  }

  if(new_admin_lname.value === '') {
    Err(new_admin_lname);
  }

  if(new_admin_position.value === '') {
    Err(new_admin_position);
  }

  if(new_admin_email.value === '') {
    Err(new_admin_email);
  }

  if(new_admin_password.value === '') {
    Err(new_admin_password);
  }
}

function Success(input) {
  input.className = 'form-control success';
}

function Err(input) {
  input.className = 'form-control error';  
}

function ClosePopup() {
    mask.style.visibility = 'hidden';

    for(var popup of popups) {
      popup.style.display = 'none';
    }
}

add_btn.addEventListener('click', NewAdmin);