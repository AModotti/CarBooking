$(document).ready(function() {
        
	var password;
	
    $("#id").attr("disabled", "disabled");
    
    $('#div-back').click(function () {
    	location.href = 'vehicles.html';
	return false;
    });
    
    loadpassword();
        
    function loadpassword(){
        $.ajax({
            url: "password.json",
            dataType: "json",
            async: false,
            success: function(data){
                $.each(data, function(key1, value1){
                    password = value1.password;
                });
            }
        });
        
    };
    
    $("#salvamodifiche").click(function(){
    	validateForm();
        if ($("#managevehiclesform").valid()){
        	if ($("#password").val() == password){
	            var id = $("#id").val();
	            var azienda = $("#azienda").val();
	            var veicolo = $("#veicolo").val();
	            var targa = $("#targa").val();
	            var stato = $("#stato").val();
	            var sito = $("#sito").val();
	            var telepass = $("#telepass").val();
	            var viacard = $("#viacard").val();
	            var cartacarburante = $("#cartacarburante").val();
	            var updatebookingmessage = '';
	            $.ajax({
	                url: "UpdateSelectedVehicle",
	                dataType: "json",
	                async: false,
	                data:{
	                	  id : id,
	                	  azienda : azienda,
	                	  veicolo : veicolo,
	                	  targa : targa,
	                	  stato : stato,
	                	  sito: sito,
	                	  telepass: telepass,
	                	  viacard: viacard,
	                	  cartacarburante: cartacarburante
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
        		alert('Password non corretta modifiche non apportate.');
        	}
 
        }  
    });
    
    function validateForm(){  
        $("#managevehiclesform").validate({
            rules: {
                azienda: "required",
                veicolo: "required",
                targa: "required",
                stato: "required",
                sito: "required"
            },
            messages: {
            	azienda: "&nbsp* Campo obbligatorio.",
            	veicolo: "&nbsp* Campo obbligatorio.",
            	targa: "&nbsp* Campo obbligatorio.",
            	stato: "&nbsp* Campo obbligatorio.",
            	sito: "&nbsp* Campo obbligatorio."
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
    
    GetSelectedVehicle();
        
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
    
    function GetSelectedVehicle(){
        var id = GetUrlParameter('Id');
        $.ajax({
        url: "GetSelectedVehicle",
            dataType: "json",
            async: false,
            data:{id: id 
                 },
            success: function(data){
                $.each(data, function(key1, value1){
                    $.each(value1, function(key2, value2){
                        $("#id").val(value2.id);
                        $("#azienda").val(value2.azienda);
                        $("#veicolo").val(value2.veicolo);
                        $("#targa").val(value2.targa);
                        $("#stato").val(value2.stato);
                        $("#sito").val(value2.sito);
                        $("#telepass").val(value2.telepass);
                        $("#viacard").val(value2.viacard);
                        $("#cartacarburante").val(value2.cartacarburante);
                     }); 
                });  
            }
        });
         
    };
    
});


