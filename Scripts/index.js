window.onload = function () {
  //Cria select
  var select = document.getElementById("dificuldade");
  var dificuldadesArray = [
    { value: "", text: "--Escolha a dificuldade--" },
    { value: "facil", text: "Facil" },
    { value: "medio", text: "Medio" },
    { value: "dificil", text: "Dificil" },
  ];
  for (i = 0; i < dificuldadesArray.length; i += 1) {
    option = document.createElement('option');
    option.setAttribute('value', dificuldadesArray[i].value);
    option.appendChild(document.createTextNode(dificuldadesArray[i].text));
    select.appendChild(option);
  }

  var email = document.getElementById("emailLogin");
  var error = document.getElementById('error');

  var dificuldade = document.getElementById('dificuldade');
  var errorDificuldade = document.getElementById("errorDificuldade");

  var submitbtn = document.getElementById("submitbtn");

  var inputValid = false;

  email.addEventListener('input', function () {
    inputValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
    error.textContent = '';
    if (!inputValid) {
      submitbtn.disabled = true;
      error.textContent = 'Email invalido';
    }
    if (inputValid && dificuldade.value != '') {
      submitbtn.disabled = false;
    }
  });
  dificuldade.addEventListener('change', function () {
    console.log(dificuldade.value);
    errorDificuldade.textContent = '';
    if (dificuldade.value == '') {
      submitbtn.disabled = true;
      errorDificuldade.textContent = "Porfavor selecione uma dificuldade"
    }
    if (dificuldade.value != '' && inputValid) {
      submitbtn.disabled = false;
    }
  });
}
function submit() {
  console.log("teste");
  window.location.href = "jogo.html" + dificuldade.value;
}
