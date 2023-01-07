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
const changePassDiv = document.querySelector('.profile-item-change-pass')
const dataUrl = document.getElementById('dataUrl')
dataUrl.style.visibility = 'hidden'
const dataUrlVal = dataUrl.value.trim()
const profileDefault = document.getElementById('profileImage')
const profileItem = document.querySelector('.profile-item')



//FILEPOND SETUP
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

// const pond = FilePond.create(profile,{
//   files: [
//       {
//           // the server file reference
//           source: dataUrlVal,

//           // set type to local to indicate an already uploaded file
//           options: {
//               type: 'local',
              
//           },
//       },
//   ],
// });

const pond = FilePond.create(profile)

pond.addFile(dataUrlVal);


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
  allowRemove: false ,
  acceptedFileTypes: ['image/jpeg', 'image/jpg', 'image/png']
});


edit.addEventListener('click', toEdit);
cancel.addEventListener('click', cancelEdit);
save.addEventListener('click', saveEdit);


function saveEdit() {
  let valid = true

  const firstNameVal = firstName.value.trim()
  const lastNameVal = lastName.value.trim()
  const addressVal = address.value.trim()
  const birthdayVal = birthday.value.trim()
  const phoneNumVal = phoneNum.value.trim()
  const emailVal = email.value.trim()
  

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
  // } else if(!isEmail(email)) {
  //   errorMsg(email, 'Please enter a valid email.')
  //   return valid = false
  } successMsg(email)
  
}

function toEdit() {
  pond.removeFile()
  save.style.visibility = "visible";
  cancel.style.visibility = "visible";
  edit.style.visibility = "hidden";
  profile.style.visibility = "visible";
  birthday.type = 'date';
  
  // profileDefault.classList.add("profileImageHide")
  
  pond.allowRemove = true;
  pond.allowDrop = true;
  pond.allowBrowse = true;
  pond.allowPaste = true;


  //allows user to attach images


  for(const input of inputs) {
        input.readOnly = false;
        input.classList.add("form-item-show")
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
function showBorder(input) {
  const formItem = input.parentElement;
  formItem.className = 'profile-item show';
}

//validates if the input is a valid email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  
}

//validates phone number input
function isPhoneNum(phoneNum) {
  return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phoneNum);
}