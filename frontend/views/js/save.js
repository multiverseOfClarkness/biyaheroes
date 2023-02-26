const save = document.getElementById('save');
const adminRole = document.getElementById('adminRole');
const adminName = document.getElementById('adminName');




function saveNew(){

    if (confirm('Are you sure you want to add this new row? If yes select \'OK\', if not select \'CANCEL\'')){
        adminRole.innerText = adminRole.value;
        adminName.innerText = adminName.value;

        document.getElementById('new-input').style.display='none';
        document.getElementById('new-btn').style.display='flex';
    } else {
        console.log(error)
    }

}



