document.getElementById('new-input').style.display='none';

let a;

function showInputForm(){
    if(a === 1){
        document.getElementById('new-btn').style.display='none'
        document.getElementById('new-input').style.display='flex';
        return a = 0;
    }

    else {
        document.getElementById('new-input').style.display='none';
        return a = 1;
    }
}


