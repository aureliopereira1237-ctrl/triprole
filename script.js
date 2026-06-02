const pessoas = [
  {
    nome: "Ana Clara, 20",
    cidade: "Rio de Janeiro - RJ",
    bio: "Praia, samba, pôr do sol e rolês leves.",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    tags: ["Praia", "Samba", "Café"]
  },
  {
    nome: "João Pedro, 22",
    cidade: "São Paulo - SP",
    bio: "Curto bares, eventos, futebol e conhecer gente nova.",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    tags: ["Futebol", "Barzinho", "Shows"]
  },
  {
    nome: "Larissa, 19",
    cidade: "Florianópolis - SC",
    bio: "Trilhas, praia, música e boas conversas.",
    foto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    tags: ["Trilha", "Praia", "Música"]
  },
  {
    nome: "Gabriel, 23",
    cidade: "Salvador - BA",
    bio: "Procuro amizades para explorar lugares novos.",
    foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    tags: ["Viagem", "Festival", "Rolê"]
  },
  {
    nome: "Mariana, 21",
    cidade: "Recife - PE",
    bio: "Amo praia, cultura, comida boa e gente animada.",
    foto: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    tags: ["Praia", "Comida", "Cultura"]
  }
];

let atual = 0;

function mostrarPessoa() {
  document.getElementById("fotoPessoa").src = pessoas[atual].foto;
  document.getElementById("nome").innerText = pessoas[atual].nome;
  document.getElementById("cidade").innerText = pessoas[atual].cidade;
  document.getElementById("bio").innerText = pessoas[atual].bio;
  document.getElementById("mensagem").innerText = "";

  const tags = document.getElementById("tags");
  tags.innerHTML = "";

  pessoas[atual].tags.forEach(tag => {
    tags.innerHTML += `<span>${tag}</span>`;
  });
}

function proximaPessoa() {
  atual++;

  if (atual >= pessoas.length) {
    atual = 0;
  }

  mostrarPessoa();
}

function curtir() {
  document.getElementById("mensagem").innerText = "❤️ Conexão enviada!";
  setTimeout(proximaPessoa, 800);
}

function passar() {
  document.getElementById("mensagem").innerText = "Próximo perfil...";
  setTimeout(proximaPessoa, 500);
}

function mostrarTela(id) {
  const telas = document.querySelectorAll(".tela");

  telas.forEach(tela => {
    tela.classList.remove("ativa");
  });

  document.getElementById(id).classList.add("ativa");
}

const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");

fotoInput.addEventListener("change", function () {
  const arquivo = this.files[0];

  if (arquivo) {
    const leitor = new FileReader();

    leitor.onload = function (e) {
      preview.src = e.target.result;
    };

    leitor.readAsDataURL(arquivo);
  }
});

function salvarPerfil() {
  const nome = document.getElementById("meuNome").value;
  const idade = document.getElementById("minhaIdade").value;
  const signo = document.getElementById("signo").value;
  const bio = document.getElementById("minhaBio").value;

  document.getElementById("perfilNome").innerText =
    nome && idade ? `${nome}, ${idade}` : "Seu nome";

  document.getElementById("perfilSigno").innerText =
    signo !== "Escolha seu signo" ? `♈ ${signo}` : "Seu signo";

  document.getElementById("perfilBio").innerText =
    bio ? bio : "Sua bio aparecerá aqui";
}

function buscarLocalizacao() {
  const lista = document.getElementById("listaTours");

  if (!navigator.geolocation) {
    lista.innerHTML = "<p>Seu navegador não suporta GPS.</p>";
    return;
  }

  lista.innerHTML = "<p>Buscando sua localização...</p>";

  navigator.geolocation.getCurrentPosition(
    function (posicao) {
      const lat = posicao.coords.latitude;
      const lon = posicao.coords.longitude;

      lista.innerHTML = `
        <div class="tour-card">
          <h3>🌅 Pôr do sol social</h3>
          <p>Rolê em grupo para conhecer pessoas perto de você.</p>
          <p><strong>GPS:</strong> ${lat.toFixed(3)}, ${lon.toFixed(3)}</p>
        </div>

        <div class="tour-card">
          <h3>☕ Café & conversa</h3>
          <p>Encontro leve em cafeteria movimentada da região.</p>
        </div>

        <div class="tour-card">
          <h3>🎶 Barzinho com música</h3>
          <p>Rolê brasileiro clássico para socializar.</p>
        </div>

        <div class="tour-card">
          <h3>🚶 Caminhada turística</h3>
          <p>Tour em grupo para explorar pontos conhecidos da cidade.</p>
        </div>
      `;
    },
    function () {
      lista.innerHTML = "<p>Permita a localização para ver os rolês.</p>";
    }
  );
}

mostrarPessoa();