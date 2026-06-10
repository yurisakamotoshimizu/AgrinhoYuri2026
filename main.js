let dados;
let perguntaIndex = 0;
let pontos = 0;

// Carregar dados do JSON
fetch('dados.json')
  .then(response => response.json())
  .then(data => {
    dados = data;
    carregarBiblioteca();
    mostrarPergunta();
  });

// Mostrar solo do estado clicado
function mostrarSolo(estado) {
  const tipoSolo = dados.estados[estado];
  const info = dados.solos[tipoSolo];
  document.getElementById('info-solo').innerHTML = `
    <h3>${estado}</h3>
    <p>Solo predominante: <b>${tipoSolo}</b></p>
    <p>${info.descricao}</p>
    <img src="${info.imagem}" alt="${tipoSolo}" width="200">
  `;
}

// Carregar biblioteca de solos
function carregarBiblioteca() {
  const container = document.getElementById('solos-container');
  for (const [nome, info] of Object.entries(dados.solos)) {
    const card = document.createElement('div');
    card.classList.add('solo-card');
    card.innerHTML = `
      <h3>${nome}</h3>
      <img src="${info.imagem}" alt="${nome}">
      <p>${info.descricao}</p>
    `;
    container.appendChild(card);
  }
}

// Quiz
function mostrarPergunta() {
  const perguntaDiv = document.getElementById('pergunta');
  const respostasDiv = document.getElementById('respostas');
  const q = dados.quiz[perguntaIndex];
  perguntaDiv.textContent = q.pergunta;
  respostasDiv.innerHTML = '';
  q.opcoes.forEach(op => {
    const btn = document.createElement('button');
    btn.textContent = op;
    btn.onclick = () => verificarResposta(op, q.resposta);
    respostasDiv.appendChild(btn);
  });
}

function verificarResposta(opcao, correta) {
  if (opcao === correta) {
    alert('✔️ Correto!');
    pontos++;
  } else {
    alert(`❌ Errado! A resposta correta é ${correta}.`);
  }
}

function proximaPergunta() {
  perguntaIndex++;
  if (perguntaIndex < dados.quiz.length) {
    mostrarPergunta();
  } else {
    document.getElementById('quiz').innerHTML = `<h2>Quiz finalizado!</h2><p>Pontuação: ${pontos} / ${dados.quiz.length}</p>`;
  }
}
