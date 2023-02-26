let thisPage = 1; //current page
let limit = 11; //item limit
let head = document.getElementById('table-head')
let list = document.querySelectorAll('.list-page .item'); //selects the div of table and table rows of the items

//function wherein siya yung nag didisplay ng items based sa listPage
function loadItem(){
    let beginGet = limit * (thisPage - 1); //currentpage - 1 then * limit
    let endGet = limit * thisPage - 1; //makes the limit -1 than its intended limit
    

    //runs for each item na nasa table
    list.forEach((item, key)=>{
        if(key >= beginGet && key <= endGet){
            item.style.display = 'table-row'; //condition wherein if may element it will dispalyed as table row
            head.style.display = ''
        }else{
            item.style.display = 'none';
        }
    })
    listPage();
}
loadItem();
function listPage(){
    let count = Math.ceil(list.length / limit); //counts the item
    document.querySelector('.listPage').innerHTML = '';

    //function for previous button
    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerHTML = '<li class="page-item mx-2"><a class="page-link" href="#">Previous</a></li>';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    //function for current page/pages and buttons
    //responsible in producing another button na may number
    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerHTML = '<li class="page-item me-1"><a class="page-link" href="#">' + i + '</a></li>';
        if(i == thisPage){
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    //function for next button
    if(thisPage != count){
        let next = document.createElement('li');
        next.innerHTML = '<li class="page-item mx-1"><a class="page-link" href="#">Next</a></li>';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
function changePage(i){
    thisPage = i;
    loadItem();
}