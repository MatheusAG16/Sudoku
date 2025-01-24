var tela_inicial = document.getElementById("sessao-play");
var tabuleiro = document.getElementById("tabuleiro");

function teste() {
  tela_inicial.style.display = "none";
  tabuleiro.style.display = "flex";

  document.getElementById("ancora").scrollIntoView({
    behavior: "smooth",
  });
}

function home() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  tela_inicial.style.display = "";
  tabuleiro.style.display = "none";
}
