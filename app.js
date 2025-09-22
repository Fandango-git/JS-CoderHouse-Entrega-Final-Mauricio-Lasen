
let productos = [];
let cotizacion = [];

axios.get('productos.json')
    .then(response => {
        productos = response.data;
        mostrarProductos();
    });

function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarACotizacion(${producto.id})">Agregar</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarACotizacion(id) {
    const producto = productos.find(p => p.id === id);
    cotizacion.push(producto);
    actualizarCotizacion();
}

function actualizarCotizacion() {
    const lista = document.getElementById('lista-cotizacion');
    lista.innerHTML = '';
    let total = 0;
    cotizacion.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nombre} - $${p.precio}`;
        lista.appendChild(li);
        total += p.precio;
    });
    document.getElementById('total').textContent = total;
}

document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    Swal.fire({
        title: 'Cotización generada',
        html: `<p>Gracias, ${nombre}. Te enviaremos la cotización a ${email}.</p>`,
        icon: 'success'
    });
});
