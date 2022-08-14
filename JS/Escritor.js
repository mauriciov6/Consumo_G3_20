var url_Escritores = 'http://20.216.41.245:90/G3_20/controller/Escritor.php?opc=GetEscritors';
var url_InsertarEscritor = 'http://20.216.41.245:90/G3_20/controller/Escritor.php?opc=InsertEscritor';
var url_GetEscritor = 'http://20.216.41.245:90/G3_20/controller/Escritor.php?opc=GetEscritor';
var url_UpdateEscritor = 'http://20.216.41.245:90/G3_20/controller/Escritor.php?opc=UpdateEscritor';
var url_DeleteEscritor = 'http://20.216.41.245:90/G3_20/controller/Escritor.php?opc=DeleteEscritor';

$(document).ready(function(){
    CargarEscritores();
});

function CargarEscritores(){
    $.ajax({
        url: url_Escritores,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';
            for (i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems [i].Numero_Escritor + '</td>'+
                '<td>'+ MiItems [i].Nombre_Escritor +'</td>'+
                '<td>'+ MiItems [i].Apellidos +'</td>'+
                '<td>'+ MiItems [i].Fecha_De_Nacimiento +'</td>'+
                '<td>'+ MiItems [i].Nacionalidad +'</td>'+
                '<td>'+ MiItems [i].Cantidad_Libros_Escritos +'</td>'+
                '<td>'+ MiItems [i].Email +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarEscritor('+ MiItems[i].Numero_Escritor +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarEscritor('+ MiItems[i].Numero_Escritor +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('#TablaEscritores').html(Valores); 
            }  
        }
    });
}

function AgregarEscritor(){
    var datosEscritor = {
        Numero_Escritor: $('#Numero_Escritor').val(),
        Nombre_Escritor: $('#Nombre_Escritor').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_De_Nacimiento: $('#Fecha_De_Nacimiento').val(),
        Nacionalidad: $('#Nacionalidad').val(),
        Cantidad_Libros_Escritos: $('#Cantidad_Libros_Escritos').val(),
        Email: $('#Email').val()
    };
    var datosescritorjson = JSON.stringify(datosEscritor);

    $.ajax({
        url: url_InsertarEscritor,
        type: 'POST',
        data: datosescritorjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Escritor Agregado Exitosamente');
        },
        error: function(textStatus,errorThrown){
            alert('Error al Agregar Escritor' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarEscritor(Numero_Escritor){
    var datosEscritor = {
        Numero_Escritor: Numero_Escritor
    };
    var datosescritorjson = JSON.stringify(datosEscritor);

    $.ajax({
        url:url_GetEscritor,
        type: 'POST',
        data: datosescritorjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
           var MiItems = reponse;
           $('#Numero_Escritor').val(MiItems[0].Numero_Escritor);
           $('#Nombre_Escritor').val(MiItems[0].Nombre_Escritor);
           $('#Apellidos').val(MiItems[0].Apellidos);
           $('#Fecha_De_Nacimiento').val(MiItems[0].Fecha_De_Nacimiento);
           $('#Nacionalidad').val(MiItems[0].Nacionalidad);
           $('#Cantidad_Libros_Escritos').val(MiItems[0].Cantidad_Libros_Escritos);
           $('#Email').val(MiItems[0].Email);
           var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarEscritor(' + MiItems[0].Numero_Escritor + ')"'+
           'value="Actualizar Escritor" class="btn btn-primary"></input>';
           $('#btnagregarescritor').html(btnactualizar);
        }
    });
}

function ActualizarEscritor(Numero_Escritor){
    var datosEscritor = {
        Numero_Escritor: Numero_Escritor,
        Nombre_Escritor:$('#Nombre_Escritor').val(),
        Apellidos:$('#Apellidos').val(),
        Fecha_De_Nacimiento:$('#Fecha_De_Nacimiento').val(),
        Nacionalidad:$('#Nacionalidad').val(),
        Cantidad_Libros_Escritos:$('#Cantidad_Libros_Escritos').val(),
        Email:$('#Email').val()
    };
    var datosescritorjson = JSON.stringify(datosEscritor);

    $.ajax({
        url: url_UpdateEscritor,
        type: 'PUT',
        data: datosescritorjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Escritor Actualizado");
        },
        error: function(textStatus,errorThrown){
            alert('Error al Actualizar Escritor' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarEscritor(Numero_Escritor){
    var datosEscritor = {
        Numero_Escritor: Numero_Escritor
    };
    var datosescritorjson = JSON.stringify(datosEscritor);

    $.ajax({
       url: url_DeleteEscritor,
       type: 'DELETE',
       data: datosescritorjson,
       datatype: 'JSON',
       contentType: 'application/json',
       success: function (reponse){
        console.log(reponse);
       
       },
       error: function(textStatus,errorThrown){
        alert('Error al Eliminar Escritor' + textStatus + errorThrown);
       }
    });
    alert("Escritor Eliminado");
    CargarEscritores();
}

