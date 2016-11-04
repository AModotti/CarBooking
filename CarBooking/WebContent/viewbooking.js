$(document).ready(function () {

    $('#div-showbooking').hide();
        
    $('#div-back').click(function () {
        window.location = 'index.html';
    });

    $.datepicker.regional['it'] = {
        closeText: 'Chiudi',
        currentText: 'Oggi',
        monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',   'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
        monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
        dayNames: ['Domenica','Luned&#236','Marted&#236','Mercoled&#236','Gioved&#236','Venerd&#236','Sabato'],
        dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
        dayNamesMin: ['Do','Lu','Ma','Me','Gio','Ve','Sa'],
        dateFormat: 'dd/mm/yy'
    };

    $.datepicker.setDefaults($.datepicker.regional['it']);

    $('#giorno').datepicker();

    $('#visualizzaprenotazionigiorno').click(function () {
        GetDayBooking();
        $('#div-showbooking').show();
    });

    $('#visualizzaprenotazionisettimana').click(function () {
        GetWeekBooking();
        $('#div-showbooking').show();
    });

    $('#visualizzaprenotazionimese').click(function () {
        GetMonthBooking();
        $('#div-showbooking').show();
    });

    $("#esportaexcel").click(function (e) {
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('#div-showbooking').html()));
        e.preventDefault();
    });

    function GetDayBooking() {
        var giorno = $('#giorno').val();
        $.ajax({
            url: "GetDayBooking",
            dataType: "json",
            async: false,
            data: {giorno: giorno
            },
            success: function (data) {
                $('#table-showbooking > thead').remove();
                $('#table-showbooking > tbody').remove();
                var header = '<thead>'
                        + '<tr>'
                        + '<th id="th-giorno">GIORNO</th>'
                        + '<th id="th-data">DATA</th>'
                        + '<th id="th-veicolo">VEICOLO</th>'
                        + '<th id="th-targa">TARGA</th>'
                        + '<th id="th-nome">NOME</th>'
                        + '<th id="th-cognome">COGNOME</th>'
                        + '<th id="th-dalleore">DALLE</th>'
                        + '<th id="th-alleore">ALLE</th>'
                        + '<th id="th-id">PREN.</th>'
                        + '<th id="th-azione">AZIONE</th>'
                        + '</tr>'
                        + '</thead>';
                $('#table-showbooking').append(header);
                var row = '<tbody>';
                $.each(data, function (key1, value1) {
                    $.each(value1, function (key2, value2) {
                        row += ('<tr><td align="center">' +
                                value2.giorno + '</td><td>' +
                                value2.data + '</td><td>' +
                                value2.veicolo + '</td><td align="center">' +
                                value2.targa + '</td><td class="tooltip" title="Destinazione : ' + value2.destinazione + ' &#xA;Motivo : ' + value2.motivo + '">' +
                                value2.nome + '</td><td class="tooltip" title="Destinazione : ' + value2.destinazione + ' &#xA;Motivo : ' + value2.motivo + '">' +
                                value2.cognome + '</td><td align="center">' +
                                value2.orainizio + '</td><td align="center">' +
                                value2.orafine + '</td><td class="id" align="center">' + 
                                value2.id + '</td><td align="center">' +
                                '<input type="button" id="stampaprenotazione" class="stampaprenotazione" value="Stampa"/>' +
                                '</td></tr>');
                    });
                    $('#table-showbooking').append(row);
                });
                row = '</tbody>';
                GroupTable($('#table-showbooking tr:has(td)'), 0, 7);
                $('#table-showbooking .deleted').remove();
                $('#table-showbooking td[data-rowspan]').each(function () {
                    $(this).attr('rowspan', $(this).attr('data-rowspan'));
                });
                $('.stampaprenotazione').click(function() {
                	var id = ($(this).closest('tr').find('td.id').text());
                    window.location = 'printbooking.html?Id=' + id;
                });
                $("tr:odd").css("background-color", "whyte");
                $("tr:even").css("background-color", "lightgray");        
            }
        });
    };

    function GetWeekBooking() {
        var giorno = $('#giorno').val();
        $.ajax({
            url: "GetWeekBooking",
            dataType: "json",
            async: false,
            data: {giorno: giorno
            },
            success: function (data) {
                $('#table-showbooking > thead').remove();
                $('#table-showbooking > tbody').remove();
                var header = '<thead>'
                        + '<tr>'
                        + '<th id="th-settimana">SETT.</th>'
                        + '<th id="th-giorno">GIORNO</th>'
                        + '<th id="th-data">DATA</th>'
                        + '<th id="th-veicolo">VEICOLO</th>'
                        + '<th id="th-targa">TARGA</th>'
                        + '<th id="th-nome">NOME</th>'
                        + '<th id="th-cognome">COGNOME</th>'
                        + '<th id="th-dalleore">DALLE</th>'
                        + '<th id="th-alleore">ALLE</th>'
                        + '<th id="th-id">PREN.</th>'
                        + '<th id="th-azione">AZIONE</th>'
                        + '</tr>'
                        + '</thead>';
                $('#table-showbooking').append(header);
                var row = '<tbody>';
                $.each(data, function (key1, value1) {
                    $.each(value1, function (key2, value2) {
                        row += ('<tr><td align="center">' +
                                value2.settimana + '</td><td align="center">' +
                                value2.giorno + '</td><td align="center">' +
                                value2.data + '</td><td>' +
                                value2.veicolo + '</td><td align="center"">' +
                                value2.targa + '</td><td class="tooltip" title="Destinazione : ' + value2.destinazione + ' &#xA;Motivo : ' + value2.motivo + '">' +
                                value2.nome + '</td><td class="tooltip" title="Destinazione : ' + value2.destinazione + ' &#xA;Motivo : ' + value2.motivo + '">' +
                                value2.cognome + '</td><td align="center">' +
                                value2.orainizio + '</td><td align="center">' +
                                value2.orafine + '</td><td class="id" align="center">' + 
                                value2.id + '</td><td align="center">' +
                                '<input type="button" id="stampaprenotazione" class="stampaprenotazione" value="Stampa"/>' +
                                '</td></tr>');
                    });
                    $('#table-showbooking').append(row);
                });
                row = '</tbody>';
                GroupTable($('#table-showbooking tr:has(td)'), 0, 8);
                $('#table-showbooking .deleted').remove();
                $('#table-showbooking td[data-rowspan]').each(function () {
                    $(this).attr('rowspan', $(this).attr('data-rowspan'));
                });
                $('.stampaprenotazione').click(function() {
                	var id = ($(this).closest('tr').find('td.id').text());
                    window.location = 'printbooking.html?Id=' + id;
                });
                $("tr:odd").css("background-color", "whyte");
                $("tr:even").css("background-color", "lightgray");
            }
        });
    };

    function GetMonthBooking() {
        var giorno = $('#giorno').val();
        $.ajax({
            url: "GetMonthBooking",
            dataType: "json",
            async: false,
            data: {giorno: giorno
            },
            success: function (data) {
                $('#table-showbooking > thead').remove();
                $('#table-showbooking > tbody').remove();
                var header = '<thead>'
                        + '<tr>'
                        + '<th id="th-mese">MESE</th>'
                        + '<th id="th-settimana">SETT.</th>'
                        + '<th id="th-giorno">GIORNO</th>'
                        + '<th id="th-data">DATA</th>'
                        + '<th id="th-veicolo">VEICOLO</th>'
                        + '<th id="th-targa">TARGA</th>'
                        + '<th id="th-nome">NOME</th>'
                        + '<th id="th-cognome">COGNOME</th>'
                        + '<th id="th-dalleore">DALLE</th>'
                        + '<th id="th-alleore">ALLE</th>'
                        + '<th id="th-id">PREN.</th>'
                        + '<th id="th-azione">AZIONE</th>'
                        + '</tr>'
                        + '</thead>';
                $('#table-showbooking').append(header);
                var row = '<tbody>';
                $.each(data, function (key1, value1) {
                    $.each(value1, function (key2, value2) {
                        row += ('<tr><td align="center">' +
                                value2.mese + '</td><td align="center">' +
                                value2.settimana + '</td><td align="center">' +
                                value2.giorno + '</td><td align="center">' +
                                value2.data + '</td><td>' +
                                value2.veicolo + '</td><td align="center">' +
                                value2.targa + '</td><td class="tooltip" title="Destinazione : ' + value2.destinazione + ' &#xA;Motivo : ' + value2.motivo + '">' +
                                value2.nome + '</td><td class="tooltip" title="Destinazione : ' + value2.destinazione + ' &#xA;Motivo : ' + value2.motivo + '">' +
                                value2.cognome + '</td><td align="center">' +
                                value2.orainizio + '</td><td align="center">' +
                                value2.orafine + '</td><td class="id" align="center">' + 
                                value2.id + '</td><td align="center">' +
                                '<input type="button" id="stampaprenotazione" class="stampaprenotazione" value="Stampa"/>' +
                                '</td></tr>');
                    });
                    $('#table-showbooking').append(row);
                });
                row = '</tbody>';
                GroupTable($('#table-showbooking tr:has(td)'), 0, 9);
                $('#table-showbooking .deleted').remove();
                $('#table-showbooking td[data-rowspan]').each(function(){
                    $(this).attr('rowspan', $(this).attr('data-rowspan'));
                });
                $('.stampaprenotazione').click(function() {
                	var id = ($(this).closest('tr').find('td.id').text());
                    window.location = 'printbooking.html?Id=' + id;
                });
                $("tr:odd").css("background-color", "whyte");
                $("tr:even").css("background-color", "lightgray");
            }
        });
    };

    function GroupTable($rows, startIndex, total) {
        if (total === 0) {
            return;
        }
        var i, currentIndex = startIndex, count = 1, lst = [];
        var tds = $rows.find('td:eq(' + currentIndex + ')');
        var ctrl = $(tds[0]);
        lst.push($rows[0]);
        for (i = 1; i <= tds.length; i++) {
            if (ctrl.text() === $(tds[i]).text()) {
                count++;
                $(tds[i]).addClass('deleted');
                lst.push($rows[i]);
            }
            else {
                if (count > 1) {
                    ctrl.attr('rowspan', count);
                    GroupTable($(lst), startIndex + 1, total - 1);
                }
                count = 1;
                lst = [];
                ctrl = $(tds[i]);
                lst.push($rows[i]);
            }
        }
    };

});
