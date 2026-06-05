const data = {
  produtos: [
    {
      id: 1,
      nome: "Samsung Galaxy S23",
      preco: 3499.9,
      categoria: "Celulares",
      imagem:
        "https://d30u9wim1barf6.cloudfront.net/Custom/Content/Products/10/07/1007564_smartphone-samsung-galaxy-s23-5g-6-1-fhd-120hz-128gb-8gb-ram-camera-tripla-50mp-dual-chip-preto_m10_638434374804853316.webp",
      descricao:
        "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
      emEstoque: true,
    },
    {
      id: 2,
      nome: "Dell Inspiron 15",
      preco: 4599.0,
      categoria: "Notebooks",
      imagem:
        "https://assets.mlcdn.com.br/conteudoproduto/21/214523800/Imagens/notebook-dell-inspiron-15-i15-3542-c10-intel-corei3-4gb-1tb-windows-10-led-15-6-hdmi-214523800.jpg",
      descricao:
        "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
      emEstoque: false,
    },
    {
      id: 3,
      nome: "Teclado Mecânico",
      preco: 395.99,
      categoria: "Acessórios",
      imagem: "https://m.media-amazon.com/images/I/61T79euEq2L._AC_SL1500_.jpg",
      descricao:
        "Teclado mecânico com switches de alta qualidade, ideal para jogadores exigentes.",
      emEstoque: true,
    },
    {
      id: 4,
      nome: "Cyberpunk 2077",
      preco: 299.99,
      categoria: "Games",
      imagem: "https://m.media-amazon.com/images/I/81YptknEr3L._AC_SX569_.jpg",
      descricao:
        "Cyberpunk 2077, com conteúdo exclusivo. o novo jogo de ação e aventura da FromSoftware.",
      emEstoque: true,
    },
    {
      id: 5,
      nome: "Samsung Galaxy A56",
      preco: 1899.99,
      categoria: "Celulares",
      imagem:
        "https://http2.mlstatic.com/D_NQ_NP_2X_780820-MLA96865364413_102025-F.webp",
      descricao:
        "Smartphone com 256GB de armazenamento, câmera de alta resolução e excelente desempenho.",
      emEstoque: false,
    },
    {
      id: 6,
      nome: "Acer Aspire 5",
      preco: 6799.0,
      categoria: "Notebooks",
      imagem:
        "https://m.media-amazon.com/images/I/51Mkce7BiZL._AC_SY300_SX300_QL70_ML2_.jpg",
      descricao:
        "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
      emEstoque: true,
    },
    {
      id: 7,
      nome: "Mouse Attack Shark",
      preco: 383.85,
      categoria: "Acessórios",
      imagem: "https://m.media-amazon.com/images/I/61y7QgkP1UL._AC_SX679_.jpg",
      descricao:
        "Mouse gaming com sensor óptico de alta precisão, ideal para jogadores exigentes. E querem ganhar",
      emEstoque: true,
    },
    {
      id: 8,
      nome: "Elden Ring",
      preco: 299.0,
      categoria: "Games",
      imagem:
        "https://cdn.sistemawbuy.com.br/arquivos/cf7e29a341643e1c477691d5e6b1746d/produtos/DU1QOU8/elden-ring-ps5-677c75c54397d.png",
      descricao:
        "Elden Ring, o novo jogo de ação e aventura da FromSoftware. com conteúdo exclusivo.",
      emEstoque: false,
    },
  ],
};

const ProductList = document.getElementById("product-list");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const renderButton = document.getElementById("btnRender");
const productModal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");

function formatPrice(preco) {
  return `R$ ${Number(preco).toFixed(2)}`;
}

function createProductCard(produto) {
  const card = document.createElement("article");
  card.classList.add("card", "product-details");
  card.setAttribute("data-id", produto.id);
  card.style.border = "1px solid rgba(255, 255, 255, 0.08)";
  card.style.padding = "16px";
  card.style.background =
    "linear-gradient(180deg, rgba(20, 29, 54, 0.94), rgba(11, 16, 32, 0.96))";

  const image = document.createElement("img");
  image.src = produto.imagem;
  image.alt = produto.nome;

  const title = document.createElement("h3");
  title.textContent = produto.nome;

  const price = document.createElement("div");
  price.classList.add("preco");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("div");
  category.classList.add("categoria");
  category.textContent = `Categoria: ${produto.categoria}`;

  const description = document.createElement("p");
  description.textContent = produto.descricao;

  const stock = document.createElement("div");
  stock.classList.add("estoque");
  stock.textContent = produto.emEstoque ? "Em estoque" : "Esgotado";

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const detailsButton = document.createElement("button");
  detailsButton.type = "button";
  detailsButton.textContent = "Detalhes";
  detailsButton.addEventListener("click", () => showProductDetails(produto));

  const highlightButton = document.createElement("button");
  highlightButton.type = "button";
  highlightButton.textContent = "Destacar";
  highlightButton.addEventListener("click", () => {
    card.classList.add("highlight");
  });

  actions.appendChild(detailsButton);
  actions.appendChild(highlightButton);

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(description);
  card.appendChild(stock);
  card.appendChild(actions);

  return card;
}

function renderProducts(produtos) {
  ProductList.innerHTML = "";

  produtos.forEach((produto) => {
    const card = createProductCard(produto);
    ProductList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  const cardIds = [];

  cards.forEach((card) => {
    card.style.transform = "translateY(0)";
    cardIds.push(card.getAttribute("data-id"));
  });

  console.log("data-id dos cards renderizados:", cardIds);
}

function renderCategories() {
  const categories = [
    "Todas",
    ...new Set(data.produtos.map((produto) => produto.categoria)),
  ];
  categorySelect.innerHTML = "";

  categories.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  modalBody.innerHTML = `
    <article class="modal-card">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2 id="modal-title">${produto.nome}</h2>
      <div class="modal-price">${formatPrice(produto.preco)}</div>
      <div class="categoria">Categoria: ${produto.categoria}</div>
      <div class="modal-stock">${produto.emEstoque ? "Em estoque" : "Esgotado"}</div>
      <p>${produto.descricao}</p>
    </article>
  `;

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
}

function filterProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  return data.produtos.filter((produto) => {
    const matchesText = produto.nome.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "Todas" || produto.categoria === selectedCategory;
    return matchesText && matchesCategory;
  });
}

function refreshProducts() {
  renderProducts(filterProducts());
}

renderCategories();
renderProducts(data.produtos);

searchInput.addEventListener("input", refreshProducts);
categorySelect.addEventListener("change", refreshProducts);
renderButton.addEventListener("click", refreshProducts);

productModal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productModal.classList.contains("open")) {
    closeModal();
  }
});
