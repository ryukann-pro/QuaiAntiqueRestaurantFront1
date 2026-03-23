//Implémenter le JS dee ma page

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("MailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", InscrireUtilisateur);


function validateForm() {
  const nomOk = validateRequired(inputNom);
  const prenomOk = validateRequired(inputPrenom);
  const mailOk = validateMail(inputMail);
  const passwordOk = validatePassword(inputPassword);
  const confirmPasswordOk = validateConfirmationPassword(inputPassword, inputValidationPassword);


  if (nomOk && prenomOk && mailOk && passwordOk && confirmPasswordOk) {
    btnValidation.disabled = false;
  } else {
    btnValidation.disabled = true;
  }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
  if (inputPwd.value === inputConfirmPwd.value) {
    inputConfirmPwd.classList.add("is-valid");
    inputConfirmPwd.classList.remove("is-invalid");
    return true;
  } else {
    inputConfirmPwd.classList.add("is-invalid");
    inputConfirmPwd.classList.remove("is-valid");
    return false;
  }
}

function validatePassword(input) {
  //Définir mon regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  const passwordUser = input.value;
  if (passwordUser.match(passwordRegex)) {
    //C'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;

  } else {
    //Il y a une erreur
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validateMail(input) {
  //Définir mon regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailUser = input.value;
  if (mailUser.match(emailRegex)) {
    //C'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;

  } else {
    //Il y a une erreur
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validateRequired(input) {
  if (input.value != "") {
    //C'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    //Il y a une erreur
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function InscrireUtilisateur() {

  let dataForm = new FormData(formInscription);


  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "firstName": sanitizeHtml(dataForm.get("nom")),
    "lastName": sanitizeHtml(dataForm.get("prenom")),
    "email": sanitizeHtml(dataForm.get("email")),
    "password": sanitizeHtml(dataForm.get("mdp"))
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(apiUrl + "registration", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      }

    })
    .then((result) => {
      alert("Bravo " + dataForm.get("prenom") + ", vous êtes maintenant inscrit ! Vous pouvez vous connecter.");
      document.location.href = "/signin";
      console.log(result);
    })
    .catch((error) => console.error(error));
}