const edit_popup = document.getElementById('edit-popup');


const presfname = document.getElementById('edit-TODA-pres-firstname')
const preslname = document.getElementById('edit-TODA-pres-lastname')
const prescontact = document.getElementById('edit-TODA-contact')
const todaid = document.getElementById('toda-id')




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

  function ValidateNum() {
    let valid = true
    if(prescontact.value !== null && prescontact.value != "") {
        var counter = prescontact.value;
      
      if(counter.length !== 10) {
          //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
          Err(prescontact);
          return valid = false
      } else {
      //KINUKUHA YUNG FIRST DIGIT NG INPUT
        var firstDigit = counter.slice(0,1);
        
        if(parseInt(firstDigit) !== 9) {
            Err(prescontact);
            return valid = false
        } else {
          Success(prescontact);
        }
      }
    } else {
        Err(prescontact);
        return valid = false
    }
  }

  function Success(input) {
    input.className = 'form-control success';
  }
    
  function Err(input) {
    input.className = 'form-control error';  
  }