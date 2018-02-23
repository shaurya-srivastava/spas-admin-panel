
$(document).ready(function(){
	$('.time').keyup(function() {
		if (/\D/g.test(this.value)){
			// Filter non-digits from input value.
			this.value = this.value.replace(/\D/g, '');
		}
		var foo = $(this).val().split(":").join(""); // remove hyphens
		if (foo.length > 0 && foo.length < 5) {
			foo = foo.match(new RegExp('.{1,2}', 'g')).join(":");
		}else{

		}
		$(this).val(foo);
	});
	//setTimeout(function() {
	//	window.location.href = 'http://user:user@10.254.99.61/cgi-bin/logout.cgi'; 
	//	console.log("timeout");
	//}, 3000);
	$('select').material_select();
	$('#wait').hide();
	var today = new Date();
	//var olddate = new Date();
	//olddate.setDate(olddate.getDate() - 7);
	//var olddate2 = olddate.getFullYear()+'-'+(olddate.getMonth()+1)+'-'+olddate.getDate();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	//$('#startdate_input').attr('data-value','olddate2');
	$('#enddate_input').attr('data-value','date');
	console.log(date);
	$('.datepicker').pickadate({
            selectMonths: true,
            selectYears: true,
            format: 'yyyy-mm-dd',
			min: new Date(2017,01,01)
    });

	$("form#inputForm").submit(function(){
		
		var startdate = $('#startdate_input').val();
		var enddate = $('#enddate_input').val();

		//console.log(startDate, startTime, endDate, endTime);
		console.log(startdate);
		console.log(enddate);
		
		if(startdate == "" && enddate == ""){
			//$('div#select1').attr("style", "background-color: #FFCCCC; -webkit-transition: opacity 3s ease-in-out; opacity: 1;");
			$('div#startdate_div').append('<span id="invlaid_tooltip1" class="tooltiptext">Please enter the Start Date</span>');
			$('div#enddate_div').append('<span id="invlaid_tooltip2" class="tooltiptext">Please enter the End Date</span>');
			return false;
		}else if(startdate == ""){
			$('div#startdate_div').append('<span id="invlaid_tooltip1" class="tooltiptext">Please enter the Start Date</span>');
			$('span#invlaid_tooltip2').remove();
			return false;
		}else if (enddate == ""){
			$('div#enddate_div').append('<span id="invlaid_tooltip2" class="tooltiptext">Please enter the End Date</span>');
			$('span#invlaid_tooltip1').remove();
			return false;
		}else{
			$('span#invlaid_tooltip1').remove();
			$('span#invlaid_tooltip2').remove();
		}

		
		if (true){
			var type, url, data, error, success;
			var params = {
				type: "POST",
				url: "/cgi-bin/getSMSResult.pl",
				beforeSend: function(){ $('#wait').show(); $('#whiteCard').show(); },
				complete: function(){ $('#wait').hide(); },
				cache: false,
				timeout: 30000
			}				
			params.data = "startdate=" + startdate + "&enddate=" + enddate;
			params.error = function(){
							$('div#Result').text("script call was not successful");
			};
			params.success = function(perl_data){
							$('div#Result').html(perl_data);
							var table = $('#sms').DataTable({
								lengthChange: false,
								buttons: [ 'excel' ]
							});
							table.buttons().container()
							.appendTo( '#sms_wrapper .small-6.columns:eq(0)' );
							$('.button.small.buttons-excel.buttons-html5').addClass('btn');

			};
			console.log(params.data);
			$.ajax(params);

		}
		$('div#Result').fadeIn();
		return false;
	});

});

