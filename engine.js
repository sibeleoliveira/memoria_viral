// Const que agrupa os elementos que serão embaralhados
const emojis = [
  "🐱",
  "🐱",
  "🦝",
  "🦝",
  "🦊",
  "🦊",
  "🐶",
  "🐶",
  "🐵",
  "🐵",
  "🦁",
  "🦁",
  "🐯",
  "🐯",
  "🐮",
  "🐮",
];
 // Implementação indispensavél de variável, pois é por sua capaciddae de armazenamento que a verificação das cartas ocorre, frequentemente podendo ser alterada.  
let openCards = [];

// Função a partir de cópia para embaralhar os emojis e conseguir números gerados de modo ordenado
const shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  // Cria uma nova div para representar cada carta
  const box = document.createElement("div");
  // Define a classe CSS que será usada para estilizar as cartas
  box.className = "item";
  // Define o conteúdo da carta como o emoji embaralhado
  box.innerHTML = shuffleEmojis[i];
  // Define a função que será chamada quando a carta for clicada
  box.onclick = handleClick;
  // Adiciona a carta (div) ao contêiner .game no HTML
  document.querySelector(".game").appendChild(box);
}

 // Verifica se já há duas cartas abertas
function handleClick() {

  if (openCards.length < 2) {
    this.classList.add("boxOpen");
  // Marca a carta como aberta
    openCards.push(this);
  // Adiciona a carta ao array de cartas abertas
  }

  // Quando duas cartas forem abertas, verifica se combinam após 500ms
  if (openCards.length == 2) {
  // Chama a função de verificação com um delay para visualização
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  // Verifica se as duas cartas abertas são iguais
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
  // Marca as cartas como combinadas
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
  // Se as cartas não combinam, remove a classe 'boxOpen' para escondê-las novamente
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }
  // Limpa o array de cartas abertas para permitir a próxima jogada
  openCards = [];

  // Verifica se todas as cartas foram combinadas
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    alert("Você venceu !");
  }
}
