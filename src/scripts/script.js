// Cria uma nova lista embaralhada de imagens sem modificar a lista original.
const embaralha = (array) => [...array].sort(() => Math.random() - 0.5);

// Cria as cartas com base na lista de imagens embaralhadas.
const criarCartas = (imagens) => {
  return embaralha(imagens).map((imagem, index) => ({
    id: index,
    imagem,
    aberto: false,
    combinado: false
  }));
};

// Atualiza o estado das cartas ao clicar. É válido saber que aqui sem o let, 
// o código não roda pq a ideia é justamente a atualização das cartas, ou seja, nesse ponto é necessário que o objeto em questão, varie. 
const transformaCartas = (cartas, id, callback) => {
    let atualizaCartas = cartas.map((carta) =>
    carta.id === id && !carta.aberto && !carta.combinado
      ? { ...carta, aberto: true }
      : carta
  );

  const cartasAbertas = atualizaCartas.filter((carta) => carta.aberto && !carta.combinado);

  if (cartasAbertas.length === 2) {
    setTimeout(() => {
      atualizaCartas = deuMatch(atualizaCartas);
      callback(atualizaCartas);
    }, 1000);
  }

  return atualizaCartas;
};

// Verifica se as cartas abertas são um par e mantém abertas as que combinam.
const deuMatch = (cartas) => {
  const cartasAbertas = cartas.filter((carta) => carta.aberto && !carta.combinado);

  if (cartasAbertas.length !== 2) return cartas;

  const [primeira, segunda] = cartasAbertas;
  const isMatch = primeira.imagem === segunda.imagem;

  return cartas.map((carta) =>
    carta.combinado || (isMatch && carta.aberto) // Mantém os pares corretos abertos.
      ? { ...carta, combinado: true, aberto: true }
      : { ...carta, aberto: false } // Fecha as cartas que não combinam entre si.
  );
};

// Os metódos a seguir utilizados como "querySelector", "createElement", "appendChild" são uma propriedades de manipulação de DOM, 
// e ainda que não sejam puramente funcional, são essenciais para o funcionamento do programa.

//Função que renderiza o jogo dinamicamente.
const renderGame = (cartas) => {

  const gameContainer = document.querySelector(".game"); 
  gameContainer.innerHTML = "";

  cartas.forEach((carta) => {
    const cartaElement = document.createElement("div");
    cartaElement.className = `item ${carta.aberto ? "boxOpen" : ""} ${carta.combinado ? "boxMatch" : ""}`;
    cartaElement.innerHTML = carta.aberto || carta.combinado ? carta.imagem : "❓";
    
    cartaElement.onclick = () => {
      if (!carta.aberto && !carta.combinado) {
        const atualizaCartas = transformaCartas(cartas, carta.id, renderGame);
        renderGame(atualizaCartas);
      }
    };

    gameContainer.appendChild(cartaElement);
  });

  // Verifica se o jogo terminou.
  if (cartas.every((carta) => carta.combinado)) {
    setTimeout(() => alert("Parabéns! Você venceu essa partida."), 300);
  }
};

// Inicializa o jogo.
const startGame = () => {
  const cartas = criarCartas([
    "🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶",
    "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮"
  ]);
  renderGame(cartas);
};

// Inicia o jogo quando a página carregar.
window.onload = startGame;