const edit = document.getElementById('edit');
const save = document.getElementById('save');
const cancel = document.getElementById('cancel');
const inputs = document.getElementsByClassName('form-control');

const profile = document.getElementById('profile');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const birthday = document.getElementById('birthday');
const phoneNum = document.getElementById('phoneNum');
const email = document.getElementById('email');
const password = document.getElementById('password');
const changePassDiv = document.querySelector('.profile-item-change-pass')



//FILEPOND SETUP
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

const pond = FilePond.create(profile);

pond.setOptions({
  imageCropAspectRatio: '1:1',
  imageResizeTargetWidth: 180,
  imageResizeTargetHeight: 180,
  stylePanelLayout: 'compact circle',
  styleLoadIndicatorPosition: 'center',
  styleProgressIndicatorPosition: 'center',
  styleButtonRemoveItemPosition: 'center',
  styleButtonProcessItemPosition: 'center',
  allowBrowse: false,
  allowDrop: false,
});


edit.addEventListener('click', toEdit);
cancel.addEventListener('click', cancelEdit);


function saveEdit() {
  let valid = true

  const firstNameVal = firstName.value.trim()
  const lastNameVal = lastName.value.trim()
  const addressVal = address.value.trim()
  const birthdayVal = birthday.value.trim()
  const phoneNumVal = phoneNum.value.trim()
  const emailVal = email.value.trim()
  const passwordVal = password.value.trim()

  if(firstNameVal === '') {
    errorMsg(firstName, 'This field cannot be empty.')
    return valid = false
  } successMsg(firstName)
  
  if (lastNameVal === ''){
    errorMsg(lastName, 'This field cannot be empty.')
    return valid = false
  } successMsg(lastName)

  if (addressVal === ''){
    errorMsg(address, 'This field cannot be empty.')
    return valid = false
  } successMsg(address)

  if (birthdayVal === ''){
    errorMsg(birthday, 'This field cannot be empty.')
    return valid = false
  } successMsg(birthday)

  if (phoneNumVal === ''){
    errorMsg(phoneNum, 'This field cannot be empty.')
    return valid = false
  } successMsg(phoneNum)
  

  if (emailVal === ''){
    errorMsg(email, 'This field cannot be empty.')
    return valid = false
  } else if(!isEmail(email)) {
    errorMsg(email, 'Please enter a valid email.')
    return valid = false
  } successMsg(email)
  
  if (passwordVal === ''){
    errorMsg(phoneNum, 'This field cannot be empty.')
    return valid = false
  } successMsg(password)
}

function toEdit() {
  save.style.visibility = "visible";
  cancel.style.visibility = "visible";
  edit.style.visibility = "hidden";

  //allows user to attach images
  if(pond.allowBrowse == false && pond.allowDrop == false) {
    pond.allowBrowse = true;
    pond.allowDrop = true;
  }

  for(const input of inputs) {
        input.readOnly = false;
  }
}

function cancelEdit() {
  //removes the image on the placeholder when the user clicks cancel
  pond.removeFile();
  //disable file upload when cancelled
  pond.allowBrowse = false;
  pond.allowDrop = false;

  edit.style.visibility = "visible";
  save.style.visibility = "hidden";
  cancel.style.visibility = "hidden";

  fullName.value = '';
  birthday.type = "text";
  birthday.value = '';
  address.value = '';
  phoneNum.value = '';
  email.value = '';
  password.value = '';

  for(const input of inputs) {
    input.readOnly = true;
  }
}

function editPassword () {
  changePassDiv.style.visibility = "visible"
}



function errorMsg(input, msg) {
  const formItem = input.parentElement;
  const small = formItem.querySelector("small");

  small.innerHTML = msg;

  formItem.className = 'profile-item error';
}

function successMsg(input) {
  const formItem = input.parentElement;
  formItem.className = 'profile-item success';
}

//validates if the input is a valid email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  
}

//validates phone number input
function isPhoneNum(phoneNum) {
  return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phoneNum);
}