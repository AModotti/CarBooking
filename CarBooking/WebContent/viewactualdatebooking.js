$(document).ready(function() {
    
    function GetUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                       sURLVariables = sPageURL.split('&'),
                       sParameterName,
                       i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    
    GetActualDateBooking();
    
    function GetActualDateBooking(){
        var giorno = GetUrlParameter('giorno');
        $.ajax({
        url: "GetActualDateBooking",
            dataType: "json",
            async: false,
            data:{giorno: giorno
                 },
            success: function(data){
                var row = '';
                $.each(data, function(key1, value1){
                    $.each(value1, function(key2, value2){
                        row += ('<tr><td align="center">' +
                                    value2.id + '</td><td align="center">' +
                                    value2.data + '</td><td>' + 
                                    value2.veicolo + '</td><td align="center">' +
                                    value2.targa + '</td><td>' +
                                    value2.nome + '</td><td>' +
                                    value2.cognome + '</td><td align="center">' +
                                    value2.orainizio + '</td><td align="center">' +
                                    value2.orafine + '</td><td align="center">' + 
                                    '<input type="button" id="eliminaprenotazione" class="eliminaprenotazione" value="Elimina"/>' +
                                '</td></tr>');
                    });
                    $('#table-showbooking').append(row);
                    $('.eliminaprenotazione').bind("click", DeleteBooking);
                    $("tr:odd").css("background-color","whyte");
                    $("tr:even").css("background-color","lightgray");
                });
            }
        });
    };
    
    function DeleteBooking(){
        if(confirm('Sei sicuro di voler cancellare la prenotazione?')){
                var message;
                var par = $(this).parent().parent();
                var id = ($(this).closest('tr').find('td:eq(0)').text());
                $.ajax({
                url: "DeleteSelectedBooking",
                    dataType: "json",
                    async: false,
                    data:{id: id
                         },
                    success: function(data){
                        message = data.message;
                    },
                    error:function(error){
                        message = error.responseText;
                    }
                });
            par.remove();
            alert(message);
        };
    };
    
    function RemoveActualDateBooking(){
        $('#table-showbooking > tbody').remove();
    };
    
});


