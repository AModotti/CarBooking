$(document).ready(function() {
    
    $("#cognome").focus();
    
    $("#numero").attr("disabled", "disabled");
    
    $('#div-back').click(function () {
        parent.history.back();
	return false;
    });
    
    $("#giorno").change(function () {
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
     
    $('#visualizzaprenotazioni').click(function() {
        var giorno = $("#giorno").val();
        window.open('viewactualdatebooking.html?giorno=' + giorno ,'viewactualdatebooking','width=1024px,height=400px');
    });
    
    $("#salvaprenotazione").click(function(){
        var checktimesmessage = checkTimes();
        if(checktimesmessage !== ''){
            alert(checktimesmessage);
        }else{
            validateForm();
            if ($("#updatebookingform").valid()){
                var checkiftimeismodifyed = checkIfTimeIsModifyed();
                if(checkiftimeismodifyed === '1'){
                    var checkdatemessage = checkDate();
                    if(checkdatemessage !== ''){
                        alert(checkdatemessage);
                    }else{
                        var checkifexistsbookingmessage = checkIfExistsBooking();
                        if(checkifexistsbookingmessage === ''){
                            var numero = $("#numero").val();
                            var nome = $("#nome").val();
                            var cognome = $("#cognome").val();
                            var destinazione = $("#destinazione").val();
                            var motivo = $("#motivo").val();
                            var giorno = $("#giorno").val();
                            var daorario = $("#daorario").val();
                            var aorario = $("#aorario").val();
                            var tuttoilgiorno = '0';
                            if($("#tuttoilgiorno").is(':checked')){
                                tuttoilgiorno = '1';
                            }else{
                                tuttoilgiorno = '0';
                            }
                            var veicolo = $("#veicolo option:selected").text();
                            var updatebookingmessage = '';
                            $.ajax({
                                url: "UpdateBooking",
                                dataType: "json",
                                async: false,
                                data:{
                                      numero: numero,
                                      nome: nome,
                                      cognome: cognome,
                                      destinazione : destinazione,
                                      motivo : motivo,
                                      giorno: giorno,
                                      daorario : daorario,
                                      aorario : aorario, 
                                      tuttoilgiorno: tuttoilgiorno,
                                      veicolo: veicolo
                                     },
                                success: function(data){
                                    updatebookingmessage = data.message;
                                },
                                error:function(error){
                                    updatebookingmessage = error.responseText;
                                }
                            });
                            alert(updatebookingmessage);
                        }else{  
                            alert(checkifexistsbookingmessage);    
                        }
                    }
                }else{
                    var numero = $("#numero").val();
                    var nome = $("#nome").val();
                    var cognome = $("#cognome").val();
                    var destinazione = $("#destinazione").val();
                    var motivo = $("#motivo").val();
                    var giorno = $("#giorno").val();
                    var daorario = $("#daorario").val();
                    var aorario = $("#aorario").val();
                    var tuttoilgiorno = '0';
                    if($("#tuttoilgiorno").is(':checked')){
                        tuttoilgiorno = '1';
                    }else{
                        tuttoilgiorno = '0';
                    }
                    var veicolo = $("#veicolo option:selected").text();
                    var updatebookingmessage = '';
                    $.ajax({
                        url: "UpdateBooking",
                        dataType: "json",
                        async: false,
                        data:{
                              numero: numero,
                              nome: nome,
                              cognome: cognome,
                              destinazione : destinazione,
                              motivo : motivo,
                              giorno: giorno,
                              daorario : daorario,
                              aorario : aorario, 
                              tuttoilgiorno: tuttoilgiorno,
                              veicolo: veicolo
                             },
                        success: function(data){
                            updatebookingmessage = data.message;
                        },
                        error:function(error){
                            updatebookingmessage = error.responseText;
                        }
                    });
                    alert(updatebookingmessage);
                }    
            }
        }   
    });
    
    function validateForm(){        
        $("#updatebookingform").validate({
            rules: {
                cognome: "required",
                nome: "required",
                destinazione: "required",
                motivo: "required",
                giorno: "required",
                daorario: "required",
                aorario: "required",
                veicolo: "required"
            },
            messages: {
                cognome: "&nbsp* Campo obbligatorio.",
                nome: "&nbsp* Campo obbligatorio.",
                destinazione: "&nbsp* Campo obbligatorio.",
                motivo: "&nbsp* Campo obbligatorio.",
                giorno: "&nbsp* Campo obbligatorio.",
                daorario: "&nbsp* Campo obbligatorio.",
                aorario: "&nbsp* Campo obbligatorio.",
                veicolo: "&nbsp* Campo obbligatorio."
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
    
    $('#div-showbooking').hide();
        
    loadDataOnFromTimeListbox();
    loadDataOnToTimeListbox();
    loadDataOnCarsListbox();
    GetSelectedBooking();
    
    $("#tuttoilgiorno").click(manageTimeListbox);
    
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
                        $("#veicolo").val(value2.targa);
                     }); 
                });  
            }
        });
         
    };
    
    function checkIfExistsBooking(){
        var checkifexistsbookingmessage = '';
        var numero = $("#numero").val();
        var veicolo = $("#veicolo option:selected").text();
        var giorno = $("#giorno").val();
        var daorario = $("#daorario").val();
        var aorario = $("#aorario").val();
        var tuttoilgiorno = '0';
        if($("#tuttoilgiorno").is(':checked')){
            tuttoilgiorno = '1';
        }else{
            tuttoilgiorno = '0';
        }
        $.ajax({
            url: "CheckIfExistsBookingInUpdate",
            dataType: "json",
            async: false,
            data:{
                  numero : numero, 
                  veicolo: veicolo,
                  giorno: giorno,
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
   
    function checkIfTimeIsModifyed(){
        var checkiftimeismodifyedmessage = '';
        var numero = $("#numero").val();
        var giorno = $("#giorno").val();
        var daorario = $("#daorario").val();
        var aorario = $("#aorario").val();
        var veicolo = $("#veicolo option:selected").text();
        var tuttoilgiorno = '0';
        if($("#tuttoilgiorno").is(':checked')){
            tuttoilgiorno = '1';
        }else{
            tuttoilgiorno = '0';
        }
        $.ajax({
            url: "CheckIfTimeIsModifyed",
            dataType: "json",
            async: false,
            data:{
                  numero : numero, 
                  giorno : giorno,
                  daorario : daorario,
                  aorario : aorario,
                  tuttoilgiorno : tuttoilgiorno,
                  veicolo : veicolo
                 },
            success: function(data){
                checkiftimeismodifyedmessage = data.message;
            },
            error:function(error){
                checkiftimeismodifyedmessage = error.responseText;
            }
        });
        return checkiftimeismodifyedmessage;
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
        var giorno = new Date($("#giorno").datepicker('getDate'));
        var now = new Date();
        
        var pday = giorno.getDate();
        var pmonth = giorno.getMonth() + 1;
        var pyear = giorno.getFullYear();
        
        var nday = now.getDate();
        var nmonth = now.getMonth() + 1;
        var nyear = now.getFullYear();
               
        giorno = new Date(pyear + "-" + pmonth + "-" + pday);
        now = new Date(nyear + "-" + nmonth + "-" + nday);
        
        if(giorno < now){
            checkdatemessage = 'Attenzione non è possibile effettuare una prenotazione avente data antecedente a quella odierna.';
        };
        return checkdatemessage;
    };
    
});


