const save = document.getElementById('save');
const inputRole = document.getElementById('input-role');
const newRole = document.getElementById('new-role');
const inputMember = document.getElementById('input-member-name');
const newMember = document.getElementById('new-member-name');

save.addEventListener('click', saveNew);

function saveNew(){

    if (confirm('Are you sure you want to add this new row? If yes select \'OK\', if not select \'CANCEL\'')){
        newRole.innerText = inputRole.value;
        newMember.innerText = inputMember.value;

        document.getElementById('new-input').style.display='none';
        document.getElementById('new-btn').style.display='flex';
    } else {
        return save.addEventListener('click', saveNew);
    }

}



