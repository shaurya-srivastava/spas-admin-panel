
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
	
	$('.datepicker').pickadate({
            selectMonths: true,
            selectYears: true,
            format: 'yyyy-mm-dd',
			min: new Date(2015,01,01)
    });

	$("form#inputForm").submit(function(){
		var alertId = $('#alertId').val();
		//console.log(startDate, startTime, endDate, endTime);
		if(alertId == "" ){
			//$('div#select1').attr("style", "background-color: #FFCCCC; -webkit-transition: opacity 3s ease-in-out; opacity: 1;");
			$('div#alertId_div').append('<span id="invlaid_tooltip1" class="tooltiptext">Please enter the Start Date</span>');	
			return false;
		}else{
			$('span#invlaid_tooltip1').remove();
		}

		
		if (true){
			var type, url, data, error, success;
			var params = {
				type: "POST",
				url: "/cgi-bin/getSMSStats.pl",
				beforeSend: function(){ $('#wait').show(); $('#whiteCard').show(); },
				complete: function(){ $('#wait').hide(); },
				cache: false,
				timeout: 30000
			}				
			params.data = "alertId=" + alertId;
			params.error = function(){
							$('div#Result').text("script call was not successful");
			};
			params.success = function(perl_data){
							$('div#Result').html(perl_data);
							$(".export").on('click', function (event) {
								// CSV
								exportTableToCSV.apply(this, [$('#Result>table'), 'export.csv']);
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

