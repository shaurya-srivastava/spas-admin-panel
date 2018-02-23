
$(document).ready(function(){
	$('select').material_select();
	$('#wait').hide();
	$('#whiteCard').hide();
	$('input[name="radio1"]').click(function(){
		if($(this).attr("value") == "hour"){
			$("#datepicker").hide();
		}else{
			$("#datepicker").show();
		}
	});	
	
	$('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 1,
            format: 'yyyy-mm-dd'
    });
	
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

	$("form#inputForm").submit(function(){
		var grepString = $('#grepString').val();
		var searchString = $('#string').val();
		var radio_selection = $('input[name="radio1"]:checked').val();
		var log_selection = $('select[name=selector]').val();
		var date = $('#datepicker').val();
		var startTime = $('#startTime').val();
		var endTime = $('#endTime').val();

		console.log(searchString);
		console.log(log_selection);
		console.log(radio_selection);
		console.log(date);
		if(log_selection == null){			
			$('div#select').append('<span id="invlaid_tooltip1" class="tooltiptext">Please select a field</span>');
			return false;
		}else{
			$('span#invlaid_tooltip1').remove();
		}
		if(radio_selection == "date" && (date=="" || startTime == "" || endTime == "" ) ){
			$('div#date').append('<span id="invlaid_tooltip2" class="tooltiptext">Please select Date and time range</span>');
			return false;
		}else{
			$('span#invlaid_tooltip2').remove();
		}
		if (true){
			var type, url, data, error, success;
			var params = {
				type: "POST",
				url: "/cgi-bin/getQueryResult.pl",
				beforeSend: function(){ $('#wait').show(); $('#whiteCard').show(); },
				complete: function(){ $('#wait').hide(); },
				cache: false,
				timeout: 30000
			}
			if (radio_selection == "hour"){
				params.data = "grepString_input=" + grepString + "&string_input="+ searchString + "&"+ log_selection + "&date_input=" + radio_selection + "&startTime_input=" + startTime + "&endTime_input=" + endTime;
			}else{
				params.data = "grepString_input=" + grepString + "&string_input="+ searchString + "&"+ log_selection + "&date_input=" + date + "&startTime_input=" + startTime + "&endTime_input=" + endTime;		
			}
			params.error = function(){
							$('div#jmlcm1Result').text("script call was not successful");
			};
			params.success = function(perl_data){
							$('div#Result').html(perl_data);
							$('.tooltipped').tooltip({delay: 50});	
							$(".export").on('click', function (event) {
								// CSV
								exportTableToCSV.apply(this, [$('#ResultTable'), 'export.csv']);
								// IF CSV, don't do event.preventDefault() or return false
								// We actually need this to be a typical hyperlink
							});		
			};
			console.log(params.data);
			$.ajax(params);

		}

		$('div#Result').fadeIn();
		return false;
		

	});

	function exportTableToCSV($table, filename) {

        var $headers = $table.find('tr:has(th)'), $rows = $table.find('tr:has(td)'),

            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"';
			// Grab text from table into CSV formatted string
			var csv = '"';
			csv += formatRows($headers.map(grabRow));
			csv += rowDelim;
			csv += formatRows($rows.map(grabRow)) + '"'; 
            
            // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
		function formatRows(rows){
            return rows.get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim);
		}
		function grabRow(i,row){
			var $row = $(row),
				$cols = $row.find('td');
				if(!$cols.length) $cols = $row.find('th');
				return $cols.map(grabCol)
					.get().join(tmpColDelim);
		}
		function grabCol(j,col){
			var $col = $(col),
				$text = $col.text();
				return $text.replace('"', '""');
		}

    }
	
});

