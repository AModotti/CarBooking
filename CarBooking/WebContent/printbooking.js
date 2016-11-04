$(document).ready(function() {
       
    $("#numero").attr("disabled", "disabled");
    $("#cognome").attr("disabled", "disabled");
    $("#nome").attr("disabled", "disabled");
    $("#destinazione").attr("disabled", "disabled");
    $("#motivo").attr("disabled", "disabled");
    $("#giorno").attr("disabled", "disabled");
    $("#daorario").attr("disabled", "disabled");
    $("#aorario").attr("disabled", "disabled");
    $("#veicolo").attr("disabled", "disabled");
    $("#targa").attr("disabled", "disabled");
    
    $('#indietro').click(function(){
        parent.history.back();
        return false;
    });
    
    $('#stampaprenotazione').click(function(){
        window.print();
    });
        
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
    
    GetSelectedBooking();
    
    function GetSelectedBooking(){
        var id = GetUrlParameter('Id');
        $.ajax({
        url: "GetSelectedBooking",
            dataType: "json",
            async: false,
            data:{id: id 
                 },
            success: function(data){
                $.each(data, function(key1, value1){
                    $.each(value1, function(key2, value2){
                        $("#numero").val(value2.numero);
                        $("#nome").val(value2.nome);
                        $("#cognome").val(value2.cognome);
                        $("#destinazione").val(value2.destinazione);
                        $("#motivo").val(value2.motivo);
                        $("#giorno").val(value2.giorno);
                        $("#daorario").val(value2.daorario);
                        $("#aorario").val(value2.aorario);
                        $("#veicolo").val(value2.veicolo);
                        $("#targa").val(value2.targa);
                     }); 
                });  
            }
        });
         
    };
    
});


