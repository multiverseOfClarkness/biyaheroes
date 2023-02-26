

const add = document.getElementById('add');
const upload_btn = document.getElementById('upload');
const edit_btns = document.getElementsByClassName('edit-btn')
const add_popup = document.getElementById('add-popup');
const upload_popup = document.getElementById('upload-popup');

const driver_body = document.getElementById('bodynum')

//Edit Driver


const edit_popup = document.getElementById('edit-popup');
const mask = document.getElementById('page-mask');
const popups = document.getElementsByClassName('popup-box');

const submit_driver = document.getElementById('submit-new-driver');
const driver_fname = document.getElementById('edit-driver-firstname');
const driver_lname = document.getElementById('edit-driver-lastname');
const driver_bodyNum = document.getElementById('edit-driver-bodynum');
const driver_contact = document.getElementById('edit-driver-contact');
const driver_toda = document.getElementById('toda');
const driverid = document.getElementById('driver-id');
const contact_add = document.getElementById('add-driver-contact');

const dfname = document.getElementById('fname')
const dlname = document.getElementById('lname')
const dbody = document.getElementById('bodynum')



function editDriverInfo (e) {
  var tds = e.getElementsByClassName('driver-data');
  edit_popup.style.display = 'block';
  mask.style.visibility = 'visible';

  const myArray = tds[0].innerHTML.trim().split(" ");
  
  driver_fname.setAttribute('value', myArray[0])
  driver_lname.setAttribute('value', myArray[1])
  driver_bodyNum.setAttribute('value', tds[1].innerHTML.trim())
  
  driver_contact.setAttribute('value', tds[2].innerHTML.trim().replace("+63", ""))
  driverid.setAttribute('value', tds[3].innerHTML.trim())

  
} 


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

  function ValidateNum() {
    let valid = true
    if(driver_contact.value !== null && driver_contact.value != "") {
        var counter = driver_contact.value;
      
      if(counter.length !== 10) {
          //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
          Err(driver_contact);
          return valid = false
      } else {
      //KINUKUHA YUNG FIRST DIGIT NG INPUT
        var firstDigit = counter.slice(0,1);
        
        if(parseInt(firstDigit) !== 9) {
            Err(driver_contact);
            return valid = false
        } else {
          Success(driver_contact);
        }
      }
    } else {
        Err(driver_contact);
        return valid = false
    }
  }
  function ValidateNumAdd() {
    let valid = true
    if(contact_add.value !== null && contact_add.value != "") {
        var counter = contact_add.value;
      
      if(counter.length !== 10) {
          //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
          Err(contact_add);
          return valid = false
      } else {
      //KINUKUHA YUNG FIRST DIGIT NG INPUT
        var firstDigit = counter.slice(0,1);
        
        if(parseInt(firstDigit) !== 9) {
            Err(contact_add);
            return valid = false
        } else {
          Success(contact_add);
        }
      }
    } else {
        Err(contact_add);
        return valid = false
    }
  }

  function AddValidation() {
    let firstDigit = contact_add.value.slice(0,1)
    let valid = true
    //ADD Driver
    if(dfname.value === "") {
      Err(dfname);
      return valid = false
    } Success(dfname)
    
  
    if(dlname.value === "") {
      Err(dlname);
      return valid = false
    }Success(dlname)
    

    if(dbody.value === "") {
        Err(dbody);
        return valid = false
    }else if (dbody.value.length !== 4){
      Err(dbody);
      return valid = false
    } Success(dbody)
  
    if(contact_add.value === ''){
      Err(contact_add);
      return valid = false
    } else if(contact_add.value.length !== 10) {
      Err(contact_add);
      return valid = false
    } else if (parseInt(firstDigit) !== 9) {
      Err(contact_add);
      return valid = false
    } Success(contact_add)
  
    
  }

  function Success(input) {
    input.className = 'form-control success';
  }
  
  function Err(input) {
    input.className = 'form-control error';  
  }


  add.addEventListener('click', AddDriver);
  upload_btn.addEventListener('click', UploadExcel);