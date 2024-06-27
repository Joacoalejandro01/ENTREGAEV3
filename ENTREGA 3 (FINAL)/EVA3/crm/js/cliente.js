var g_id_cliente ="";

//Función para agregar tipo de gestión
function agregarCliente(){
//Obtenemos el tipo de gestión que ingresa el usuario
var dv_cliente = document.getElementById("txt_dv").value;
var nombres_cliente = document.getElementById("txt_cliente_nombres").value;
var apellidos_cliente = document.getElementById("txt_cliente_apellidos").value;
var email_cliente = document.getElementById("txt_cliente_email").value;
var celular_cliente = parseInt(document.getElementById("txt_cliente_celular").value);

  if (dv_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (nombres_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (apellidos_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (email_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (celular_cliente === ""|| isNaN(parseInt(celular))) {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }


//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "id_cliente": 1233,
  "dv": dv_cliente,
  "nombres": nombres_cliente,
  "apellidos": apellidos_cliente,
  "email": email_cliente,
  "celular": celular_cliente,
  "fecha_registro": fechaHoraActual
});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
  .then((response) => {
    //Por hacer: Usar componentes de bootstrap para gestionar éxito o error
    if (response.status == 200) {
      setTimeout(() => {
        location.href = "listar.html";
      }, 2000);
      mostrarAlerta('success', 'Cliente agregado exitosamente.'); 
    } else if (response.status == 400) {
      mostrarAlerta('danger', 'Solicitud incorrecta. Por favor, revise los datos.'); 
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);

}
function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var id_cliente = element.id_cliente;
  document.getElementById('lbl_eliminar').innerHTML ="Desea eliminar <b>" + id_cliente + "</b>";


}
function completarFormulario(element,index,arr){
  
  var dv_cliente = element.dv;
  document.getElementById('txt_dv').value = dv_cliente;
  
  var nombres_cliente = element.nombres;
  document.getElementById('txt_cliente_nombres').value = nombres_cliente;
  
  var apellidos_cliente = element.apellidos;
  document.getElementById('txt_cliente_apellidos').value = apellidos_cliente;
  
  var email_cliente = element.email;
  document.getElementById('txt_cliente_email').value = email_cliente;

  var celular_cliente = element.celular;
  document.getElementById('txt_cliente_celular').value = celular_cliente;

}

function actualizarCliente(){
  //Obtenemos el tipo de gestión que ingresa el usuario
    var dv_cliente = document.getElementById("txt_dv").value;
    var nombres_cliente = document.getElementById("txt_cliente_nombres").value;
    var apellidos_cliente = document.getElementById("txt_cliente_apellidos").value;
    var email_cliente = document.getElementById("txt_cliente_email").value;
    var celular_cliente = parseInt(document.getElementById("txt_cliente_celular").value);

    if (dv_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (nombres_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (apellidos_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (email_cliente === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (celular_cliente === ""|| isNaN(parseInt(celular))) {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  
    //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "dv": dv_cliente,
    "nombres": nombres_cliente,
    "apellidos": apellidos_cliente,
    "email": email_cliente,
    "celular": celular_cliente
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
  .then((response) => {
    if(response.status == 200){
      setTimeout(() => {
      location.href ="listar.html";
    }, 2000); 
      mostrarAlerta('danger', 'No se pudo actualizar la gestion.');
      
    }
    else if(response.status == 400) {
    }
      mostrarAlerta('success', 'Cliente actualizado exitosamente.');

  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
  function eliminarCliente(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/cliente/" + g_id_cliente, requestOptions)
  .then((response) => {
    if (response.status == 200) {
      setTimeout(() => {
        location.href = "listar.html";
      }, 2000);
      mostrarAlerta('success', 'Cliente eliminado exitosamente.'); 
    } else if (response.status == 400) {
      mostrarAlerta('danger', 'No se pudo actualizar la gestion.'); 
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

    }

    function obtenerFechaHora(){
      var fechaHoraActual = new Date();
      var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
        hour12 :false,
        year :'numeric',
        month :'2-digit',
        day:'2-digit',
        hour : '2-digit',
        minute :'2-digit',
        second : '2-digit'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fechaHoraFormateada;
    }
    function formatearFechaHora(fecha_registro){
      var fechaHoraActual = new Date(fecha_registro);
      var fechaHoraFormateada = fechaHoraActual.toLocaleString('es-ES',{
        hour12 :false,
        year :'numeric',
        month :'2-digit',
        day:'2-digit',
        hour : '2-digit',
        minute :'2-digit',
        second : '2-digit',
        timeZone:'UTC'
      }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
      return fechaHoraFormateada;
    }

    function mostrarAlerta(tipo, mensaje) {
      const alertContainer = document.getElementById('alert-container');
      alertContainer.innerHTML = `
          <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
              ${mensaje}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
      `;
    }
