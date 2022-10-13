var emailLogin = (<HTMLInputElement>document.getElementById("emaillogin")).value;
var submitbtn = (<HTMLInputElement>document.getElementById("submitbtn"));
function testInput() {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var inputValid=regexp.test(emailLogin);
    submitbtn.disabled = inputValid;
  }