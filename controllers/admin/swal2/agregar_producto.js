Swal.fire({
  title: "¿Deseas agregar una nueva categoria?",
  icon: "success",
  iconColor: '#004000',
  showDenyButton: true,
  confirmButtonText: "Agregar",
  confirmButtonColor: "#004000",
  denyButtonText: `Cancelar`,
  denyButtonColor: "#004000",
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire({
      title: "Agregado",
      text: "El producto se ha agregado",
      icon: "success",
      iconColor: '#004000',
      confirmButtonColor: "#004000",
    });
  } else if (result.isDenied) {
    Swal.fire({
      title: "Cancelado",
      text: "El producto no se ha agregado",
      icon: "error",
      iconColor: '#004000',
      confirmButtonColor: "#004000",
    });
  }
});

<script src="/controllers/admin/swal2/agregar_producto.js"></script>


