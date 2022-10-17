window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pontuacao = urlParams.get('score');
    const email = urlParams.get('email');

    const congratulate = document.createElement("div");
    const conteudo = document.createTextNode("Parabens " + email);
    congratulate.appendChild(conteudo);
    const divCongratulate = document.getElementById("congratulate");
    divCongratulate.appendChild(congratulate);

    const criarPontuacao = document.createElement("div");
    const conteudo2 = document.createTextNode(pontuacao);
    criarPontuacao.appendChild(conteudo2);
    const heading = document.getElementById("heading");
    heading.appendChild(criarPontuacao);
}
function redirecionar(){
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const dificuldade = urlParams.get('dificuldade');
    window.location.href="jogo.html?email="+email+"&dificuldade="+dificuldade;
}