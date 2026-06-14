// Dados integrados diretamente para evitar erros no GitHub Pages
const dadosProjeto = {
  solos: {
    "Terra Roxa": {
      descricao: "Solo avermelhado e ultra fértil devido à decomposição de rochas basálticas. Muito comum no Paraná!",
      curiosidade: "Os imigrantes italianos o chamavam de 'terra rossa' (terra vermelha), e os brasileiros adaptaram para 'roxa'!",
      culturas: ["Café", "Soja", "Milho"],
      img src: "imagem/sul.jpeg"
    },
    "Argiloso": {
      descricao: "Composto por partículas muito pequenas de argila. Retém muita água, ficando barro quando chove e rachado quando seca.",
      curiosidade: "É excelente para segurar nutrientes, mas o agricultor precisa cuidar para não encharcar as raízes.",
      culturas: ["Arroz", "Milho", "Soja"],
      imagem: "imagens/argiloso.jpg"
    },
    "Arenoso": {
      descricao: "Solo leve, com textura de areia. A água passa muito rápido por ele (alta drenagem), levando embora os nutrientes.",
      curiosidade: "Precisa de muita matéria orgânica (adubo natural) e irrigação controlada para produzir bem.",
      culturas: ["Mandioca", "Pastagem", "Abacaxi"],
      imagem: "imagens/arenoso.jpg"
    },
    "Humoso": {
      descricao: "Também conhecido como terra preta. É riquíssimo em matéria orgânica (folhas e restos de plantas decompostas).",
      curiosidade: "É o solo favorito das minhocas e hortas caseiras por ser super fofo e nutritivo.",
      culturas: ["Hortaliças", "Milho", "Legumes"],
      imagem: "imagens/humoso.jpg"
    },
    "Calcário": {
      descricao: "Solo com muitos pedaços de rochas e calcário. É comum em regiões secas ou montanhosas.",
      curiosidade: "O calcário é muito usado pelos agricultores para 'corrigir' a acidez de outros solos antes do plantio.",
      culturas: ["Uva", "Pastagem", "Trigo"],
      imagem: "imagens/calcario.jpg"
    }
  },
  estados: {
    "Sul": "Terra Roxa",
    "Sudeste": "Argilosa",
    "Nordeste": "Arenoso",
    "Centro-oeste": "Calcário",
    "Norte": "Humoso"
  },
  quiz: [
    {
      pergunta: "Qual tipo de solo ganhou o nome de 'Roxa' por causa de uma confusão com a palavra italiana 'Rossa'?",
      opcoes: ["Arenoso", "Terra Roxa", "Calcário"],
      resposta: "Terra Roxa",
      explicacao: "Os italianos chamavam o solo de 'terra rossa' (vermelha), e por causa do som da palavra, os brasileiros entenderam 'roxa'!"
    },
    {
      pergunta: "Qual solo retém muita água, podendo ficar encharcado facilmente se chover demais?",
      opcoes: ["Argiloso", "Arenoso", "Humoso"],
      resposta: "Argiloso",
      explicacao: "A argila tem grãos tão colados que a água demora muito para passar por ela."
    },
    {
      pergunta: "Para plantar Mandioca em um solo Arenoso, o que o produtor precisa fazer para ter sucesso sustentável?",
      opcoes: ["Colocar muita água até virar barro", "Abandonar a terra", "Usar irrigação controlada e adubo orgânico"],
      resposta: "Usar irrigação controlada e adubo orgânico",
      explicacao: "Como a água passa rápido pela areia, o adubo e a rega controlada salvam a plantação!"
    }
  ]
};

let perguntaAtual = 0;
let acertosQuiz = 0;

// Inicializar a página ao carregar
window.onload = function() {
  criarBiblioteca();
  mostrarPerguntaQuiz();
};

// --- MAPA INTERATIVO ---
function mostrarSolo(nomeEstado) {
  const tipoSolo = dadosProjeto.estados[nomeEstado];
  const infoSolo = dadosProjeto.solos[tipoSolo];
  
  const divInfo = document.getElementById("info-estado");
  divInfo.classList.remove("escondido");
  
  document.getElementById("nome-estado").innerText = `📍 Estado selecionado: ${nomeEstado}`;
  document.getElementById("tipo-solo-estado").innerText = tipoSolo;
  document.getElementById("desc-solo-estado").innerHTML = `${infoSolo.descricao}<br><br>💡 <b>Curiosidade:</b> ${infoSolo.curiosidade}`;
  document.getElementById("img-solo-estado").src = infoSolo.imagem;
}

// --- BIBLIOTECA DE SOLOS ---
function criarBiblioteca() {
  const container = document.getElementById("solos-container");
  container.innerHTML = ""; // Limpa antes de carregar
  
  for (const [nome, info] of Object.entries(dadosProjeto.solos)) {
    const card = document.createElement("div");
    card.classList.add("solo-card");
    card.innerHTML = `
      <img src="${info.imagem}" alt="${nome}">
      <h3>${nome}</h3>
      <p style="font-size: 0.9rem; color: #555;">${info.descricao}</p>
    `;
    container.appendChild(card);
  }
}

// --- SIMULADOR DE PLANTIO ---
function simularPlantio() {
  const solo = document.getElementById("sim-solo").value;
  const cultura = document.getElementById("sim-cultura").value;
  const chuva = document.getElementById("sim-chuva").value;
  const divResultado = document.getElementById("resultado-simulacao");
  
  divResultado.classList.remove("escondido");
  const infoSolo = dadosProjeto.solos[solo];
  const gostaDaCultura = infoSolo.culturas.includes(cultura);

  // Lógica do simulador
  if (chuva === "Ideal" && gostaDaCultura) {
    divResultado.className = "sucesso";
    divResultado.innerHTML = `🎉 <b>Sucesso Total!</b> O solo ${solo} é perfeito para ${cultura} com chuva ideal. Sua produção foi de 100%! <br>🌱 <i>Dica Sustentável:</i> Pratique a rotação de culturas para manter esse solo sempre saudável!`;
  } else if (chuva === "Pouca" && solo === "Arenoso") {
    divResultado.className = "erro";
    divResultado.innerHTML = `⚠️ <b>Alerta de Seca!</b> O solo Arenoso já não segura água, sem chuva a plantação de ${cultura} murchou.<br>💧 <i>Dica Sustentável:</i> Use cobertura morta (palhada) para manter a umidade do solo!`;
  } else if (chuva === "Muita" && solo === "Argiloso") {
    divResultado.className = "erro";
    divResultado.innerHTML = `🌊 <b>Solo Encharcado!</b> O solo Argiloso retém muita água. Com muita chuva, as raíces do seu ${cultura} apodreceram.<br>🚜 <i>Dica Sustentável:</i> Crie canais de drenagem naturais e evite compactar o solo com tratores pesados.`;
  } else if (!gostaDaCultura) {
    divResultado.className = "alerta";
    divResultado.innerHTML = `⚖️ <b>Produção Média!</b> O solo ${solo} não é o mais indicado para ${cultura}, mas com as técnicas certas você colheu um pouco.<br>🧪 <i>Dica Sustentável:</i> Faça uma análise do solo em laboratório para corrigir os nutrientes antes de plantar.`;
  } else {
    divResultado.className = "sucesso";
    divResultado.innerHTML = `🌾 <b>Boa Colheita!</b> O clima mudou um pouco, mas a combinação de ${solo} e ${cultura} resistiu bem. <br>🍂 <i>Dica Sustentável:</i> Use adubação orgânica para fortalecer as plantas contra variações de clima.`;
  }
  
  // Se ele simulou, já ajuda a liberar o certificado
  checarLiberacaoCertificado();
}

// --- QUIZ EDUCATIVO ---
function mostrarPerguntaQuiz() {
  const containerPerguntas = document.getElementById("pergunta");
  const containerRespostas = document.getElementById("respostas");
  const feedback = document.getElementById("feedback-quiz");
  
  feedback.innerText = "";
  feedback.className = "";
  
  if (perguntaAtual < dadosProjeto.quiz.length) {
    const q = dadosProjeto.quiz[perguntaAtual];
    containerPerguntas.innerText = `Pergunta ${perguntaAtual + 1}: ${q.pergunta}`;
    containerRespostas.innerHTML = "";
    
    q.opcoes.forEach(opcao => {
      const botao = document.createElement("button");
      botao.innerText = opcao; // Bug fixado aqui!
      botao.onclick = () => avaliarResposta(opcao, q.resposta, q.explicacao);
      containerRespostas.appendChild(botao);
    });
  } else {
    // Fim do quiz
    document.getElementById("quiz-container").classList.add("escondido");
    const containerFinal = document.getElementById("resultado-final-quiz");
    containerFinal.classList.remove("escondido");
    containerFinal.innerHTML = `<h3>🏆 Quiz Concluído!</h3><p>Você acertou ${acertosQuiz} de ${dadosProjeto.quiz.length} perguntas.</p>`;
    checarLiberacaoCertificado();
  }
}

function avaliarResposta(escolhida, correta, explicacao) {
  const feedback = document.getElementById("feedback-quiz");
  const botoes = document.getElementById("respostas").querySelectorAll("button");
  
  // Desativa os botões para não clicar duas vezes
  botoes.forEach(b => b.disabled = true);

  if (escolhida === correta) {
    acertosQuiz++;
    feedback.className = "sucesso";
    feedback.innerHTML = `✔️ Resposta Correta! ${explicacao}`;
  } else {
    feedback.className = "erro";
    feedback.innerHTML = `❌ Errado! A resposta certa era: ${correta}. <br>${explicacao}`;
  }

  // Espera 4,5 segundos para o aluno ler a explicação e vai para a próxima
  setTimeout(() => {
    perguntaAtual++;
    mostrarPerguntaQuiz();
  }, 4500);
}

// --- LIBERAÇÃO DO CERTIFICADO ---
function checarLiberacaoCertificado() {
  // Se o aluno chegou ao final do quiz ou fez alguma simulação, ele ganha o certificado
  if (perguntaAtual >= dadosProjeto.quiz.length) {
    document.getElementById("secao-certificado").classList.remove("escondido");
  }
}
