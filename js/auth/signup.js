//Implémenter le JS dee ma page

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("MailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup",validateForm);
inputPrenom.addEventListener("keyup",validateForm);
inputMail.addEventListener("keyup",validateForm);
inputPassword.addEventListener("keyup",validateForm);
inputValidationPassword.addEventListener("keyup",validateForm);

function validateForm(){
  const nomOk = validateRequired(inputNom);
  const prenomOk = validateRequired(inputPrenom);
  const mailOk = validateMail(inputMail);


  if(nomOk && prenomOk && mailOk){
    btnValidation.disabled = false;
  }else{
    btnValidation.disabled = true;
  }
}

function validateMail(input){
  //Définir mon regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailUser = input.value;
  if(mailUser.match(emailRegex)){
    //C'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;

  }else{
    //Il y a une erreur
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validateRequired(input){
  if(input.value != ""){
    //C'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  }else{
    //Il y a une erreur
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}