var UrlEditorial = 'http://20.216.41.245:90/G3_20/controller/editorial.php?opc=GetEditoriales';
var UrlInsertEditorial = 'http://20.216.41.245:90/G3_20/controller/editorial.php?opc=InsertEditorial';
var UrlGetEditorial = 'http://20.216.41.245:90/G3_20/controller/editorial.php?opc=GetEditorial';
var UrlActualizarEditorial = 'http://20.216.41.245:90/G3_20/controller/editorial.php?opc=UpdateEditorial';
var UrlEliminarEditorial = 'http://20.216.41.245:90/G3_20/controller/editorial.php?opc=DeleteEditorial';

$(document).ready(function(){
    CargarEditoriales();
});

function CargarEditoriales(){
    $.ajax({
        url: UrlEditorial, 
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].numero_editorial +'</td>'+
                '<td>'+ MiItems[i].nombre_editorial +'</td>'+
                '<td>'+ MiItems[i].direccion +'</td>'+
                '<td>'+ MiItems[i].pais +'</td>'+
                '<td>'+ MiItems[i].fecha_de_fundacion +'</td>'+
                '<td>'+ MiItems[i].cantidad_de_libros_impresos +'</td>'+
                '<td>'+ MiItems[i].numero_de_telefono +'</td>'+  
                '<td>'+ 
                '<button class="btn btn-info" onclick="CargarEditorial('+ MiItems[i].numero_editorial +')">Editar</button>'+
                '</td>'+
                '<td>'+ 
                '<button class="btn btn-danger" onclick="EliminarEditorial('+ MiItems[i].numero_editorial +')">Eliminar</button>'+
                '</td>'+
                
            '</tr>';
            $('#DataEditorial').html(Valores); 
            }
        }
    });
}

function AgregarEditorial(){
    var datoseditorial = {
        numero_editorial : $('#numero_editorial').val(), 
        nombre_editorial : $('#nombre_editorial').val(), 
        direccion : $('#direccion').val(),
        pais : $('#pais').val(),
        fecha_de_fundacion : $('#fecha_de_fundacion').val(),
        cantidad_de_libros_impresos : $('#cantidad_de_libros_impresos').val(),
        numero_de_telefono : $('#numero_de_telefono').val()
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlInsertEditorial,
        type: 'POST',
        data: datoseditorialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Editorial Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar el editorial' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}
function CargarEditorial(numero_editorial){
    var datoseditorial = {
        numero_editorial: numero_editorial
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlGetEditorial, 
        type: 'POST',
        data: datoseditorialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            var MiItems = reponse;
            $('#numero_editorial').val(MiItems[0].numero_editorial);
            $('#nombre_editorial').val(MiItems[0].nombre_editorial);
            $('#direccion').val(MiItems[0].direccion);
            $('#pais').val(MiItems[0].pais);
            $('#fecha_de_fundacion').val(MiItems[0].fecha_de_fundacion);
            $('#cantidad_de_libros_impresos').val(MiItems[0].cantidad_de_libros_impresos);
            $('#numero_de_telefono').val(MiItems[0].numero_de_telefono);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarEditorial(' + MiItems[0].numero_editorial + ')"'+
           'value="Actualizar Editorial" class="btn btn-primary"></input>';
           $('#btnagregareditorial').html(btnactualizar);
        }
    });  
}

function ActualizarEditorial(numero_editorial){
    var datoseditorial = {
        numero_editorial: numero_editorial,
        nombre_editorial:$('#nombre_editorial').val(),
        direccion:$('#direccion').val(),
        pais:$('#pais').val(),
        fecha_de_fundacion:$('#fecha_de_fundacion').val(),
        cantidad_de_libros_impresos:$('#cantidad_de_libros_impresos').val(),
        numero_de_telefono:$('#numero_de_telefono').val(),
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlActualizarEditorial, 
        type: 'PuT',
        data: datoseditorialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Editorial Actualizado"); 
        },
        error: function(textStatus, errorThrown ){
            alert('Error al actualizar editorial'+ textStatus + errorThrown);
        }
    });  
    alert('Aviso');
}

function EliminarEditorial(numero_editorial){
    var datoseditorial = {
        numero_editorial: numero_editorial
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);
    
    $.ajax({
        url: UrlEliminarEditorial, 
        type: 'Delete',
        data: datoseditorialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);

        },
        error: function(textStatus, errorThrown ){
            alert('Error al eliminar editorial'+ textStatus + errorThrown);
        }

    });  
    alert('Editorial Eliminado');
    CargarEditoriales();

}