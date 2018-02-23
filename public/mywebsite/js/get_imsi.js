$(document).ready(function(){
	$('.time').keyup(function() {
		if (/\D/g.test(this.value)){
			// Filter non-digits from input value.
			this.value = this.value.replace(/\D/g, '');
		}
		//var foo = $(this).val(); // remove hyphens
		//$(this).val(this.value);
	});
	

	$("form#inputForm").submit(function(){
		var imsi = $('#imsi').val();
		var msisdn = $('#msisdn').val();
		
		if (true){
			if (imsi == "" && msisdn == ""){
				$('div#select').append('<span id="invlaid_tooltip1" class="tooltiptextleft">Please enter IMSI or MSISDN</span>');
				return false;
			}
			var type, url, data, error, success;
			var params = {
				type: "POST",
				url: "/cgi-bin/getIMSIQueryResult.pl",
				cache: false,
				timeout: 30000
			}
			if (imsi){

					params.data = "imsi_input=" + imsi;
					params.error = function(){$('div#imsiTomsisdnResult').text("script call was not successful");};
					params.success =  function(perl_data){
						console.log(perl_data);
						$('#msisdnToimsiResult').html(perl_data);
					};
					//$.ajax(params);
	
			}else if(msisdn){
				//If the User searches for the last hour
				params.data = "msisdn_input=" + msisdn;
				params.error = function(){
							$('div#msisdnToimsiResult').text("script call was not successful");
				};
				params.success =  function(perl_data){
							console.log(perl_data);
							$('#imsiTomsisdnResult').html(perl_data);
				};
					
			}
			console.log(params.data);
			$.ajax(params);

		}
		$('div#msisdnResult').fadeIn();
		return false;

	});


	var type, url, data, error, success;
	var params = {
		type: "POST",
		url: "/cgi-bin/getIMSIQueryResult.pl",
		cache: false,
		timeout: 30000
	}
	$.ajax(params);
	$('div#DashboardResult').fadeIn();
	return false;
		
});

