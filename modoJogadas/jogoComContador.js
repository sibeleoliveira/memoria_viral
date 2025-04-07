document.addEventListener("DOMContentLoaded", () => {
    const MAX_CLICKS = 19;
  
    const criarDisplay = (valorInicial) => {
      const mostrador = document.createElement("p");
      mostrador.textContent = `Suas Jogadas: ${valorInicial}`;
      mostrador.style.cssText = `
        font-size: 20px;
        color: white;
        background-color: #333;
        padding: 10px;
        border-radius: 8px;
        width: fit-content;
        margin: 10px auto;
        text-align: center;
      `;
      return mostrador;
    };
  
