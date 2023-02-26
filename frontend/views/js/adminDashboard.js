const edit = document.getElementById('edit')
const save = document.getElementById('save');
const cancel = document.getElementById('cancel');
const inputs = document.getElementsByClassName('form-control');
const profile = document.getElementById('profile')

const fullName = document.getElementById('full-name');
const role = document.getElementById('role');
const email = document.getElementById('email');









function toEdit() {
  pond.removeFile()
  save.style.visibility = "visible";
  cancel.style.visibility = "visible";
  edit.style.visibility = "hidden";
  
  
  pond.allowRemove = false;
  pond.allowDrop = true;
  pond.allowBrowse = true;
  pond.allowPaste = true;

	for(const input of inputs) {
        input.readOnly = false;
  }
}

function cancelEdit() {
    //returns the default name
      fullName.value = defaultFullName;
      role.value = defaultRole;
      email.value = defaultEmail;
      

        edit.style.visibility = "visible";
        save.style.visibility = "hidden";
        cancel.style.visibility = "hidden";
      
        for(const input of inputs) {
          input.readOnly = true;
      }
    }

function saveEdit() {
  if(fullName.value==='' || role.value==='' || email.value==='' || password.value==='') {
      console.log("Empty field");
  } else {
      const newFullName = document.getElementById('full-name').value;
      const newRole = document.getElementById('role').value;
      const newEmail = document.getElementById('email').value;
      

      fullName.value = newFullName;
      role.value = newRole;
      email.value = newEmail;
      

    
    edit.style.visibility = "visible";
    save.style.visibility = "hidden";
    cancel.style.visibility = "hidden";

    for(const input of inputs) {
      input.readOnly = true;
    }
  }
}