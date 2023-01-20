function validateEmptyField() {
  let x = document.getElementById("old-password").value;
  let y = document.getElementById("new-password").value;
  let z = document.getElementById("confirm-password").value;
  let valid = true;

  if (x === "") {
    document.getElementById("error").style.display = "block";
    return (valid = false);
  } else {
    document.getElementById("error").style.display = "none";
  }

  if (y === "") {
    document.getElementById("error").style.display = "block";
    return (valid = false);
  } else {
    document.getElementById("error").style.display = "none";
  }

  if (z === "") {
    document.getElementById("error").style.display = "block";
    return (valid = false);
  } else {
    document.getElementById("error").style.display = "none";
  }
}
