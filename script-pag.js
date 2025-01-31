var tela_inicial = document.getElementById("sessao-play");
var tabuleiro = document.getElementById("tabuleiro");

//Script para mudar a "Pagina inicial" para de fato o tabuleiro onde se pode jogar!
function jogar() {
  tela_inicial.style.display = "none";
  tabuleiro.style.display = "flex";

  document.getElementById("ancora").scrollIntoView({
    behavior: "smooth",
  });
}

//Aqui se trata do ultimo botão do site, a função apenas faz a página voltar para a area inicial.
function home() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  tela_inicial.style.display = "";
  tabuleiro.style.display = "none";
}
