const root = document.querySelector(".root");
let productsRoot;
let showAllProducts = false;

async function renderMenuCategories() {
  const cats = await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => json);

  const temp = cats
    .map((item) => {
      return `
        <li class="p-2 hover:text-gray-500 cursor-pointer"><a href="/categories/${item}" onclick="handleBClick(event)"> ${item}
        </a></li>
        <span class="text-gray-500">|</span>
      `;
    })
    .join("");
  const temp2 = cats
    .map((item) => {
      return `
        <li class="p-2 hover:text-gray-500 cursor-pointer"><a href="/categories/${item}" onclick="handleBClick(event)"> ${item}
        </a></li>
      `;
    })
    .join("");

  const catsMenu = document.getElementById("cats-menu");
  const cats2menu = document.getElementById("cats2-menu");

  catsMenu.innerHTML += temp;
  cats2menu.innerHTML += temp2;
}

renderMenuCategories();

async function getAllProductsByFilter(limit = "") {
  const result = await fetch(
    `https://fakestoreapi.com/products${limit ? `?limit=${limit}` : ""}`
  ).then((res) => res.json());

  return result;
}

function renderProducts(list) {
  const template = list
    .map((product) => {
      return `
      <div 
      onclick="handleProductClick(${product.id})"
      class="card__article cursor-pointer">
      <img
        class="card__img "
        src="${product.image}"
        alt=""
      />
      <div class="card__data">
        <div class="flex ml-5">
          <img class="h-5" src="img/icons8-star-48.png" alt="" />
          <img class="h-5" src="img/icons8-star-48.png" alt="" />
          <img class="h-5" src="img/icons8-star-48.png" alt="" />
          <img class="h-5" src="img/icons8-star-48.png" alt="" />
          <img class="h-5" src="img/icons8-star-48.png" alt="" />
        </div>
        <h3 class="ml-5 pt-3 text-lg">${product.title}</h3>
        <div class="pt-2 flex gap-[5px]">
          <span>${product.price}</span>
          <span>تومان</span>
          <img
            class="w-6 mr-[10%] cursor-pointer hover:bg-red-500 hover:rounded-lg"
            src="img/icons8-shopping-bag-50.png"
            alt=""
          />
        </div>
      </div>
    </div>
        `;
    })
    .join("");

  productsRoot.innerHTML = template;
}

function handleProductClick(productId) {
  history.pushState({}, "", `/products/${productId}`);
  checkState();
}

async function renderAllProducts() {
  const data = await getAllProductsByFilter();
  renderProducts(data);
}

async function renderLimitedProducts() {
  const limitedProducts = await getAllProductsByFilter("4");
  renderProducts(limitedProducts);
}

async function renderMainPage() {
  const mainTemplate = `
        <section class="my-8 md:mt-12">
          <h2 class="text-center text-2xl">همه محصولات</h2>
          <div
            class="my-12 md:my-16 w-11/12 md:w-full md:max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            id="products-root"
          ></div>
          <a
            href="/products"
            id="toggleButton"
            onclick="handleAClick(event)"
            class="btn w-max px-8 py-2 rounded-md !block mx-auto bg-red-500 text-white"
          >
            مشاهده بیشتر
          </a>
        </section>
      `;

  root.innerHTML = mainTemplate;
  productsRoot = document.getElementById("products-root");
  await renderLimitedProducts();
}
function renderSingleCategory(list) {
  const template = list
    .map((product) => {
      return `
        <div 
        onclick="handleProductClick(${product.id})"
        class="card__article cursor-pointer">
        <img
          class="card__img "
          src="${product.image}"
          alt=""
        />
        <div class="card__data">
          <div class="flex ml-5">
            <img class="h-5" src="img/icons8-star-48.png" alt="" />
            <img class="h-5" src="img/icons8-star-48.png" alt="" />
            <img class="h-5" src="img/icons8-star-48.png" alt="" />
            <img class="h-5" src="img/icons8-star-48.png" alt="" />
            <img class="h-5" src="img/icons8-star-48.png" alt="" />
          </div>
          <h3 class="ml-5 pt-3 text-lg">${product.title}</h3>
          <div class="pt-2 flex gap-[5px]">
            <span>${product.price}</span>
            <span>تومان</span>
            <img
              class="w-6 mr-20 cursor-pointer hover:bg-red-500 hover:rounded-lg"
              src="img/icons8-shopping-bag-50.png"
              alt=""
            />
          </div>
        </div>
      </div>
          `;
    })
    .join("");

  const result = `
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            ${template}
          </div>
        `;

  root.innerHTML = result;
}

async function getSingleProduct(productId) {
  const result = await fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((json) => json);

  return result;
}

function renderSingleProduct({
  category: cat,
  description: desc,
  image,
  price,
  title,
}) {
  const template = `
    <div
    class="w-11/12 mx-auto pt-16 flex items-center justify-center flex-col gap-2 md:gap-4 md:max-w-[1280px] lg:flex-row lg:items-start"
  >
  <img
  src="${image}"
  class="rounded-md w-[50%] my-4"
  alt=""
/>
    <div class="order-1 w-full md:mt-20">
      <span class="text-white bg-black rounded-full px-4 py-1"
        >${cat}</span
      >
      <div class="mt-4">
        <a href="/src/index.html">صفحه اصلی</a>
        /
        <a onclick="handleAClick(event)" href="/products">همه محصولات</a>
      </div>
      <h1 class="text-slate-700 mb-5 mt-4 text-2xl font-bold">
        ${title}
      </h1>

      <p>
        ${desc}
      </p>

      <div class="block text-center md:mt-4 md:text-start font-extrabold">
        <span>${price}</span>
        تومان
      </div>
      <button
        class="w-full md:w-auto px-4 py-2 my-5 bg-red-500 text-white rounded-md text-center"
      >
        اضافه به سبد خرید
      </button>
    </div>
  </div>
    `;
  document.querySelector(".body").innerHTML = template;
}
renderMainPage();
function handleBClick(event) {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  history.pushState({}, "", href);

  checkState();
}
function openNav() {
  document.querySelector(".nav").classList.toggle("alaki");
}
async function handleAClick(event) {
  event.preventDefault();
  const href = event.target.getAttribute("href");

  showAllProducts = !showAllProducts;

  if (showAllProducts) {
    await renderAllProducts();
    document.getElementById("toggleButton").innerText = "بازگشت";
  } else {
    await renderLimitedProducts();
    document.getElementById("toggleButton").innerText = "مشاهده بیشتر";
  }
  renderProducts(list);
  history.pushState({}, "", href);
  checkState();
}

async function getSingleCategory(cat) {
  const result = await fetch(
    `https://fakestoreapi.com/products/category/${cat}`
  )
    .then((res) => res.json())
    .then((json) => json);

  return result;
}

async function checkState() {
  const pathName = location.pathname;
  switch (true) {
    case pathName === "/products":
      if (showAllProducts) {
        await renderAllProducts();
      } else {
        await renderLimitedProducts();
      }
      break;
    case pathName === "/src/index.html":
      renderMainPage();
      break;
    case pathName.includes("/categories/"):
      let cat = pathName.split("/").pop();
      const catProducts = await getSingleCategory(cat);
      renderSingleCategory(catProducts);
      break;
    case pathName.includes("/products/"):
      let pId = pathName.split("/").pop();
      const singlePData = await getSingleProduct(pId);
      renderSingleProduct(singlePData);
      break;
    default:
      renderMainPage();
      break;
  }
}

window.addEventListener("popstate", checkState);
