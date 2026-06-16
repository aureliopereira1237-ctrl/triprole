const lugares=[
  {
    titulo:"Samba no centro",
    local:"Centro histórico",
    desc:"Música brasileira, gente nova e benefício Sympla.",
    img:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80"
  },
  {
    titulo:"Café para estudar",
    local:"Café Aurora",
    desc:"Ambiente calmo, bonito e ideal para leitura.",
    img:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80"
  },
  {
    titulo:"Bar com música ao vivo",
    local:"Vila boêmia",
    desc:"Bandas locais, clima descontraído e cupom Triprole.",
    img:"https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=900&q=80"
  }
];

const posts=[
  {
    nome:"Camila",
    tag:"📚 Estudos",
    texto:"Achei um café muito bom para estudar perto da Paulista."
  },
  {
    nome:"Rafael",
    tag:"🎵 Música",
    texto:"Alguém anima um barzinho com música ao vivo hoje?"
  },
  {
    nome:"Bianca",
    tag:"🤝 VolunTrip",
    texto:"Vou participar da distribuição de alimentos sábado. Quem cola?"
  }
];

function abrir(id){
  document.querySelectorAll(".page").forEach(page=>{
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function carregarLugares(){
  const container=document.getElementById("listaLugares");
  container.innerHTML="";

  lugares.forEach(lugar=>{
    container.innerHTML+=`
      <div class="place">
        <img src="${lugar.img}">
        <small>${lugar.local}</small>
        <h3>${lugar.titulo}</h3>
        <p>${lugar.desc}</p>
      </div>
    `;
  });
}

function ativarLocalizacao(){
  const status=document.getElementById("statusLocalizacao");

  if(!navigator.geolocation){
    status.innerText="Seu navegador não suporta localização.";
    return;
  }

  status.innerText="Buscando sua localização...";

  navigator.geolocation.getCurrentPosition(
    function(posicao){
      const lat=posicao.coords.latitude.toFixed(3);
      const lon=posicao.coords.longitude.toFixed(3);
      status.innerText=`Localização ativada: ${lat}, ${lon}`;
      carregarLugares();
    },
    function(){
      status.innerText="Permita a localização para ver lugares próximos.";
    }
  );
}

function carregarPosts(){
  const feed=document.getElementById("feed");
  feed.innerHTML="";

  posts.forEach(post=>{
    feed.innerHTML+=`
      <div class="post">
        <small>${post.tag}</small>
        <h3>${post.nome}</h3>
        <p>${post.texto}</p>
        <div class="post-actions">
          <span>❤️ Curtir</span>
          <span>💬 Comentar</span>
          <span>↗ Compartilhar</span>
        </div>
      </div>
    `;
  });
}

function publicarPost(){
  const campo=document.getElementById("novoPost");
  const texto=campo.value.trim();

  if(texto===""){
    alert("Escreva algo antes de publicar.");
    return;
  }

  posts.unshift({
    nome:"Você",
    tag:"📍 Minha cidade",
    texto:texto
  });

  campo.value="";
  carregarPosts();
}

const fotoInput=document.getElementById("fotoInput");
const fotoPerfil=document.getElementById("fotoPerfil");
const avatar=document.querySelector(".avatar");

fotoInput.addEventListener("change",function(){
  const arquivo=this.files[0];

  if(arquivo){
    const leitor=new FileReader();

    leitor.onload=function(e){
      fotoPerfil.src=e.target.result;
      fotoPerfil.style.display="block";
      avatar.style.display="none";
    };

    leitor.readAsDataURL(arquivo);
  }
});

function salvarPerfil(){
  const nome=document.getElementById("nomePerfil").value;
  const cidade=document.getElementById("cidadePerfil").value;
  const bio=document.getElementById("bioPerfil").value;

  document.getElementById("previewNome").innerText=nome || "Seu nome";
  document.getElementById("previewCidade").innerText=cidade || "Sua cidade";
  document.getElementById("previewBio").innerText=bio || "Sua bio aparecerá aqui.";
}

carregarLugares();
carregarPosts();