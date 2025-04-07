document.addEventListener("DOMContentLoaded", () => {
    const MAX_CLICKS = 19;
  
    const criarDisplay = (valorInicial) => {
      const el = document.createElement("p");
      el.textContent = `Suas Jogadas: ${valorInicial}`;
      el.style.cssText = `
        font-size: 20px;
        color: white;
        background-color: #333;
        padding: 10px;
        border-radius: 8px;
        width: fit-content;
        margin: 10px auto;
        text-align: center;
      `;
      return el;
    };
  
    const atualizarDisplay = (display, valor) =>
      (display.textContent = `Suas Jogadas: ${valor}`);
  
    // Cria uma função pura que calcula o novo número de jogadas
    const incrementaJogadas = (jogadas) => jogadas + 1;
  
    // Função pura que verifica se o limite foi atingido
    const atingiuLimite = (jogadas, max) => jogadas >= max;
  
    // Função pura que verifica se o jogo foi vencido (sem acessar o DOM)
    const venceuJogo = (cartas) =>
      cartas.length > 0 &&
      cartas.every((carta) => carta.classList.contains("boxMatch"));
  
    // Estado inicial imutável
    let estado = {
      jogadas: 0,
      display: criarDisplay(0),
    };
  
    document.body.insertBefore(estado.display, document.body.firstChild);
  
    // Função responsável por responder a cliques
    const handleClickCarta = (carta, estadoAtual) => {
      if (
        carta.classList.contains("boxOpen") ||
        carta.classList.contains("boxMatch")
      ) {
        return estadoAtual; // clique inválido, não altera o estado
      }
  
      const novaJogada = incrementaJogadas(estadoAtual.jogadas);
      atualizarDisplay(estadoAtual.display, novaJogada);
  
      if (atingiuLimite(novaJogada, MAX_CLICKS)) {
        setTimeout(() => {
          alert("Você perdeu!");
          startGame();
        }, 300);
        return { ...estadoAtual, jogadas: 0 };
      }
  
      return { ...estadoAtual, jogadas: novaJogada };
    };
  
    // Observer funcionalizado
    const observer = new MutationObserver(() => {
      const cartas = document.querySelectorAll(".game .item");
  
      cartas.forEach((carta) => {
        if (!carta.dataset.integrado) {
          carta.dataset.integrado = "true";
          carta.addEventListener("click", () => {
            estado = handleClickCarta(carta, estado);
  
            // Verifica se venceu (se sim, reinicia o jogo)
            if (venceuJogo([...cartas])) {
              setTimeout(() => {
                alert("Parabéns! Você venceu essa partida.");
                startGame();
              }, 300);
              estado = { ...estado, jogadas: 0 };
              atualizarDisplay(estado.display, 0);
            }
          });
        }
      });
    });
  
    const gameContainer = document.querySelector(".game");
    if (gameContainer) {
      observer.observe(gameContainer, { childList: true, subtree: true });
    }
  });