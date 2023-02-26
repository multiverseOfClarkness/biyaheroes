const add = document.getElementById('add')
const additem = document.getElementById('add-item')
const mask = document.getElementById('page-mask');
const popups = document.getElementsByClassName('popup-box');
const add_popup = document.getElementById('add-popup');
const add_popup_item = document.getElementById('add-popup-items');

function ClosePopup() {
    mask.style.visibility = 'hidden';
  
    for(let popup of popups) {
      popup.style.display = 'none';
    }
}

function addViolation() {
    add_popup.style.display = 'block';
    mask.style.visibility = 'visible';
  
    const x_btns = document.getElementsByClassName('close');
  
    for(let x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

function addItem() {
    add_popup_item.style.display = 'block';
    mask.style.visibility = 'visible';
  
    const x_btns = document.getElementsByClassName('close');
  
    for(let x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
}

add.addEventListener('click', addViolation);
additem.addEventListener('click', addItem);