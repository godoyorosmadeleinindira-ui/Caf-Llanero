document.addEventListener('DOMContentLoaded', () => {
  // Variables de estado del carrito
  let carrito = [];
  let total = 0;

  // Selección de nodos del DOM
  const btnTheme = document.getElementById('btn-theme');
  const btnsAgregar = document.querySelectorAll('.btn-agregar');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalPago = document.getElementById('total-pago');
  const btnVaciar = document.getElementById('btn-vaciar');

  // 1. Alternar Modo Claro / Oscuro
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      document.body.classList.toggle('modo-oscuro');
    });
  }

  // 2. Capturar eventos de "Agregar al Carrito"
  btnsAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const producto = {
        id: e.target.getAttribute('data-id'),
        nombre: e.target.getAttribute('data-nombre'),
        precio: parseFloat(e.target.getAttribute('data-precio'))
      };

      carrito.push(producto);
      total += producto.precio;
      renderizarCarrito();
    });
  });

  // 3. Renderizar productos en el carrito y actualizar el total
  function renderizarCarrito() {
    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'item-carrito';
      li.innerHTML = `
        <span>${item.nombre} - $${item.precio.toLocaleString()}</span>
        <button class="btn-eliminar" data-index="${index}">Eliminar</button>
      `;
      listaCarrito.appendChild(li);
    });

    totalPago.textContent = total.toLocaleString();

    // Eventos para eliminar ítems individuales
    const btnsEliminar = document.querySelectorAll('.btn-eliminar');
    btnsEliminar.forEach(btn => {
      btn.addEventListener('click', eliminarProducto);
    });
  }

  // 4. Eliminar un producto individual
  function eliminarProducto(e) {
    const index = e.target.getAttribute('data-index');
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    renderizarCarrito();
  }

  // 5. Vaciar el carrito completo
  if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
      carrito = [];
      total = 0;
      renderizarCarrito();
    });
  }
});