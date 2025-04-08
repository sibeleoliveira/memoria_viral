// Cria uma nova lista embaralhada de imagens sem modificar a lista original.
const embaralha = (array) => [...array].sort(() => Math.random() - 0.5);

// Cria as cartas com base na lista de imagens embaralhadas.
const criarCartas = (itens) => {
  let cartas = itens.flatMap(({ imagem, audio }, index) => [
    { id: index * 2, imagem, audio, aberto: false, combinado: false },
    { id: index * 2 + 1, imagem, audio, aberto: false, combinado: false }
  ]);
  
  return embaralha(cartas); // Embaralha as cartas
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
    }, 600);
  }

  return atualizaCartas;
};

// Verifica se as cartas abertas são um par e mantém abertas as que combinam.
const deuMatch = (cartas) => {
  const cartasAbertas = cartas.filter((carta) => carta.aberto && !carta.combinado);

  if (cartasAbertas.length !== 2) return cartas;

  const [primeira, segunda] = cartasAbertas;
  const isMatch = primeira.imagem === segunda.imagem;

  if (isMatch) {
    // Toca o áudio apenas se for um par correto
    if (audioAtual) {
      audioAtual.pause();
      audioAtual.currentTime = 0;
    }
    audioAtual = new Audio(segunda.audio);
    audioAtual.play();
  }

  return cartas.map((carta) =>
    carta.combinado || (isMatch && carta.aberto) // Mantém os pares corretos abertos.
      ? { ...carta, combinado: true, aberto: true }
      : { ...carta, aberto: false } // Fecha as cartas que não combinam entre si.
  );
};

// Os metódos a seguir utilizados como "querySelector", "createElement", "appendChild" são uma propriedades de manipulação de DOM, 
// e ainda que não sejam puramente funcional, são essenciais para o funcionamento do programa.


let audioAtual = null;
//Função que renderiza o jogo dinamicamente.
const renderGame = (cartas) => {

  const gameContainer = document.querySelector(".game"); 
  gameContainer.innerHTML = "";

  cartas.forEach((carta) => {
    const cartaElement = document.createElement("div");
    cartaElement.className = `item ${carta.aberto ? "boxOpen" : ""} ${carta.combinado ? "boxMatch" : ""}`;
    if (carta.aberto || carta.combinado) {
      const imgElement = document.createElement("img");
      imgElement.src = carta.imagem;
      imgElement.alt = "Carta do jogo";
      imgElement.classList.add("card-image");
      cartaElement.innerHTML = ""; // Limpa antes de adicionar a imagem
      cartaElement.appendChild(imgElement);
    } else {
      cartaElement.innerHTML = "❓";
    }
    
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
    setTimeout(() => {
      alert("Parabéns! Você venceu essa partida.");
    document.getElementById("vitoria-audio").play();
  }, 100);
} }


// Inicializa o jogo.
const startGame = () => {
  const cartas = criarCartas([
    { imagem: "imagens/01.png", audio: "audiosCortados/01.mp3" },
    { imagem: "imagens/02.png", audio: "audiosCortados/02.mp3" },
    { imagem: "imagens/03.png", audio: "audiosCortados/03.mp3" },
    { imagem: "imagens/04.png", audio: "audiosCortados/04.mp3" },
    { imagem: "imagens/05.png", audio: "audiosCortados/05.mp3" },
    { imagem: "imagens/06.png", audio: "audiosCortados/06.mp3" },
    { imagem: "imagens/07.png", audio: "audiosCortados/07.mp3" },
    { imagem: "imagens/08.png", audio: "audiosCortados/08.mp3" }
  ]);
  renderGame(cartas);
};


// Inicia o jogo quando a página carregar.
window.onload = startGame;
