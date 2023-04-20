function Producto(nombre, precio, tipo, descripcion) {
	this.nombre = nombre;
	this.precio = Number(precio);
	this.tipo = tipo;
	this.descripcion = descripcion;
}

let productos = [];

let martini = new Producto('martini', 2550, 'bebestible', '');
let capuccino = new Producto('capuccino', 1370, 'bebestible', '');
let latte = new Producto('latte', 1350, 'bebestible', '');
let mojito = new Producto('mojito', 2290, 'bebestible', '');
let insalataRiso = new Producto(
	'insalata de riso',
	6750,
	'comestible',
	'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iste nisi vel inventore ut dicta perferendis mollitia voluptates suscipit alias.'
);
let insalataCipollotti = new Producto(
	'insalata ai cipollotti',
	5990,
	'comestible',
	'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iste nisi vel inventore ut dicta perferendis mollitia voluptates suscipit alias.'
);
let insalataCaprese = new Producto(
	'insalata caprese',
	8250,
	'comestible',
	'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iste nisi vel inventore ut dicta perferendis mollitia voluptates suscipit alias.'
);
productos.push(
	martini,
	capuccino,
	latte,
	mojito,
	insalataRiso,
	insalataCipollotti,
	insalataCaprese
);

let bebestibles = productos.filter((producto) => producto.tipo == 'bebestible');
let comestibles = productos.filter((producto) => producto.tipo == 'comestible');

// Insertar bebestibles al Menu
bebestibles.forEach((bebestible) => {
	listaBebestibles.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
		<div class="form-check">
			<input type="checkbox" class="form-check-input" id="bebida" />
			<label class="text-capitalize" >${bebestible.nombre}</label>
		</div>
		<div>
			<p class="m-0">${bebestible.precio.toLocaleString('es-CL', {
				style: 'currency',
				currency: 'clp',
			})}</p>
		</div>
	</li>
    `;
});
// Insertar comestibles al Menu
comestibles.forEach((comestible) => {
	listaComestibles.innerHTML += `
    <li class="list-group-item d-flex flex-column">
		<input type="checkbox" class="form-check-input" id="comida" />
		<label class="text-capitalize fw-bold" for="comida">${comestible.nombre}</label>

		<div>
			<p class="fw-bold m-0">${comestible.precio.toLocaleString('es-CL', {
				style: 'currency',
				currency: 'clp',
			})}</p>
			<p>${comestible.descripcion}</p>
		</div>
	</li>
    `;
});

let agregados = [];
let agregar = (prod) => {
	// Inserta producto y precio a la Cuenta final
	tablaElegidos.innerHTML += `
	    <tr>
	        <td class="text-capitalize producto-nombre">${prod.nombre}</td>
	        <td>${prod.precio.toLocaleString('es-CL', {
						style: 'currency',
						currency: 'clp',
					})}</td>
	    </tr>
	    `;
	agregados.push(prod);
	sumarTotal();
};
let quitar = (prod) => {
	// Quita producto de la Cuenta final y descuenta del valor total
	let tdsEncontrados = document.querySelectorAll('td');
	const encontrado = Array.prototype.find.call(
		tdsEncontrados,
		(td) => td.innerHTML == prod.nombre
	);
	// Eliminar fila de la tabla de agregados
	encontrado.parentElement.remove();
	// Restar valor de array agregados para descontarlo del TOTAL
	// Se encuentra el indice del producto dentro del array Agregados para utilizar metodo splice
	let quitarEsteProducto = agregados
		.map((producto) => producto.nombre)
		.indexOf(prod.nombre);
	agregados.splice(quitarEsteProducto, 1);
	sumarTotal();
};

let sumarTotal = () => {
	let total = agregados.reduce((total, producto) => {
		return total + producto.precio;
	}, 0);
	precioTotal.innerHTML = total.toLocaleString('es-CL', {
		style: 'currency',
		currency: 'clp',
	});
};

let checkboxes = document.querySelectorAll('input');
checkboxes.forEach((check) => {
	check.addEventListener('change', () => {
		// Busca label vecino de checkbox para encontrar el nombre del producto
		let label = check.nextElementSibling;
		// A partir del nombre se encuentra el array donde se aloja el producto para llevarlo al array de 'Agregados', como un carrito de compras
		let productoEncontrado;
		if (
			comestibles.find((comestible) => comestible.nombre == label.innerHTML)
		) {
			let producto = comestibles.find(
				(comestible) => comestible.nombre == label.innerHTML
			);
			productoEncontrado = producto;
		} else {
			let producto = bebestibles.find(
				(bebestible) => bebestible.nombre == label.innerHTML
			);
			productoEncontrado = producto;
		}
		// Si es que checkbox esta marcado, se agrega, si se desmarca, se elimina
		if (check.checked) {
			agregar(productoEncontrado);
		} else {
			quitar(productoEncontrado);
		}
	});
});
