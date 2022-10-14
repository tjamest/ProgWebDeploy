window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dificuldade = urlParams.get('dificuldade');
    const pontuacao = urlParams.get('pontuacao');

    const criarPontuacao = document.createElement("div");
    const conteudo = document.createTextNode(pontuacao);
    criarPontuacao.appendChild(conteudo);
    const heading = document.getElementById("heading");
    heading.appendChild(criarPontuacao);
}
function redirecionar(){
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const dificuldade = urlParams.get('dificuldade');
    window.location.href="jogo.html?email="+email+"&dificuldade="+dificuldade;
}