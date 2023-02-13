import {ValidateNum} from '/js/validate.js'

const add = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
const edit_btns_toda = document.getElementsByClassName('edit-btn-toda')
const popups = document.getElementsByClassName('popup-box');
const add_popup = document.getElementById('add-popup');
const upload_popup = document.getElementById('upload-popup');
const mask = document.getElementById('page-mask');
const edit_popup = document.getElementById('edit-popup');

//ADD DRIVER


//UPLOAD EXCEL POPUP
const excel = document.getElementById('excel')
const upload_excel = document.getElementById('upload-excel')

function errorMsg(input, msg) {
    const formItem = input.parentElement;
    const small = formItem.querySelector('small');
    
    small.innerHTML = msg;
    formItem.className = 'form-item error'
    input.className = 'form-control error';
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

  function AddDriver() {
    add_popup.style.display = 'block';
    mask.style.visibility = 'visible';
  
    const x_btns = document.getElementsByClassName('close');
  
    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  
    submit_driver.addEventListener('click', AddValidation);
  }

  function AddValidation() {

    //ADD Driver
    if(driver_fname.value === "") {
      Err(driver_fname);
    }
  
    if(driver_lname.value === "") {
      Err(driver_lname);
    }
  
    if(driver_toda.value === "") {
      Err(driver_toda);
    }

    if(driver_bodyNum.value === "") {
        Err(driver_bodyNum);
      }
  
    
    ValidateNum(driver_contact);
    
  }

  function Success(input) {
    input.className = 'form-control success';
  }
  
  function Err(input) {
    input.className = 'form-control error';  
  }


  
  for(var edit_button of edit_btns_toda) {
    edit_button.addEventListener('click', editTODAInfo);
  }

  add.addEventListener('click', AddDriver);
  upload_btn.addEventListener('click', UploadExcel);