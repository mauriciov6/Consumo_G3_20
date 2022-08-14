var UrlAlquiler = 'http://20.216.41.245:90/G3_20/controller/alquiler.php?opc=get_alquileres';
var UrlInsertAlquiler = 'http://20.216.41.245:90/G3_20/controller/alquiler.php?opc=insert_alquiler';
var UrlGetAlquiler = 'http://20.216.41.245:90/G3_20/controller/alquiler.php?opc=get_alquiler';
var UrlActualizarAlquiler = 'http://20.216.41.245:90/G3_20/controller/alquiler.php?opc=update_alquiler';
var UrlEliminarAlquiler = 'http://20.216.41.245:90/G3_20/controller/alquiler.php?opc=delete_alquiler';

$(document).ready(function(){
    CargarAlquileres();
});

function CargarAlquileres(){
    $.ajax({
        url: UrlAlquiler, 
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].codigo_de_libro +'</td>'+
                '<td>'+ MiItems[i].nombre_libro +'</td>'+
                '<td>'+ MiItems[i].fecha_de_alquiler +'</td>'+
                '<td>'+ MiItems[i].nombre_cliente +'</td>'+
                '<td>'+ MiItems[i].direccion +'</td>'+
                '<td>'+ MiItems[i].dias_a_alquilar +'</td>'+
                '<td>'+ MiItems[i].precio_alquiler +'</td>'+  
                '<td>'+ 
                '<button class="btn btn-info" onclick="CargarAlquiler('+ MiItems[i].codigo_de_libro +')">Editar</button>'+
                '</td>'+
                '<td>'+ 
                '<button class="btn btn-danger" onclick="EliminarAlquiler('+ MiItems[i].codigo_de_libro +')">Eliminar</button>'+
                '</td>'+
                
            '</tr>';
            $('#DataAlquiler').html(Valores); 
            }
        }
    });
}

function AgregarAlquiler(){
    var datosalquiler = {
        codigo_de_libro : $('#codigo_de_libro').val(), 
        nombre_libro : $('#nombre_libro').val(), 
        fecha_de_alquiler : $('#fecha_de_alquiler').val(),
        nombre_cliente : $('#nombre_cliente').val(),
        direccion : $('#direccion').val(),
        dias_a_alquilar : $('#dias_a_alquilar').val(),
        precio_alquiler : $('#precio_alquiler').val()
    };
    var datosalquilerjson = JSON.stringify(datosalquiler);

    $.ajax({
        url: UrlInsertAlquiler,
        type: 'POST',
        data: datosalquilerjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Alquiler Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar el alquiler' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}
function CargarAlquiler(codigo_de_libro){
    var datosalquiler = {
        codigo_de_libro: codigo_de_libro
    };
    var datosalquilerjson = JSON.stringify(datosalquiler);

    $.ajax({
        url: UrlGetAlquiler, 
        type: 'POST',
        data: datosalquilerjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            var MiItems = reponse;
            $('#codigo_de_libro').val(MiItems[0].codigo_de_libro);
            $('#nombre_libro').val(MiItems[0].nombre_libro);
            $('#fecha_de_alquiler').val(MiItems[0].fecha_de_alquiler);
            $('#nombre_cliente').val(MiItems[0].nombre_cliente);
            $('#direccion').val(MiItems[0].direccion);
            $('#dias_a_alquilar').val(MiItems[0].dias_a_alquilar);
            $('#precio_alquiler').val(MiItems[0].precio_alquiler);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarAlquiler(' + MiItems[0].codigo_de_libro + ')"'+
           'value="Actualizar Alquiler" class="btn btn-primary"></input>';
           $('#btnagregaralquiler').html(btnactualizar);
        }
    });  
}

function ActualizarAlquiler(codigo_de_libro){
    var datosalquiler = {
        codigo_de_libro: codigo_de_libro,
        nombre_libro:$('#nombre_libro').val(),
        fecha_de_alquiler:$('#fecha_de_alquiler').val(),
        nombre_cliente:$('#nombre_cliente').val(),
        direccion:$('#direccion').val(),
        dias_a_alquilar:$('#dias_a_alquilar').val(),
        precio_alquiler:$('#precio_alquiler').val(),
    };
    var datosalquilerjson = JSON.stringify(datosalquiler);

    $.ajax({
        url: UrlActualizarAlquiler, 
        type: 'PuT',
        data: datosalquilerjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Alquiler Actualizado"); 
        },
        error: function(textStatus, errorThrown ){
            alert('Error al actualizar alquiler'+ textStatus + errorThrown);
        }
    });  
    alert('Aviso');
}

function EliminarAlquiler(codigo_de_libro){
    var datosalquiler = {
        codigo_de_libro: codigo_de_libro
    };
    var datosalquilerjson = JSON.stringify(datosalquiler);
    
    $.ajax({
        url: UrlEliminarAlquiler, 
        type: 'Delete',
        data: datosalquilerjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);

        },
        error: function(textStatus, errorThrown ){
            alert('Error al eliminar alquiler'+ textStatus + errorThrown);
        }

    });  
    alert('Alquiler Eliminado');
    CargarAlquileres();

}