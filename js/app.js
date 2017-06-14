var api = {
    url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var cargarPagina = function(){
    cargarTareas();
    $("#add-form").submit(agregarTarea);
};

var $taskList = $("#tasks-list");

var cargarTareas = function(){ 
    $.getJSON(api.url,function(tareas){ 
        tareas.forEach(crearTarea);
    });
};

var crearTarea = function(tarea){
    var nombre = tarea.name;
    var estado = tarea.status[0];
    //Creacion de fila
    var $tr = $("<tr />");
    //Celda de nombre
    var $nombreTd= $("<td />");
    $nombreTd.text(nombre);
    //Celda de estado
    var $estadoTd= $("<td />");
    $estadoTd.text(estado);

    $tr.append($nombreTd).append($estadoTd);
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

$(document).ready(cargarPagina);