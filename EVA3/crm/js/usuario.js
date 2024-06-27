var g_id_usuario ="";

//Función para agregar tipo de gestión
function agregarUsuario(){
//Obtenemos el tipo de gestión que ingresa el usuario
var dv_usuario = document.getElementById("txt_dv").value;
var nombres_usuario = document.getElementById("txt_usuario_nombres").value;
var apellidos_usuario = document.getElementById("txt_usuario_apellidos").value;
var email_usuario = document.getElementById("txt_usuario_email").value;
var celular_usuario = parseInt(document.getElementById("txt_usuario_celular").value);
var username_usuario = document.getElementById("txt_usuario_username").value;

if (dv_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (nombres_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (apellidos_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (email_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (celular_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (username_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (password_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }

//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "id_usuario": 1190,
  "dv": dv_usuario,
  "nombres": nombres_usuario,
  "apellidos": apellidos_usuario,
  "email": email_usuario,
  "celular": celular_usuario,
  "username": username_usuario,
  "password": "",
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
fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
    .then((response) => {
      //Por hacer: Usar componentes de bootstrap para gestionar éxito o error
    if(response.status == 200) {
      setTimeout(() => {
        location.href = "listar.html";
    }, 2000); 
        mostrarAlerta('danger', 'Solicitud incorrecta. Por favor, revise los datos.');
    }
    else if(response.status == 400) {
    }
        mostrarAlerta('success', 'Usuario agregado exitosamente.');

    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    }
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
`<tr>
<td>${element.id_usuario}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);

}
function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var id_usuario = element.id_usuario;
  document.getElementById('lbl_eliminar').innerHTML ="Desea eliminar <b>" + id_usuario + "</b>";


}
function completarFormulario(element,index,arr){
  
  var dv_usuario = element.dv;
  document.getElementById('txt_dv').value = dv_usuario;
  
  var nombres_usuario = element.nombres;
  document.getElementById('txt_usuario_nombres').value = nombres_usuario;
  
  var apellidos_usuario = element.apellidos;
  document.getElementById('txt_usuario_apellidos').value = apellidos_usuario;
  
  var email_usuario = element.email;
  document.getElementById('txt_usuario_email').value = email_usuario;

  var celular_usuario = element.celular;
  document.getElementById('txt_usuario_celular').value = celular_usuario;

  var username_usuario = element.username;
  document.getElementById('txt_usuario_username').value = username_usuario;


}

function actualizarUsuario(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  var dv_usuario = document.getElementById("txt_dv").value;
  var nombres_usuario = document.getElementById("txt_usuario_nombres").value;
  var apellidos_usuario = document.getElementById("txt_usuario_apellidos").value;
  var email_usuario = document.getElementById("txt_usuario_email").value;
  var celular_usuario = parseInt(document.getElementById("txt_usuario_celular").value);
  var username_usuario = document.getElementById("txt_usuario_username").value;
  var password_usuario = document.getElementById("txt_usuario_password").value;

  if (dv_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (nombres_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (apellidos_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (email_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (celular_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (username_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }
  if (password_usuario.trim() === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
  }

  
    //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
  "dv": dv_usuario,
  "nombres": nombres_usuario,
  "apellidos": apellidos_usuario,
  "email": email_usuario,
  "celular": celular_usuario,
  "username": username_usuario,
  "password": password_usuario,
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
      .then((response) => {
        if(response.status == 200){
          setTimeout(() => {
          location.href ="listar.html";
        }, 2000); 
          mostrarAlerta('danger', 'No se pudo actualizar la gestion.');
          
        }
        else if(response.status == 400) {
        }
          mostrarAlerta('success', 'Usuario actualizado exitosamente.');

      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    }
  function eliminarUsuario(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
      .then((response) => {
        if(response.status == 200){
          setTimeout(() => {
          location.href ="listar.html";
        }, 2000); 
          mostrarAlerta('danger', 'No se pudo actualizar la gestion.');
          
        }
        else if(response.status == 400) {
        }
          mostrarAlerta('success', 'Usuario eliminado exitosamente.');
    
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
