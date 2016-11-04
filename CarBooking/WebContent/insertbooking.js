$(document).ready(function() {
    
    $("#cognome").focus();
    
    $('#div-back').click(function () {
        window.location = 'index.html';
    });
       
    $('#visualizzaprenotazioni').click(function() {
        var dagiorno = $("#dagiorno").val();
        var agiorno = $("#agiorno").val();
        window.open('viewactualdateinsertbooking.html?dagiorno=' + dagiorno + '&agiorno=' + agiorno,'viewactualdateinsertbooking','width=1024px,height=400px');
    });
    
    $("#dagiorno").change(function () {
        var checkdatemessage = checkDate();
        if(checkdatemessage !== ''){
            alert(checkdatemessage);
        } 
    });
    
    $("#agiorno").change(function () {
        var checkdatemessage = checkDate();
        if(checkdatemessage !== ''){
            alert(checkdatemessage);
        } 
    });
    
    $("#daorario").change(function () {
        var checktimesmessage = checkTimes();
        if(checktimesmessage !== ''){
            alert(checktimesmessage);
        } 
    });
    
    $("#aorario").change(function () {
        var checktimesmessage = checkTimes();
        if(checktimesmessage !== ''){
            alert(checktimesmessage);
        } 
    });
    
    $("#salvaprenotazione").click(function(){
        var checkdatemessage = checkDate();
        if(checkdatemessage !== ''){
            alert(checkdatemessage);
        }else{
            var checktimesmessage = checkTimes();
            if(checktimesmessage !== ''){
                alert(checktimesmessage);
            }else{
                validateForm();
                if ($("#insertbookingform").valid()){
                    var checkifexistsbookingmessage = checkIfExistsBooking();
                    if(checkifexistsbookingmessage === ''){
                        var nome = $("#nome").val();
                        var cognome = $("#cognome").val();
                        var destinazione = $("#destinazione").val();
                        var motivo = $("#motivo").val();
                        var dagiorno = $("#dagiorno").val();
                        var agiorno = $("#agiorno").val();
                        var daorario = $("#daorario").val();
                        var aorario = $("#aorario").val();
                        var tuttoilgiorno = '0';
                        if($("#tuttoilgiorno").is(':checked')){
                            tuttoilgiorno = '1';
                        }else{
                            tuttoilgiorno = '0';
                        }
                        var veicolo = $("#veicolo option:selected").text();
                        var Insertbookingmessage = '';
                        $.ajax({
                            url: "InsertBooking",
                            dataType: "json",
                            async: false,
                            data:{
                                  nome: nome,
                                  cognome: cognome,
                                  destinazione : destinazione,
                                  motivo : motivo,
                                  dagiorno: dagiorno,
                                  agiorno: agiorno,
                                  daorario : daorario,
                                  aorario : aorario, 
                                  tuttoilgiorno: tuttoilgiorno,
                                  veicolo: veicolo
                                 },
                            success: function(data){
                                Insertbookingmessage = data.message;
                            },
                            error:function(error){
                                Insertbookingmessage = error.responseText;
                            }
                        });
                        alert(Insertbookingmessage);
                        $("#nome").val('');
                        $("#cognome").val('');
                        $("#destinazione").val('');
                        $("#motivo").val('');
                        $("#dagiorno").val('');
                        $("#agiorno").val('');
                        $("#daorario").removeAttr('disabled');
                        $("#aorario").removeAttr('disabled');
                        $("#daorario").val('');
                        $("#aorario").val('');
                        $("#veicolo").val('');
                        $('#tuttoilgiorno').attr('checked', false);
                        $('#accettazione').attr('checked', false);
                    }else{  
                        alert(checkifexistsbookingmessage);    
                    }
                }
            }
        }
    });
    
    function validateForm(){        
        $("#insertbookingform").validate({
            rules: {
                cognome: "required",
                nome: "required",
                destinazione: "required",
                motivo: "required",
                dagiorno: "required",
                agiorno: "required",
                daorario: "required",
                aorario: "required",
                veicolo: "required",
                accettazione: "required"
            },
            messages: {
                cognome: "&nbsp* Campo obbligatorio.",
                nome: "&nbsp* Campo obbligatorio.",
                destinazione: "&nbsp* Campo obbligatorio.",
                motivo: "&nbsp* Campo obbligatorio.",
                dagiorno: "&nbsp* Campo obbligatorio.",
                agiorno: "&nbsp* Campo obbligatorio.",
                daorario: "&nbsp* Campo obbligatorio.",
                aorario: "&nbsp* Campo obbligatorio.",
                veicolo: "&nbsp* Campo obbligatorio.",
                accettazione: "&nbsp* E' necessario accettare l'informativa."
            },
            highlight: function(element) {
                $(element).closest('.control-group').addClass('error');
            },
            unhighlight: function(element) {
                $(element).closest('.control-group').removeClass('error');
            },
            submitHandler: function(form) {
                form.submit();
            }
        });
    };
        
    function checkIfExistsBooking(){
        var checkifexistsbookingmessage = '';
        var veicolo = $("#veicolo option:selected").text();
        var dagiorno = $("#dagiorno").val();
        var agiorno = $("#agiorno").val();
        var daorario = $("#daorario").val();
        var aorario = $("#aorario").val();
        var tuttoilgiorno = '0';
        if($("#tuttoilgiorno").is(':checked')){
            tuttoilgiorno = '1';
        }else{
            tuttoilgiorno = '0';
        }
        $.ajax({
            url: "CheckIfExistsBooking",
            dataType: "json",
            async: false,
            data:{
                  veicolo: veicolo,
                  dagiorno: dagiorno,
                  agiorno: agiorno,
                  daorario : daorario,
                  aorario : aorario,
                  tuttoilgiorno: tuttoilgiorno
                 },
            success: function(data){
                checkifexistsbookingmessage = data.message;
            },
            error:function(error){
                checkifexistsbookingmessage = error.responseText;
            }
        });
        return checkifexistsbookingmessage;
    };
    
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

    $('#dagiorno').datepicker();
    
    $('#agiorno').datepicker();
    
    $('#div-showbooking').hide();
        
    loadDataOnFromTimeListbox();
    loadDataOnToTimeListbox();
    loadDataOnCarsListbox();
    
    $("#tuttoilgiorno").click(manageTimeListbox);
    
    $('#notainformativa').load("disclaimer.txt");
               
    function manageTimeListbox(){
        if(this.checked){
            $('#daorario').attr('disabled', 'disabled');
            $('#aorario').attr('disabled', 'disabled');
        }else{
            $('#daorario').removeAttr('disabled');
            $('#aorario').removeAttr('disabled');
        }
    };
            
    function loadDataOnFromTimeListbox(){
        $('#daorario').append("<option ></option>");
        $.ajax({
            url: "times.json",
            dataType: "json",
            async: false,
            success: function(data){
                $.each(data, function(key1, value1){
                    $("#daorario").append("<option>" + value1.ora + " </option>");
                });
            }
        });
        
    };
    
    function loadDataOnToTimeListbox(){
        $('#aorario').append("<option ></option>");
        $.ajax({
            url: "times.json",
            dataType: "json",
            async: false,
            success: function(data){
                $.each(data, function(key1, value1){
                    $("#aorario").append("<option>" + value1.ora  + " </option>");
                });
            }
        });
        
    };

    $('#destinazione').autocomplete({
        minLength: 3,
        source: function(request,response){
            var destinazione = $("#destinazione").val();
            $.ajax({
                url: "GetTown",
                dataType: "json",
                async: false,
                data:{destinazione: destinazione
                 },
                success: function(data){
                    response(data.nome); 
                }
            });
        }
    });
      
    function loadDataOnCarsListbox(){
        $("#veicolo").append("<option></option>");
        $.ajax({
            url: "GetCars",
            dataType: "json",
            async: false,
            success: function(data){
                $.each(data, function(key1, value1){
                    $.each(value1, function(key2, value2){
                        $("#veicolo").append("<option value=" + value2.plate + ">" + value2.nome + " - " + value2.plate + " - [ " + value2.sito +  " ]" + "</option>");
                    });
                });
            }
        });
    };
           
    function checkTimes(){
        var checktimesmessage = '';
        var daorario = $("#daorario").val();
        var aorario = $("#aorario").val();
        var daorariominuti = (parseInt(daorario.substring(0,2))*60)+(parseInt(daorario.substring(3,5)));
        var aorariominuti = (parseInt(aorario.substring(0,2))*60)+(parseInt(aorario.substring(3,5)));
        if(daorariominuti > aorariominuti){
            checktimesmessage = 'Attenzione orari non temporalmente coerenti.';
        };
        if(aorariominuti < daorariominuti){
            checktimesmessage = 'Attenzione orari non temporalmente coerenti.';
        };
        return checktimesmessage;
    };
    
    function checkDate(){
        var checkdatemessage = '';
        var dagiorno = new Date($("#dagiorno").datepicker('getDate'));
        var agiorno = new Date($("#agiorno").datepicker('getDate'));
        var now = new Date();
        
        var daday = dagiorno.getDate();
        var damonth = dagiorno.getMonth() + 1;
        var dayear = dagiorno.getFullYear();
        
        var aday = agiorno.getDate();
        var amonth = agiorno.getMonth() + 1;
        var ayear = agiorno.getFullYear();
        
        var nowday = now.getDate();
        var nowmonth = now.getMonth() + 1;
        var nowyear = now.getFullYear();
               
        dagiorno = new Date(dayear + "-" + damonth + "-" + daday);
        agiorno = new Date(ayear + "-" + amonth + "-" + aday);
        
        now = new Date(nowyear + "-" + nowmonth + "-" + nowday);
        
        if(dagiorno < now){
            checkdatemessage = 'Attenzione: non è possibile effettuare una prenotazione avente data antecedente a quella odierna.';
        };
        return checkdatemessage;
    };
        
});
