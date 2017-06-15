
var api = {
    url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var cargarPagina = function(){
    cargarTareas();
    $("#add-form").submit(agregarTarea);
    $(document).on('click', '.eliminar', eliminaRecurso);
    $(document).on('click', '.obtenerInfo', infoRecurso);
};

var $taskList = $("#tasks-list");

var cargarTareas = function(){ 
    $.getJSON(api.url,function(tareas){ 
        tareas.forEach(crearTarea);
    });
};

var plantillaBotones = '<button class="glyphicon glyphicon glyphicon-zoom-in obtenerInfo" aria-hidden="true" data-id="__id__" data-target="#modalDatos" data-toggle="modal"></button>' + '<button class="glyphicon glyphicon glyphicon-pencil" aria-hidden="true"></button>' +
  '<button class="glyphicon glyphicon glyphicon-trash eliminar" aria-hidden="true" data-id="__id__"></button>';

var plantilla = "";

var crearTarea = function(tarea){
    var nombre = tarea.name;
    var estado = tarea.status[0];
   
    plantilla = plantillaBotones.replace("__id__", tarea._id)
    .replace("__id__", tarea._id);
    //Creacion de fila
    var $tr = $("<tr />");
    //Celda de nombre
    var $nombreTd= $("<td />");
    $nombreTd.text(nombre);
    //Celda de estado
    var $estadoTd= $("<td />");
    $estadoTd.text(estado);
    var $eliminar = $("<td />").html(plantilla);
    $tr.append($nombreTd).append($estadoTd).append($eliminar);
    $taskList.append($tr);
    
};

var agregarTarea = function(e) {
    e.preventDefault();
    var nombre = $("#nombre-tarea").val();
    $.post(api.url, {
        name: nombre
    }, function(tarea){
        crearTarea(tarea);
        $("#myModal").modal("hide");
        
    });
};

var eliminaRecurso = function(){        
    jQuery.ajax({
        url: api.url + $(this).data('id'),
        type: 'DELETE',
        success: function(msj) {
            $taskList.html(""); //Limpiar pantalla 
            cargarTareas();  //Volver a cargar los tasks
        }
    });    
};

var infoRecurso = function(){
    $.getJSON(api.url + $(this).data('id'),function(tarea){ 
        $("#nombreTarea").text(tarea.name);
        $("#estadoTarea").text(tarea.status[0]);
        $("#fechaTarea").text(tarea.created_at);
    });
};

$(document).ready(cargarPagina);