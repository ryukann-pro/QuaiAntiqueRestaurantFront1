//Implémenter le JS dee ma page

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("MailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");

inputNom.addEventListener("keyup",validateForm);
inputPrenom.addEventListener("keyup",validateForm);
inputMail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidationPassword.addEventListener("keyup",validateForm);

function validateForm(){
  validateRequired(inputNom);
  validateRequired(inputPrenom);
}

function validateRequired(input){
  if(input.value != ""){
    //C'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  }else{
    //Il y a une erreur
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
}