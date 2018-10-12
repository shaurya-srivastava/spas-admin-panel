$(document).ready(function(){
	$(".brand-logo").css({"height": "100%"});
	$('select').formSelect();
	$('#wait').hide();
	var mapServerIP = '192.168.232.45';
	//var mapServerIP = '10.254.102.245';
	var map = L.map('mapid').setView([1.358698, 103.838747], 12);
	var osm = L.tileLayer('http://'+mapServerIP+'/osm_tiles/{z}/{x}/{y}.png', {
		maxZoom: 18,
	}).addTo(map);
	drawnItems = L.featureGroup().addTo(map);

	$("#mapid").hide();
	$("#Chart").hide();
	var alertAreaLayer = [];
	function splitMutipleAreas(string){
		console.log(string);
		var areas = [[],[],[],[]];
		var comp = string.split("<br>");
		//console.log(comp);
		for (var i=0;i < comp.length-1;i++){
			//console.log(comp[i]);
			var firstchar = comp[i].indexOf("<");
			if (firstchar == "0"){
				//console.log(firstchar);
				var x = comp[i].substr(2,comp[i].indexOf(",")-2);
				var y = comp[i].substr(comp[i].indexOf(",")+1,comp[i].indexOf(")")-1-comp[i].indexOf(","));
				var radius = comp[i].substr(comp[i].indexOf(")")+2,comp[i].indexOf(">")-2-comp[i].indexOf(")"));
				areas[i].push("circle",x,y,radius);				
				//console.log(areas[0][1]);
			}else{
				var polygon = comp[i].substr(2,comp[i].indexOf("))")-2);
				console.log("Vertex:"+polygon);
				var vertices = polygon.split("),(");
				areas[i].push("polygon");
				for(var j=0; j< vertices.length;j++){
					areas[i].push(vertices[j]);
				}
			}
		}
		for (var j=0; j< areas.length -1; j++){
			for (var k=0; k< areas[j].length; k++){
				console.log(areas[j][k]);
			}
		}
		return areas;
	}

	$("form#inputForm").submit(function(){		
		var alertId = $('#alertId').val();
		if(alertId == "" ){
			$('div#alertId_div').append('<span id="invlaid_tooltip1" class="tooltiptext">Please enter the Alert ID</span>');	
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
							var alertId = $("#alertId").val();
							console.log(alertId);
							//Get the Campaign Message in #CampaignMessage
							$.ajax({
								url: "/cgi-bin/getCampaignMessageResult.pl/",
								type: "POST",
								data: "alertid="+alertId,
								success: function (result) {
									switch (result) {
										case true:
											break;
										default: 
											$("#CampaignMessage").show();
											$('div#CampaignMessage').html(result);
											$.ajax({
												url: "/cgi-bin/getCampaignAreaResult.pl/",
												type: "POST",
												data: "alertId="+alertId,
												success: function (result) {
													switch (result) {
														case true:
															break;
														default:
															var coords = splitMutipleAreas(result);
															$("#mapid").css({"height": $("#CampaignMessage").height()});
															$('#mapid').show();
															if (alertAreaLayer.length != 0){
																for(var i=0; i < alertAreaLayer.length; i++){
																	console.log(alertAreaLayer[i]);
																	map.removeLayer(alertAreaLayer[i]);
																}
															}
															for (var j=0; j < coords.length-1; j++){
																if (coords[j][0] == "circle"){
																	var x = coords[j][1];
																	var y = coords[j][2];
																	var radius = coords[j][3];
																	console.log("x: "+x);
																	console.log("y: "+y);
																	console.log("radius: "+radius);
																	//if (alertAreaLayer != undefined) {
																	//	alertAreaLayer.removeFrom(map);
																	//};
																	alertAreaLayer[j] = L.circle([x,y], {
																		color: 'red',
																		fillColor: '#f03',
																		fillOpacity: 0.5,
																		radius: radius
																	}).addTo(map);
																	map.panTo(alertAreaLayer[j].getLatLng());
																	console.log(alertAreaLayer[j]);
																}else{
																	//if (alertAreaLayer != undefined) {
																	//	alertAreaLayer.removeFrom(map);
																	//};
																	var polygonLatLng = [];
																	for(var k=1; k<coords[j].length; k++){
																		polygonLatLng.push(coords[j][k].split(",").map(Number));
																	}
																	console.log(polygonLatLng);
																	alertAreaLayer[j] = L.polygon(polygonLatLng, {
																		color: 'red',
																		fillColor: '#f03',
																		fillOpacity: 0.5,
																	}).addTo(map);																	
																}
															}															
													}
												},
												error: function (xhr, ajaxOptions, thrownError) {
													alert(xhr.status);
													alert(thrownError);
												}		
											});
									}
								},
								error: function (xhr, ajaxOptions, thrownError) {
									alert(xhr.status);
									alert(thrownError);
								}
							});
							console.log(alertAreaLayer);
							$('div#Result').html(perl_data);
							console.log(perl_data);
							/*var data = {
								labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
								series: [
								  [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
								  [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
								]
							  };
							  
							var options = {
							seriesBarDistance: 10
							};
							
							var responsiveOptions = [
								['screen and (max-width: 640px)', {
									seriesBarDistance: 5,
									axisX: {
									labelInterpolationFnc: function (value) {
										return value[0];
									}
									}
								}]
							];
							
							new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
							$("#Chart").show();
							$(".export").on('click', function (event) {
								// CSV
								exportTableToCSV.apply(this, [$('#Result>table'), 'export.csv']);
								// IF CSV, don't do event.preventDefault() or return false
								// We actually need this to be a typical hyperlink
							});*/			
			};
			console.log(params.data);
			$.ajax(params);
		}
		$('div#Result').fadeIn();
		return false;
	});
});