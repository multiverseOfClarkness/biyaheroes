const add_btn = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
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

function AddToda() {
  add_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const x_btns = document.getElementsByClassName('close');

  for(var x of x_btns) {
    x.addEventListener('click', ClosePopup);
  }
}

function UploadExcel() {
  upload_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const x_btns = document.getElementsByClassName('close');

  for(var x of x_btns) {
    x.addEventListener('click', ClosePopup);
  }
}


function ClosePopup() {
  mask.style.visibility = 'hidden';
  edit_popup.style.display = 'none'

  for(var popup of popups) {
    popup.style.display = 'none';
  }
}

add.addEventListener('click', AddToda);
upload_btn.addEventListener('click', UploadExcel);

for(var edit_btn of edit_btns) {
  edit_btn.addEventListener('click', editInfo);
}
