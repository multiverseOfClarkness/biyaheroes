const wrapper = document.querySelector(".table .tbody"); //makes sure that the table and body (designed) is included
const pagination = document.querySelector(".pagination");
const items = Array.from(document.querySelectorAll(".item"));
let filteredItems = items;
let filt = items;
let currPage = 1;

document.querySelector("search")
filters.addEventListener("change", function(evt){
  
      let input = document.getElementById("search")
      const keyword = input.value.toUpperCase();

      //search only
      if (keyword) {
        filteredItems = items.filter(el => el.querySelector('td').innerHTML.toUpperCase().indexOf(keyword) > -1
        || el.querySelector('td:nth-child(2)').innerHTML.toUpperCase().indexOf(keyword) > -1
        || el.querySelector('td:nth-child(3)').innerHTML.toUpperCase().indexOf(keyword) > -1
        || el.querySelector('td:nth-child(4)').innerHTML.toUpperCase().indexOf(keyword) > -1
        || el.querySelector('td:nth-child(5)').innerHTML.toUpperCase().indexOf(keyword) > -1)

      } else {
        filteredItems = items;
      }

      currPage = 1;
      if (filteredItems.length !== 1) {
        pagination.style.display = "flex";
        setHTML(filteredItems)
      }
      else {
        pagination.style.display = "none";
        wrapper.innerHTML = "<p>No Data Found.</p>"
        setHTML(filteredItems)

      }
		}) 

//function for pagination wala akong ginalaw dito
function paginate(totalItems, currentPage = 1, pageSize = 2, maxPages = 3) {

  let totalPages = Math.ceil(totalItems / pageSize);
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}

//function kung ano yung irereturn na HTML once na tinawag yung function
function setHTML(items) {
  //returns the whole wrapper
  wrapper.innerHTML = ""
  //returns the pagination
  pagination.innerHTML = ""
  //yung sa dulo yung 10 = items per page and 3 = ilang pages yung nakalabas sa current page
  const { totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages } = paginate(items.length, currPage, 10, 3)

  //creates the page of pagination
  const nav = document.createElement("nav")
  nav.classList.add(...['relative', 'z-0', 'inline-flex', 'rounded-md',  '-space-x-px', ])

  nav.id = "pagination";
  //previous button
  let paginationHTML = ""
  paginationHTML += `<button ${currentPage === 1 && 'disabled'} class=" ${currentPage === 1 ? 'cursor-not-allowed' : 'prev'} relative inline-flex items-center px-2 py-2 mx-1 rounded rounded-l-md text-sm font-medium btn btn-secondary">Previous</button>`

  //method for the current page
  pages.forEach(page => {
    if (currentPage === page) {
      paginationHTML += `<button class="btn btn-thirtiary z-10 relative inline-flex justify-content-end items-center px-3 py-2 mx-1 shadow rounded text-sm font-medium" page="${page}" ${currentPage === page}>${page}</button>`
    } else {
      paginationHTML += `<button class="btn btn-secondary  page relative inline-flex items-center px-3 py-2 mx-1 shadow rounded text-sm font-medium" page="${page}" ${currentPage === page}>${page}</button>`
    }
  })

  //next button
  paginationHTML += `<button ${currentPage === endPage && 'disabled'} class="${currentPage === endPage ? 'cursor-not-allowed' : 'next'} btn btn-secondary relative inline-flex items-center px-3 py-2 mx-1 shadow-sm rounded rounded-r-md text-sm font-medium">Next</button>`


  nav.innerHTML = paginationHTML
  pagination.append(nav)

  //method that returns the table and the body every page
  const start = (currentPage - 1) * pageSize, end = currentPage * pageSize;
  items.slice(start, end).forEach(el => {
    wrapper.append(el)
  })
}

//condition for pages if napindot na
document.body.addEventListener("change", function (e) {
  console.log(e.target);
})
document.addEventListener('click', function (e) {
  const $this = e.target
  console.log($this);
  if ($this.classList.contains("page")) {
    currPage = parseInt($this.getAttribute("page"))
    setHTML(filteredItems)
  }
  if ($this.classList.contains("next")) {
    currPage += 1;
    setHTML(filteredItems)
  }
  if ($this.classList.contains("prev")) {
    currPage -= 1;
    setHTML(filteredItems)
  }
});
setHTML(filteredItems)