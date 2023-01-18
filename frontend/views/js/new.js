const uploadbtn = document.getElementById("showUpload");
const submitUploadBtn = document.getElementById("submitUpload");
const excel = document.getElementById("excel");

let a;

function showInputForm() {
  if (a === 1) {
    document.getElementById("new-btn").style.display = "none";
    document.getElementById("new-input").style.display = "flex";
    return (a = 0);
  } else {
    document.getElementById("new-input").style.display = "none";
    return (a = 1);
  }
}

const showFileUpload = () => {
  excel.style.visibility = "visible";
  uploadbtn.style.display = "none";
  submitUploadBtn.style.display = "block";
};

uploadbtn.addEventListener("click", showFileUpload);
