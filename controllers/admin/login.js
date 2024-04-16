const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function Menu() {
  window.location.href = "../../views/admin/Menu.html";
}

function categoriaAlumnos() {
  window.location.href = "../../views/admin/categoriaAlumnos.html";
}

function categoriaProductos() {
  window.location.href = "../../views/admin/categoriaProductos.html";
}

function productosP() {
  window.location.href = "../../views/admin/productosP.html";
}

function pagosDeMensualidad() {
  window.location.href = "../../views/admin/pagosDeMensualidad.html";
}

function cancelacion_alumnos() {
  window.location.href = "../../views/admin/cancelacion_alumnos.html";
}

function A() {
  window.location.href = "../../views/admin/Menu.html";
}

function categoriaProfesores() {
  window.location.href = "../../views/admin/categoriaAlumnos.html";
}

function A() {
  window.location.href = "../../views/admin/index.html";
}

function A() {
  window.location.href = "../../views/admin/Menu.html";
}

function index() {
  window.location.href = "../../views/admin/index.html";
}