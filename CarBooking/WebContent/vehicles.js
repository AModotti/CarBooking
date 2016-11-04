$(document).ready(function() {
    
    $('#div-back').click(function () {
        window.location = 'index.html';
    });

    GetVehicles();

    function GetVehicles(){
        $.ajax({
        url: "GetVehicles",
            dataType: "json",
            async: false,
            data:{
                 },
            success: function(data){
            	$('#table-showvehicles > thead').remove();
                $('#table-showvehicles > tbody').remove();
                var header = '<thead>'
                        + '<tr>'
                        + '<th id="th-id">ID</th>'
                        + '<th id="th-azienda">AZIENDA</th>'
                        + '<th id="th-veicolo">VEICOLO</th>'
                        + '<th id="th-targa">TARGA</th>'
                        + '<th id="th-sito">SITO</th>'
                        + '<th id="th-stato">STATO</th>'
                        + '<th id="th-telepass">TELEPASS</th>'
                        + '<th id="th-viacard">VIACARD</th>'
                        + '<th id="th-cartacarburante">CARTA CARBURANTE</th>'
                        + '<th id="th-azione">AZIONE</th>'
                        + '</tr>'
                        + '</thead>';
                $('#table-showvehicles').append(header);
                var row = '<tbody>';
                $.each(data, function(key1, value1){
                    $.each(value1, function(key2, value2){
                        if(value2.stato === '1'){
                            value2.stato = '<b><font color="green">ATTIVO</font></b>'; 
                        }else{
                            value2.stato = '<b><font color="red">INATTIVO</font></b>';
                        }
                        row += ('<tr><td class="id" align="center">' +
                        		value2.id + '</td><td>' +
                                value2.azienda + '</td><td>' + 
                                value2.veicolo + '</td><td  align="center" cellpadding="10">' +
                                value2.targa + '</td><td>' +
                                value2.sito + '</td><td align="center">' +
                                value2.stato + '</td><td align="center">' +
                                value2.telepass + '</td><td align="center">' +
                                value2.viacard + '</td><td align="center">' +
                                value2.catacarburanti + '</td><td align="center">' +
                                '<input type="button" id="gestione" class="modifica" value="Modifica"/>' +
                        		'</td></tr>');
                    });
                    $('#table-showvehicles').append(row);
                    $('.modifica').click(function() {
                    	var id = ($(this).closest('tr').find('td.id').text());
                        window.location = 'managevehicles.html?Id=' + id;
                    });
                    $("tr:odd").css("background-color","whyte");
                    $("tr:even").css("background-color","lightgray");
                });
            }
        });
    }

});

