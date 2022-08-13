var UrlLibros = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=GetLibros';
var UrlInsertLibros = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=InsertLibro';
var UrlGetLibro = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=GetLibro';
var UrlUpdateLibro = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=UpdateLibro';
var UrlDeleteLibro = 'http://20.216.41.245:90/G3_20/controller/libro.php?opc=DeleteLibro';

$(document).ready(function () {
    CargarLibros();
});

function CargarLibros() {
    $.ajax({
        url: UrlLibros,
        type: 'GET',
        datatype: 'JSON',
        success: function (reponse) {
            var MiItems = reponse;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {
                Valores += '<tr>' +
                    '<td>' + MiItems[i].codigo_de_libro + '</td>' +
                    '<td>' + MiItems[i].nombre_libro + '</td>' +
                    '<td>' + MiItems[i].escritor_libro + '</td>' +
                    '<td>' + MiItems[i].fecha_publicacion + '</td>' +
                    '<td>' + MiItems[i].isbn + '</td>' +
                    '<td>' + MiItems[i].precio + '</td>' +
                    '<td>' + MiItems[i].editorial + '</td>' +
                    '<td>' +
                    '<button class="btn btn-info" onclick="CargarLibro(' + MiItems[i].codigo_de_libro + ')">Editar</button>' +
                    '</td>' +
                    '<td>' +
                    '<button class="btn btn-danger" onclick="EliminarLibro(' + MiItems[i].codigo_de_libro + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('#DataLibros').html(Valores);
            }
        }
    });
}

function AgregarLibro() {
    var datoslibros = {
        codigo_de_libro: $('#codigo_de_libro').val(),
        nombre_libro: $('#nombre_libro').val(),
        escritor_libro: $('#escritor_libro').val(),
        fecha_publicacion: $('#fecha_publicacion').val(),
        isbn: $('#isbn').val(),
        precio: $('#precio').val(),
        editorial: $('#editorial').val()
    };

    var datoslibrosjson = JSON.stringify(datoslibros);

    $.ajax({
        url: UrlInsertLibros,
        type: 'POST',
        data: datoslibrosjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse) {
            console.log(reponse);
            alert('Libro Agregado Correctamente');
        },
        error: function (textStatus, errorThrown) {
            alert('Error al agregar el libro' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarLibro(codlibro) {
    var datoslibro = {
        codigo_de_libro: codlibro
    };

    var datoslibrojson = JSON.stringify(datoslibro);

    $.ajax({
        url: UrlGetLibro,
        type: 'POST',
        data: datoslibrojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#codigo_de_libro').val(MiItems[0].codigo_de_libro);
            $('#nombre_libro').val(MiItems[0].nombre_libro);
            $('#escritor_libro').val(MiItems[0].escritor_libro);
            $('#fecha_publicacion').val(MiItems[0].fecha_publicacion);
            $('#isbn').val(MiItems[0].isbn);
            $('#precio').val(MiItems[0].precio);
            $('#editorial').val(MiItems[0].editorial);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarLibro(' + MiItems[0].codigo_de_libro + ')"' +
                'value="Actualizar Libro" class="btn btn-primary"></input>';
            $('#btnagregarlibro').html(btnactualizar);
        }
    });
}

function ActualizarLibro(codlibro) {
    var datoslibro = {
        codigo_de_libro: codlibro,
        nombre_libro: $('#nombre_libro').val(),
        escritor_libro: $('#escritor_libro').val(),
        fecha_publicacion: $('#fecha_publicacion').val(),
        isbn: $('#isbn').val(),
        precio: $('#precio').val(),
        editorial: $('#editorial').val()
    };
    var datoslibrojson = JSON.stringify(datoslibro);

    $.ajax({
        url: UrlUpdateLibro,
        type: 'PUT',
        data: datoslibrojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse) {
            console.log(reponse);
            alert("Libro Actualizado");
        },
        error: function (textStatus, errorThrown) {
            alert('Error al actualizar libro' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarLibro(codlibro) {
    var datosalibros = {
        codigo_de_libro: codlibro
    };
    var datosalibrosjson = JSON.stringify(datosalibros);

    $.ajax({
        url: UrlDeleteLibro,
        type: 'Delete',
        data: datosalibrosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse) {
            console.log(reponse);

        },
        error: function (textStatus, errorThrown) {
            alert('Error al eliminar libro' + textStatus + errorThrown);
        }

    });
    alert('Libro Eliminado');
    CargarLibros();
}