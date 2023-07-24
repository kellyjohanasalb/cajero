// 1. Lista de usuarios con sus datos
const usuarios = [
  { 
    nombre: 'Admin', 
    documento: 'ad15489', 
    contrasena: 'ad15489', 
    tipo: 1 }, // Usuario administrador
  { 
    nombre: 'Cliente', 
    documento: '564897', 
    contrasena: '564897', 
    tipo: 2 } // Usuario cliente
];

// 2. Array para almacenar la información del cajero
let cajero = [
  { denominacion: 100000, cantidad: 0 }, // Billete de 100.000 dolares COP
  { denominacion: 50000, cantidad: 0 }, // Billete de 50.000 dolares COP
  { denominacion: 20000, cantidad: 0 }, // Billete de 20.000 dolares COP
  { denominacion: 10000, cantidad: 0 }, // Billete de 10.000 dolares COP
  { denominacion: 5000, cantidad: 0 } // Billete de 5.000 dolares COP
];

// 3. Función para cargar el cajero
function cargarCajero() {
  console.log('Cajero cargado...');
  for (let i = 0; i < cajero.length; i++) {
    let cantidad = parseInt(prompt('Ingrese la cantidad de billetes de ' + cajero[i].denominacion + ' dolares COP:'));
    cajero[i].cantidad += cantidad;
  }
  console.log('Cajero cargado exitosamente.');
  mostrarCajero();
  reiniciarPrograma();
}

// 4. Función para mostrar la información del cajero
function mostrarCajero() {
  console.log('Estado actual del cajero:');
  let totalGeneral = 0;
  for (let i = 0; i < cajero.length; i++) {
    let subtotal = cajero[i].denominacion * cajero[i].cantidad;
    totalGeneral += subtotal;
    console.log('Denominación: ' + cajero[i].denominacion + ' - Cantidad: ' + cajero[i].cantidad + ' - Subtotal: ' + subtotal);
  }
  console.log('Total general: ' + totalGeneral);
}

// 5. Función para retirar dinero del cajero
function retirarDinero() {
  // 7. Verificar si el cajero está vacío
  if (cajeroVacio()) {
    console.log('Cajero en mantenimiento, vuelva pronto.');
    reiniciarPrograma();
    return;
  }
  
  let cantidadDeseada = parseInt(prompt('Ingrese la cantidad deseada a retirar:'));
  let dineroRestante = cantidadDeseada;
  let dineroEntregado = [];
  
  // 8. Calcular la cantidad de billetes de cada denominación a entregar
  for (let i = 0; i < cajero.length; i++) {
    let cantidadEntregada = Math.floor(dineroRestante / cajero[i].denominacion);
    if (cantidadEntregada > cajero[i].cantidad) {
      cantidadEntregada = cajero[i].cantidad;
    }
    dineroEntregado.push({ denominacion: cajero[i].denominacion, cantidad: cantidadEntregada });
    cajero[i].cantidad -= cantidadEntregada;
    dineroRestante -= cantidadEntregada * cajero[i].denominacion;
  }
  
  // 8. Mostrar el dinero entregado
  console.log('Dinero entregado:');
  for (let i = 0; i < dineroEntregado.length; i++) {
    console.log('Denominación: ' + dineroEntregado[i].denominacion + ' - Cantidad: ' + dineroEntregado[i].cantidad);
  }
  
  // 9. Mostrar el dinero restante en el cajero
  console.log('Dinero restante en el cajero:');
  mostrarCajero();
  reiniciarPrograma();
}

// 6. Función para verificar si el cajero está vacío
function cajeroVacio() {
  for (let i = 0; i < cajero.length; i++) {
    if (cajero[i].cantidad > 0) {
      return false;
    }
  }
  return true;
}

// Función para reiniciar el programa
function reiniciarPrograma() {
  let reiniciar = prompt('¿Desea realizar otra operación? (S/N)').toLowerCase();
  if (reiniciar === 's') {
    iniciarCajero();
  } else {
    console.log('¡Hasta luego!');
  }
}

// Función para iniciar el cajero
function iniciarCajero() {
  let documento = prompt('Ingrese su número de documento:');
  let contrasena = prompt('Ingrese su contraseña:');
  
  let usuarioEncontrado = false;
  let tipoUsuario = 0;
  
  // 2. Buscar el usuario en la lista de usuarios
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].documento === documento && usuarios[i].contrasena === contrasena) {
      usuarioEncontrado = true;
      tipoUsuario = usuarios[i].tipo;
      break;
    }
  }
  
  // 2. Verificar si el usuario existe
  if (!usuarioEncontrado) {
    console.log('Usuario o contraseña incorrectos.');
    reiniciarPrograma();
    return;
  }
  
  // 2. Determinar la acción a realizar según el tipo de usuario
  if (tipoUsuario === 1) {
    cargarCajero();
  } else if (tipoUsuario === 2) {
    retirarDinero();
  }
}

// Iniciar el cajero
iniciarCajero();


