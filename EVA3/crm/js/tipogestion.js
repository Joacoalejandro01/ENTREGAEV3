var g_id_tipo_gestion ="";

//Función para agregar tipo de gestión
function agregarTipoGestion(){
//Obtenemos el tipo de gestión que ingresa el usuario
var nombre_tipo_gestion = document.getElementById("txt_nombre").value;

if (nombre_tipo_gestion === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
}
  
//Encabezado de la solicitud
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var fechaHoraActual = obtenerFechaHora();

//Carga útil de datos
const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
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
fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
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
        mostrarAlerta('success', 'Tipo Gestión agregada exitosamente.');

    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    }
function listarTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_tipo_gestion').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro);

  arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML +=
`<tr>
<td>${element.id_tipo_gestion}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning'>Actualizar</a> 
<a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger'>Eliminar</a> 
</td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);

}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString  = window.location.search;
  //obtenemos todos los parámetros
  const parametros = new URLSearchParams(queryString);
  //Nos posicionamos sobre un parámetro y obtenemos su valor actual
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);

}
function obtenerDatosEliminar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function obtenerDatosActualizar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

}
function completarEtiqueta(element,index,arr){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar el tipo de gestión? <b>" + nombre_tipo_gestion + "</b>";


}
function completarFormulario(element,index,arr){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('txt_nombre').value = nombre_tipo_gestion;

}

function actualizarTipoGestion(){
  //Obtenemos el tipo de gestión que ingresa el usuario
  var nombre_tipo_gestion = document.getElementById("txt_nombre").value;

  if (nombre_tipo_gestion === "") {
    mostrarAlerta('danger', 'Ingrese un dato correcto. Por favor, revise los datos.');
    return;
}
  //Encabezado de la solicitud
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //Carga útil de datos
  const raw = JSON.stringify({
    "nombre_tipo_gestion": nombre_tipo_gestion
  });
  
  //Opciones de solicitud
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
  .then((response) => {
    if(response.status == 200){
      setTimeout(() => {
      location.href ="listar.html";
    }, 2000); 
      mostrarAlerta('danger', 'No se pudo actualizar la gestion.');
      
    }
    else if(response.status == 400) {
    }
      mostrarAlerta('success', 'Tipo Gestión actualizada exitosamente.');

  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
  function eliminarTipoGestion(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    //Opciones de solicitud
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };
    
    //Ejecutamos solicitud
    fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
      .then((response) => {
        if(response.status == 200){
          setTimeout(() => {
          location.href ="listar.html";
        }, 2000); 
          mostrarAlerta('danger', 'No se pudo actualizar la gestion.');
          
        }
        else if(response.status == 400) {
        }
          mostrarAlerta('success', 'Tipo Gestión eliminada exitosamente.');
    
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
