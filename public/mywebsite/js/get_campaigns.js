
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
	$(".brand-logo").css({"height": "100%"});
	$('select').formSelect();
	$('#wait').hide();
	
	$('.datepicker').datepicker();
	var elem = document.querySelector('.datepicker');
	var instance = M.Datepicker.init(elem, {
		format: 'yyyy-mm-dd',
		min: new Date(2017,01,01),
		showClearBtn: true
	});
	
	
	$("form#inputForm").submit(function(){
		var status = $('select[name=selectorStatus]').val();
		var mode = $('select[name=selectorMode]').val();
		var type = $('select[name=selectorType]').val();
		var date = $('#date_input').val();
		
		//console.log(startDate, startTime, endDate, endTime);
		console.log(status);
		console.log(mode);
		console.log(type);

		if(status == null){
			//$('div#select1').attr("style", "background-color: #FFCCCC; -webkit-transition: opacity 3s ease-in-out; opacity: 1;");
			$('div#selectStatus').append('<span id="invlaid_tooltip1" class="tooltiptext">Please select a field</span>');
			return false;
		}else{
			$('span#invlaid_tooltip1').remove();
		}

		if (status == "all_past"){
			if (date == ""){
				$('div#date_div').append('<span id="invlaid_tooltip3" class="tooltiptext">Please enter the date!</span>');				
				return false;
			}else{
				$('span#invlaid_tooltip3').remove();
			}
		}

		if (true){
			var type, url, data, error, success;
			var params = {
				type: "POST",
				url: "/cgi-bin/getCampaignResult.1.pl",
				beforeSend: function(){ $('#wait').show(); $('#whiteCard').show(); },
				complete: function(){ $('#wait').hide(); },
				cache: false,
				timeout: 30000
			}				
			params.data = "status=" + status + "&mode=" + mode + "&type=" + type + "&date=" + date;
			params.error = function(){
							$('div#Result').text("script call was not successful");
			};
			params.success = function(perl_data){
							$('div#Result').html(perl_data);
							var table = $('#example2').DataTable({
								lengthChange: false,
								buttons: [ 'excel' ]
							});
							table.buttons().container()
							.appendTo( '#example2_wrapper .small-6.columns:eq(0)' );
							$('.button.small.buttons-excel.buttons-html5').addClass('btn');
							//$('.paginate_button.current').addClass('active');
			};
			console.log(params.data);
			$.ajax(params);
			$('div#Result').fadeIn();
		}
		return false;
	});

});

