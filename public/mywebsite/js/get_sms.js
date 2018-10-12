$(document).ready(function(){
	$(".brand-logo").css({"height": "100%"});
	$('select').formSelect();
	$('#wait').hide();

	$('#startdate_input').datepicker();
	$('#enddate_input').datepicker();
	var elem = document.querySelector('#startdate_input');
	var elem2 = document.querySelector('#enddate_input');
	var instance = M.Datepicker.init(elem, {
		format: 'yyyy-mm-dd',
		min: new Date(2017,01,01),
		showClearBtn: true
	});
	var instance2 = M.Datepicker.init(elem2, {
		format: 'yyyy-mm-dd',
		min: new Date(2017,01,01),
		showClearBtn: true
	});
	instance2.setDate(new Date());

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

