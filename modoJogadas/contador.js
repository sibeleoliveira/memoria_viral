document.addEventListener("DOMContentLoaded", () => {
    // pega a parte do codigo do jogo
  
    // Função que cria o contador 
    const contador = (maxClicks) => {
      let cont = 0; // Inicia o contador, aqui não tem como ser outra coisa, pq esse numero vai variar, então tem que ser let
      
      return () => {
        const novoCont = cont + 1;
        if (novoCont >= maxClicks) { // Verifica se o número máximo de cliques foi atingido
          alert("Você perdeu!"); // Avisa que perdeu caso tenha passado do numero de jogadas
        }
        cont = novoCont; // Atualiza o contador
        return novoCont; // Retorna o valor do contador
      };
    };
  
    const maxClicks = 19; // Define o limite máximo de jogadas
    const adicionaCont = contador(maxClicks); // Cria uma instância do contador
  
    // HTML
    const display = document.createElement("p"); // Cria um parágrafo para exibir o contador
    display.textContent = "Suas Jogadas: 0"; // Define o texto inicial do contador
  
    // Atualiza a pagina com o novo valor do contador
    const updateDisplay = (novoCont) => {
      display.textContent = `Suas Jogadas: ${novoCont}`; // Atualiza a quantidade de jogadas
    };
  
    // Adiciona uma funcionalidade ao programa que permite fazer a captura dos cliques
    document.body.addEventListener("click", () => {
      const novoCont = adicionaCont(); // Chama a função que adiciona o contador
      updateDisplay(novoCont); // Atualiza a página com o novo valor
    });
  
    // Adiciona o elemento criado à página
    document.body.appendChild(display); // Adiciona o parágrafo ao corpo do documento
  });