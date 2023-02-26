const edit_personal = document.getElementById('edit-personal');
const edit_account = document.getElementById('edit-acc');
const edit_profile = document.getElementById('edit-profile');
const change_pass = document.getElementById('change-pass-btn');


const profile = document.getElementById('profile');
const save_profile = document.getElementById('save');
const cancel_profile = document.getElementById('cancel');

const popups = document.getElementsByClassName('popup-box');
const personal_popup = document.getElementById('personal-popup');
const account_popup = document.getElementById('account-popup');
const password_popup = document.getElementById('password-popup');
const mask = document.getElementById('page-mask');
const phone = document.getElementById('edit-phone')

const dataUrl = document.getElementById('dataUrl')
const profileImage = document.getElementById('profileImage')

const error_popup = document.getElementById('error-popup');
const btn = document.querySelectorAll('#btn');

function ValidateNum() {
  let valid = true
  if(phone.value !== null && phone.value != "") {
      var counter = phone.value;
    
    if(counter.length !== 10) {
        //CHECK MUNA IF SAKTONG 10 DIGITS YUNG INPUT
        Err(phone);
        return valid = false
    } else {
    //KINUKUHA YUNG FIRST DIGIT NG INPUT
      var firstDigit = counter.slice(0,1);
      
      if(parseInt(firstDigit) !== 9) {
          Err(phone);
          return valid = false
      } else {
        Success(phone);
      }
    }
  } else {
      Err(phone);
      return valid = false
  }
}

//FILEPOND SETUP
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  const pond = FilePond.create(profile);
  if(dataUrl.value.trim()){
    pond.addFile(dataUrl.value.trim());
  }
  // pond.addFile(dataUrl.value.trim());
  pond.setOptions({
    imageCropAspectRatio: '1:1',
    imageResizeTargetWidth: 180,
    imageResizeTargetHeight: 180,
    stylePanelLayout: 'compact circle',
    styleLoadIndicatorPosition: 'center',
    styleProgressIndicatorPosition: 'center',
    styleButtonRemoveItemPosition: 'center',
    styleButtonProcessItemPosition: 'center',
    
    allowRemove: true
  });

  function EditProfile() {

    edit_profile.style.visibility = 'hidden';
    save_profile.style.visibility = 'visible';
    cancel_profile.style.visibility = 'visible';
    profileImage.style.display = 'none'

    
        pond.allowBrowse = true;
        pond.allowDrop = true;
        pond.allowPaste = true;
        pond.allowRemove = true;

      

      const CancelProfile = () => {
        profileImage.style.display = 'block'

        edit_profile.style.visibility = 'visible';
        save_profile.style.visibility = 'hidden';
        cancel_profile.style.visibility = 'hidden';
      };

      const SaveProfile = () => {
        pond.addFile(dataUrl.value.trim());
        pond.allowBrowse = false;
        pond.allowDrop = false;
        pond.allowPaste = false;
        pond.allowRemove = false;
        edit_profile.style.visibility = 'visible';
        save_profile.style.visibility = 'hidden';
        cancel_profile.style.visibility = 'hidden';
      }

      cancel_profile.addEventListener ('click', CancelProfile);
      save_profile.addEventListener('click', SaveProfile)
  }

  function ClosePopup() {
    mask.style.visibility = 'hidden';

    const inputs = document.getElementsByClassName('form-control');

    for(var input of inputs) {
      const err = input.classList.contains('error');
      const success = input.classList.contains('success');

      if(err === true) {
        input.classList.remove('error');
      }

      if(success === true) {
        input.classList.remove('success');
      }
    }

    for(var popup of popups) {
      popup.style.display = 'none';
    }
  }

  function EditPersonal() {
    personal_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function EditAccount() {
    account_popup.style.display = 'block';
    mask.style.visibility = 'visible';

    const x_btns = document.getElementsByClassName('close');

    for(var x of x_btns) {
      x.addEventListener('click', ClosePopup);
    }
  }

  function ChangePassword() {
    password_popup.style.display = 'block';
    mask.style.visibility = 'visible';

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
  function FormValidation() {

    const firstname = document.getElementById('edit-firstname');
    const lastname = document.getElementById('edit-lastname');
    const address = document.getElementById('edit-address');
    const birthday = document.getElementById('edit-birthday');
    const email = document.getElementById('edit-email');
    const current_pass = document.getElementById('current-pass');
    const new_pass = document.getElementById('new-pass');
    const retype_pass = document.getElementById('retype-pass');

    let valid = true

    if(firstname.value === '') {
      Err(firstname);
      return valid = false
    } else {
      Success(firstname);
    }

    if(lastname.value === '') {
      Err(lastname);
      return valid = false
    } else {
      Success(lastname);
    }

    if(address.value === '') {
      Err(address);
      return valid = false
    } else {
      Success(address);
    }

    if(birthday.value === '') {
      Err(birthday);
      return valid = false
    } else {
      Success(birthday);
    }

    if(email.value === '') {
      Err(email);
      return valid = false
    } else {
      Success(email);
    }

    if(current_pass.value === '') {
      Err(current_pass);
      return valid = false
    } else {
      Success(current_pass);
    }

    if(new_pass.value === '') {
      Err(new_pass);
      return valid = false
    } else {
      Success(new_pass);
    }

    if(retype_pass.value === '') {
      Err(retype_pass);
      return valid = false
    } else if(retype_pass.value !== new_pass.value){
      Err(retype_pass);
      return valid = false
    }else {
      Success(retype_pass);
    }
  }

  function Success(input) {
    input.className = 'form-control success';
  }

  function Err(input) {
    input.className = 'form-control error';  
  }

  edit_profile.addEventListener('click', EditProfile);
  edit_personal.addEventListener('click', EditPersonal);
  edit_account.addEventListener('click', EditAccount);
  change_pass.addEventListener('click', ChangePassword);


  for(var b of btn) {
    b.addEventListener('click', FormValidation);
  }
