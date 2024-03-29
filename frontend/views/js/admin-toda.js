const add_btn = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
const edit_btns_toda = document.getElementsByClassName('edit-btn-toda')
const popups = document.getElementsByClassName('popup-box');
const add_popup = document.getElementById('add-popup');
const upload_popup = document.getElementById('upload-popup');
const error_popup = document.getElementById('error-popup');
const mask = document.getElementById('page-mask');
const edit_popup = document.getElementById('edit-popup');

const fname = document.getElementById('edit-driver-firstname')
const lname = document.getElementById('edit-driver-lastname')
const bodynum = document.getElementById('edit-driver-bodynum')
const contact = document.getElementById('edit-driver-contact')
const toda = document.getElementById('toda')
const driverid = document.getElementById('driver-id')
const driveridval = document.getElementById('driver-id-val')

const presfname = document.getElementById('edit-TODA-pres-firstname')
const preslname = document.getElementById('edit-TODA-pres-lastname')
const prescontact = document.getElementById('edit-TODA-contact')
const todaid = document.getElementById('toda-id')

//ADD TODA POPUP INPUT FIELDS
const submit_new_toda = document.getElementById('submit-toda-btn')
const add_toda = document.getElementById('add-toda');
const add_pres_fname = document.getElementById('add-pres-fname');
const add_pres_lname = document.getElementById('add-pres-lname');
const add_pres_contact = document.getElementById('add-pres-contact');

//ADD DRIVER

//UPLOAD EXCEL POPUP
const excel = document.getElementById('excel')
const upload_excel = document.getElementById('upload-excel')


import {ValidateNum} from '/js/validate.js'


function errorMsg(input, msg) {
  const formItem = input.parentElement;
  const small = formItem.querySelector('small');
  
  small.innerHTML = msg;
  formItem.className = 'form-item error'
  input.className = 'form-control error';
}



const editInfo = (e) =>{
  var tds = e.getElementsByClassName('driver-data');
  
  edit_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const myArray = tds[0].innerHTML.trim().split(" ");
  fname.setAttribute('value', myArray[0])
  lname.setAttribute('value', myArray[1])
  bodynum.setAttribute('value', tds[1].innerHTML.trim())
  
  contact.setAttribute('value', tds[2].innerHTML.trim().replace("+63", ""))
  driverid.setAttribute('value', tds[3].innerHTML.trim())
  //
  const x_btns = document.getElementsByClassName('close');

  for(var x of x_btns) {
    x.addEventListener('click', ClosePopup);
  }
} 

const editTODAInfo = (e) =>{
  var tds = e.getElementsByClassName('TODA-data');
  console.log('clicked')
  edit_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const myArray = tds[0].innerHTML.trim().split(" ");
  presfname.setAttribute('value', myArray[0])
  preslname.setAttribute('value', myArray[1]) 
  prescontact.setAttribute('value', tds[1].innerHTML.trim().replace("+63", ""))
  todaid.setAttribute('value', tds[2].innerHTML.trim())
  //
  const x_btns = document.getElementsByClassName('close');

  for(var x of x_btns) {
    x.addEventListener('click', ClosePopup);
  }
} 

//CREATE SEPARARE JS SOLELY FOR THIS POPUP ERROR
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

  const inputs = document.getElementsByClassName('form-control');

  //REMOVES THE ERROR CLASS
  for(var input of inputs) {
    if(input.classList.contains('error')) {
      input.classList.remove('error');
    }
  }
}

function AddToda() {
  add_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const x_btns = document.getElementsByClassName('close');

  for(var x of x_btns) {
    x.addEventListener('click', ClosePopup);
  }

  submit_new_toda.addEventListener('click', AddTodaValidation);
}

function AddTodaValidation() {

  //ADD TODA (SA TODA)
  if(add_toda.value === "") {
    Err(add_toda);
  }

  if(add_pres_fname.value === "") {
    Err(add_pres_fname);
  }

  if(add_pres_lname.value === "") {
    Err(add_pres_lname);
  }

  if(add_pres_contact.value === "") {
    ValidateNum(add_pres_contact);
  }
}

function UploadExcel() {
  upload_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const x_btns = document.getElementsByClassName('close');

  for(var x of x_btns) {
    x.addEventListener('click', ClosePopup);
  }

  upload_excel.addEventListener('click', ValidateExcel)
}

function ValidateExcel() {
  if(excel.value === "") {
    Err(excel);
  }
}

function Success(input) {
  input.className = 'form-control success';
}

function Err(input) {
  input.className = 'form-control error';  
}

add.addEventListener('click', AddToda);
upload_btn.addEventListener('click', UploadExcel);

for(var edit_btn of edit_btns) {
  edit_btn.addEventListener('click', editInfo);
}

for(var edit_button of edit_btns_toda) {
  edit_button.addEventListener('click', editTODAInfo);
}
