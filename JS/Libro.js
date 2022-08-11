var UrlLibros = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=GetLibros';
var UrlInsertLibros = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=InsertLibro';

$(document).ready(function(){
    CargarLibros();
});

function CargarLibros(){
    $.ajax({
        url: UrlLibros, 
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i< MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].codigo_de_libro + '</td>'+
                '<td>'+ MiItems[i].nombre_libro + '</td>'+
                '<td>'+ MiItems[i].escritor_libro + '</td>'+
                '<td>'+ MiItems[i].fecha_publicacion + '</td>'+
                '<td>'+ MiItems[i].isbn + '</td>'+
                '<td>'+ MiItems[i].precio + '</td>'+
                '<td>'+ MiItems[i].editorial + '</td>'+  
            '</tr>';
            $('#DataLibros').html(Valores); 
            }
        }
    });
}

function AgregarLibro(){
    var datoslibros = {
        codigo_de_libro : $('#codigo_de_libro').val(), 
        nombre_libro : $('#nombre_libro').val(), 
        escritor_libro : $('#escritor_libro').val(),
        fecha_publicacion : $('#fecha_publicacion').val(),
        isbn : $('#isbn').val(),
        precio : $('#precio').val(),
        editorial : $('#editorial').val()
    };

    var datoslibrosjson = JSON.stringify(datoslibros);

    $.ajax({
        url: UrlInsertLibros,
        type: 'POST',
        data: datoslibrosjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Libro Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar el libro' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}