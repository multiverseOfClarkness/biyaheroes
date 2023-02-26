function tableFilter(){

    var input, filter, table, tr, td, i;
    input = document.getElementById("show");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    console.log(tr)
    
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
        if (td) {
        if (td.innerText.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else if (filter === 'ALL'){
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }       
    }

}

function tableSearch() {
    let input, filter, table, tr, td, txtValue;

    //Intialising Variables
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
            td = tr[i];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
        }
    }

}