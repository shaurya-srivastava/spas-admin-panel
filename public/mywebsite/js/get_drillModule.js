$(document).ready(function(){
	//console.log(whitelistJson);
	var preCountAreaThreshold = 20000;
	var maxPreCountattempts = 10;
	var current_user = $('#current_user').text();
	$('select').formSelect();
	$('.tabs').tabs();
	$('.tooltipped').tooltip();
	$('#wait').hide();
	$("#Result").hide();
	// create the editor
	$('.modal').modal();
	$(".brand-logo").css({"height": "100%"});
	var elem = document.querySelector('.modal');
	var instance = M.Modal.init(elem, options);
	var container = document.getElementById("jsoneditor");
	var options = {
		schema: {
			"title": "createAlert schema",
    		"type": "object",
			"properties": {
				"msisdns": {
					"type": "array",
					"minItems": 1,
					"maxItems": 32,
            		"uniqueItems": true	
				}
			}
		},
		navigationBar: false,
		onEditable: function(node){
			switch (node.field){
				case 'mode':
					return {field: false, value: false};
				case 'msg':
					return {field: false, value: false};
				case 'msgType':
					return {field: false, value: false};
				case 'isLive':
					return {field: false, value: false};
				case 'drill':
					return {field: false, value: false};
				case 'userID':
					return {field: false, value: false};
				case 'userRole':
					return {field: false, value: false};
				default:
					return {field: false, value: true};
			}
			switch (node.value){
				case '':
					return true;
				default:
					return true;
			}
		}
	};
	var editor = new JSONEditor(container, options);
	// set json
	var json = {
		"String": "Please select command from the drop down menu!"
	};
	editor.set(json);
	// get json
	var json = editor.get();

	// create the editor
	var container2 = document.getElementById("jsoneditor2");
	var options2 = {
			mode: 'view', 
			navigationBar: false,
	};
	var editor2 = new JSONEditor(container2, options2);

	// set json
	var json2 = {};
	editor2.set(json2);
	
	var areaDrawn = {};
	var firstAreaDrawn = {};
	var alertAreaLayer;
	var createdAlertId;
	document.getElementById("selectorCommand").onchange = function() {
		var status = $('select[name=selectorCommand]').val();
		console.log(status);
		$("#jsoneditor").show();
		$("#jsoneditor2").show();
		$("#Result").hide();
		var json2 = {};
		editor2.set(json2);
		//Remove the area drawn by the AreaID form submit
		if (alertAreaLayer != undefined) {
			alertAreaLayer.removeFrom(map);
		};
		map.setView([1.358698, 103.838747], 12);
		if (status == "preCounting"){
			var json = {
				"circles" : [
				  {
					"radius" : '',
					"center" : {
					  "latitude" : '',
					  "longitude" : ''
					}
				  }
				],
			   "userID" : "sat",
			   "userRole": "sat"
			};
		}else if (status == "createAlert Adhoc"){
			var startDate = getStartDate();
			var expiry = getExpiry();
			$('.jsoneditor-tree').siblings('select').addClass('browser-default');
			var json = {
				"mode": 0,
				  "startTime": startDate,
				  "msg": "This is an application test. If you are not a trial user, please ignore this message!",
				  "msgType": 0,
				  "isLive": true,
				  "expiry": expiry,
				  "drill": true,
				  "priority": 0,
				  "whitelist": 1,
				  "subType" : 2,
				  "userID" : "sat",
				  "userRole": "sat"
			};
		}else if (status == "createAlert On-demand"){
			var startDate = getStartDate();
			var expiry = getExpiry();
			$('.jsoneditor-tree').siblings('select').addClass('browser-default');
			var json = {
				"mode": 1,
				  "startTime": startDate,
				  "msg": "This is an application test. If you are not a trial user, please ignore this message!",
				  "msgType": 0,
				  "isLive": true,
				  "expiry": expiry,
				  "drill": true,
				  "iteration": 1,
				  "interval": 10,
				  "refresh": false,
				  "resend": false,
				  "priority": 0,
				  "whitelist": 1,
				  "subType" : 2,
				  "userID" : "sat",
				  "userRole": "sat"
			};
		}else if (status == "createAlert Periodic"){
			var startDate = getStartDate();
			var expiry = getExpiry();
			$('.jsoneditor-tree').siblings('select').addClass('browser-default');
			var json = {
				"mode": 2,
				  "startTime": startDate,
				  "msg": "This is an application test. If you are not a trial user, please ignore this message!",
				  "msgType": 0,
				  "isLive": true,
				  "expiry": expiry,
				  "drill": true,
				  "iteration": 1,
   				  "interval": 10,
   				  "refresh": false,
   				  "resend": false,
				  "priority": 0,
				  "whitelist": 1,
				  "subType" : 2,
				  "userID" : "sat",
				  "userRole": "sat"
			};
		}else if (status == "addCircle"){
			var json = {
				"alertID": 1082,
				"radius": 51,
				"center": {
					"latitude" : 1.314272,
					"longitude" : 103.933141
				 },
				 "userID": "sat",
				 "userRole": "sat"
			};
		}else if (status == "addPolygon"){
			var json = {
				"alertID": 9,
				"coordinates": [
					{ "latitude" : 1.33333,
					"longitude" : 103.888888 },
					{ "latitude" : 1.33334,
					"longitude" : 103.888889 },
					{ "latitude" : 1.33335,
					"longitude" : 103.8888990 }
				],
				"userID": "sat",
				"userRole": "sat"
			};
		}else if (status == "addWhitelist"){
			drawnItems.removeLayer(firstAreaDrawn);
			drawnItems.removeLayer(areaDrawn);
			var json = {
				"alertID": 1081,
				"msisdns": [
					  "6584305740",
					  "6586797628"
				   ],
				"userID": "sat",
				"userRole": "sat"
			};
		}else if (status == "alertStart"){
			drawnItems.removeLayer(firstAreaDrawn);
			drawnItems.removeLayer(areaDrawn);
			if (createdAlertId == null){
				alert("No campaign created! Please create a Campaign.");
				var json = {};
			}else{
				var json = {
					"alertID": createdAlertId,
					"userID": "sat",
					"userRole": "sat"
				};
			}
		}else if (status == "alertStop"){
			drawnItems.removeLayer(firstAreaDrawn);
			drawnItems.removeLayer(areaDrawn);
			if (createdAlertId == null){
				alert("No campaign created! Please create a Campaign.");
				var json = {};
			}else{
				var json = {
					"alertID": createdAlertId,
					"userID": "sat",
					"userRole": "sat"
				};
			}
		}else if (status == "alertStatus"){
			drawnItems.removeLayer(firstAreaDrawn);
			drawnItems.removeLayer(areaDrawn);
			if (createdAlertId == null){
				alert("No campaign created! Please create a Campaign.");
				var json = {};
			}else{
				var json = {
					"alertID": createdAlertId,
					"userID": "sat",
					"userRole": "sat"
				};
			}
		}else if (status == "alertSummary"){
			drawnItems.removeLayer(firstAreaDrawn);
			drawnItems.removeLayer(areaDrawn);
			if (createdAlertId == null){
				var json = {
					"alertID": 899,
					"userID": "sat",
					"userRole": "sat"
				};
			}else{
				var json = {
					"alertID": createdAlertId,
					"userID": "sat",
					"userRole": "sat"
				};
			}
			

		}else if (status == "detailReport"){
			var json = {
				"alertId": 899,
				"iteration": 1,
				"area": 1,
				"userID": "sat",
				"userRole": "sat"
			};
		}else{
			var json = {};
		}
		editor.set(json);
		editor.expandAll();
	};

	function addZero(input){
		if (input < 10){
			input = '0'+input;
		}
		return input;
	}

	function getStartDate(){
		var d = new Date();
		var startDate;
		if (d.getMinutes() >= 55){
			startDate = d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate())+"T"+addZero(d.getHours()+1)+"00"+addZero(d.getSeconds());
		}else if (d.getHours == 23){
			startDate = d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate())+"T"+addZero(d.getHours())+addZero(d.getMinutes()+5)+addZero(d.getSeconds());
		}else{
			startDate = d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate())+"T"+addZero(d.getHours())+addZero(d.getMinutes()+5)+addZero(d.getSeconds());
		}
		return startDate;
	}

	function getExpiry(){
		var d = new Date();
		var expiry;
		if (d.getMinutes() >= 55){
			expiry = d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate())+"T"+addZero(d.getHours()+2)+"00"+addZero(d.getSeconds());
		}else if (d.getHours == 23){
			expiry = d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate()+1)+"T"+"00"+addZero(d.getMinutes()+5)+addZero(d.getSeconds());
		}else{
			expiry = d.getFullYear()+addZero(d.getMonth()+1)+addZero(d.getDate())+"T"+addZero(d.getHours()+1)+addZero(d.getMinutes()+5)+addZero(d.getSeconds());
		}
		return expiry;
	}

	$("#query").click(function(){
		$.ajax({
			url: "/cgi-bin/getCampaignInfo.pl/",
			type: "POST",
			data: "queryType=getTotalActiveCampaign",
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result) {
				switch (result) {
					case true:
						break;
					default: 
					//Check NO campaigns are running and the last campaign's end time is XX mins before now
						if(result > 0){
							var command = $('select[name=selectorCommand]').val();
							if (command == "alertStop"){
								querySPASapi("alertStop");
							}else if (command == "alertStatus"){
								querySPASapi("alertStatus");
							}else if (command == "alertSummary"){
								querySPASapi("alertSummary");
							}else{
								$.blockUI({ css: { 
									border: 'none',
									padding: '15px',
									left: '25%', 
									width: '50%',
									backgroundColor: '#000', 
									'-webkit-border-radius': '10px', 
									'-moz-border-radius': '10px', 
									opacity: .5, 
									color: '#fff',
								},
									message: '<h4>Campaign(s) in Progress! OR <br> Less than 10mins after Drill Module Campaign ended.<br> Please try again later.</h4>', 
									onOverlayClick: $.unblockUI 
								});
							}
						}else{
							var command = $('select[name=selectorCommand]').val();
							if (command == "preCounting"){
								$.ajax({
									url: "/cgi-bin/insertUserActivity.pl",
									type: "POST",
									beforeSend: function(){ $('#wait').show();},
									complete: function(){ $('#wait').hide();},
									data: "command=getPreCountingAttempts&command2=getPreCountingTimeLeft",
									success: function (result) {
										switch (result) {
											case true:
												break;
											default:									
												console.log(result);
												var comp = result.split("<br>");
												var attempts = comp[0];
												var duration = comp[1];
												console.log(comp);
												if (attempts >= maxPreCountattempts ){
													alert("Maximum "+maxPreCountattempts+" PreCounts done. Please try again in "+duration+" minutes!");
												}else{
													querySPASapi("preCounting");
												}
										}
									},
									error: function (xhr, ajaxOptions, thrownError) {
										console.log(thrownError);
									}
								});
							}else if (command == "createAlert Adhoc" || command == "createAlert On-demand" || command == "createAlert Periodic"){
								querySPASapi("createAlert").done(function(result){
									createdAlertId = editor2.get().alertID;
									console.log("createdAlertId: "+createdAlertId); 
								});
							}else if (command == "addWhitelist"){
								querySPASapi("addWhitelist");
							}else if (command == "alertStart"){
								var campaignType; //Get the Campaign Whitelist status
								json = editor.get();
								console.log("CampaignID:"+json.alertID);
								instance.open();
								$("#modal1").css({"width": "25%"});
								$("form#loginForm").submit(function(e){
									e.preventDefault();
									e.stopImmediatePropagation();
									console.log("submit button pressed!");
									var username = $('#username').val();
									var password = $('#password').val();
									var otp = $('#otp').val();
									console.log(username);
									console.log(password);
									console.log(otp);
									instance.close();
									$.ajax({
										url: "/cgi-bin/loginOTPUser.pl/",
										type: "POST",
										data: "user_name="+username+"&password="+password+"&otp="+otp,
										beforeSend: function(){ $('#wait').show();},
										complete: function(){ $('#wait').hide();},
										success: function (result) {
											switch (result){
												case true:
												break;
												default:
												if (result == "Login Successful"){
													alert("Login Successful!");
													username = $('#username').val("");
													password = $('#password').val("");
													otp = $('#otp').val("");
													$.ajax({
														url: "/cgi-bin/getCampaignInfo.pl/",
														type: "POST",
														data: "queryType=getCampaignType&alertId=" + JSON.stringify(json.alertID),
														success: function (result) {
															switch (result) {
																case true:
																	campaignType = result;
																	console.log(campaignType);
																	break;
																default:
																	campaignType = result;
																	console.log("CampaignType:"+campaignType); // 0 - inArea Only, 1 - Whitelist Only, 2 - Both inArea and Whitelist, 3 - Whitelist inArea 
																	if (campaignType == 0){
																		//Campaign is of Area type and needs to be checked for a preCount before adding the area to the campaign
																		if (Object.keys(drawnItems._layers).length != 0){
																			preCountCheckArea().done(function(result){
																				console.log(result);
																				var totalPreCount = result.countings[0].inbound + result.countings[0].local;
																				console.log(totalPreCount);
																				if ( totalPreCount < preCountAreaThreshold ){
																					getCampaignStatus(createdAlertId).done(function(result2){
																						console.log(result2);
																						if (result2 == 0){
																							querySPASAddCircle(areaDrawn, createdAlertId).done(function(result3){
																								console.log(result3);
																								alert("Area added for Campaign: "+createdAlertId);
																								alert("Starting the Campaign: "+createdAlertId);
																								querySPASapi("alertStart");
																							})
																							.fail(function(xhr){
																								console.log(xhr);
																								alert("Area CANNOT be added for Campaign: "+createdAlertId);
																							});
																						}else{
																							alert("Campaign Status is NOT 0! Campaign was NOT created in this session! Please create a new Campaign and try again.");
																						}
																					});
																				}else{
																					alert("Campaign cannot be started! More than "+preCountAreaThreshold+" people in the area!");
																					//Area needs to be deleted and User should draw new area to Start the campaign
																				}
																			})
																			.fail(function(){
																				alert("PreCount ERROR: "+xhr.status + " " + thrownError + " " + xhr.statusText);
																			});
																		}else{
																			alert("Please plot an area on the map!");
																		}
																	}else if (campaignType == 2 || campaignType == 3){
																		// If Campaign requires BOTH Area and Whitelist
																		if (Object.keys(drawnItems._layers).length != 0){
																			preCountCheckArea().done(function(result){
																				console.log(result);
																				var totalPreCount = result.countings[0].inbound + result.countings[0].local;
																				console.log(totalPreCount);
																				if ( totalPreCount < preCountAreaThreshold ){
																					//Area can be added and campaign can be started
																					getCampaignStatus(createdAlertId).done(function(result2){
																						console.log(result2);
																						if (result2 == 0){
																							console.log("Campaign Status is 0! Area will be added and Whitelist will be uploaded!");
																							whitelistJson.alertID = createdAlertId;
																							querySPASAddWhitelist().done(function(xhr){
																								console.log(xhr);
																							})
																							.fail(function(xhr){
																								//Error is thrown because ajax expects a JSON object to be returned
																								if (xhr.status == "200"){
																									console.log(xhr.status + " " + xhr.statusText);
																									alert("Whitelist Uploaded for Campaign: "+whitelistJson.alertID);
																									querySPASAddCircle(areaDrawn, createdAlertId).done(function(result3){
																										console.log(result3);
																										alert("Area added for Campaign: "+createdAlertId);
																										alert("Starting the Campaign: "+createdAlertId);
																										querySPASapi("alertStart");
																									})
																									.fail(function(xhr){
																										console.log(xhr);
																										alert("Area CANNOT be added for Campaign: "+createdAlertId);
																									});
																								}else{
																									console.log("Whitelist Upload Failed! Please contact Admin!");
																									console.log(xhr.status + " " + xhr.statusText);
																								}
																							});
																						}else{
																							alert("Campaign Status is NOT 0! Campaign was NOT created in this session! Please create a new Campaign and try again.");
																						}
																					});
																				}else{
																					alert("Campaign cannot be started! More than "+preCountAreaThreshold+" people in the area!");
																					//Area needs to be deleted and User should draw new area to Start the campaign
																				}
																			})
																			.fail(function (xhr, ajaxOptions, thrownError) {
																				alert("PreCount ERROR: "+xhr.status + " " + thrownError + " " + xhr.statusText);
																			});
																		}else{
																			alert("Please plot an area on the map!");
																		}
																	}else if (campaignType == 1){
																		//Update the alertId in the whitelist config file to current Campaign ID to which whitelist needs to be added to
																		whitelistJson.alertID = createdAlertId;
																		querySPASAddWhitelist().done(function(xhr){
																			console.log(xhr);
																		})
																		.fail(function(xhr){
																			//Error is thrown because ajax expects a JSON object to be returned
																			if (xhr.status == "200"){
																				console.log(xhr.status + " " + xhr.statusText);
																				alert("Whitelist Uploaded for Campaign: "+whitelistJson.alertID);
																				alert("Starting the Campaign: "+createdAlertId);
																				querySPASapi("alertStart");
																			}else{
																				alert("Whitelist Upload Failed for Campaign "+whitelistJson.alertID+"!");
																				editor2.set(xhr.status + " " + xhr.statusText);
																			}
																		});
																	}else{// If Campaign Type is NOT 0,1,2,3
																		alert("Please check the alertId!");
																	}
															}
														},
														error: function (xhr, ajaxOptions, thrownError) {
															alert(xhr.status + " " + thrownError + " " + xhr.statusText);
														}
													});
												}else{
													alert("Login Failed!");
												}
												return false;
											}
										},
										error: function(){
											alert("Cannot query Login backend! Please contact Admin!");
											instance.open();
										}
									});
									return false;
								});
							}else if (command == "alertStop"){
								querySPASapi("alertStop");
							}else if (command == "alertStatus"){
								querySPASapi("alertStatus");
							}else if (command == "alertSummary"){
								querySPASapi("alertSummary");
							}else{
							}
						}
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}		
		});
		return false;
	});

	function getCoordinates(string){
		var x = string.substr(2,string.indexOf(",")-2);
		var y = string.substr(string.indexOf(",")+1,string.indexOf(")")-1-string.indexOf(","));
		var radius = string.substr(string.indexOf(")")+2,string.indexOf(">")-2-string.indexOf(")"));
		return [x,y,radius];
	}

	function insertUserActivity(user, command){
		$.ajax({
			url: "/cgi-bin/insertUserActivity.pl",
			type: "POST",
			data: "user_name="+user+"&command="+command,
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result) {
				switch (result) {
					case true:
						break;
					default:
						if (result == "1"){

						}else{
							console.log("Cannot insert User Activity Command in DB!");
						}
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(thrownError);
			}
		});
	}

	function querySPASapi(command){
		var json = editor.get();
		console.log(json);
		console.log(JSON.stringify(json));
		insertUserActivity(current_user,command);
		return $.ajax({
			url: "http://"+location.host+"/spas/v1/"+command,
			headers: { 
				'Content-Type': 'application/json' 
			},
			type: "POST",
			data: JSON.stringify(json),
			dataType: "json",
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result) {
				switch (result) {
					case true:
						console.log(result);
						editor2.set(result);
						editor2.expandAll();
						break;
					default:
						console.log(result);
						editor2.set(result);
						editor2.expandAll();
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if (command == "addWhitelist"){
					editor2.set(xhr.status + " " + xhr.statusText);
				}else if (command == "alertStart"){
					editor2.set(xhr.status + " " + xhr.statusText);
				}else if(command == "alertStop"){
					editor2.set(xhr.status + " " + xhr.statusText);
				}else{
					editor2.set(xhr.responseJSON);
					alert(xhr.status + " " + xhr.statusText);
				}
			}
		});
	}
	
	function querySPASAddWhitelist(){
		insertUserActivity(current_user,"addWhitelist");
		return $.ajax({
			url: "http://"+location.host+"/spas/v1/addWhitelist",
			headers: { 
				'Content-Type': 'application/json' 
			},
			type: "POST",
			data: JSON.stringify(whitelistJson),
			dataType: "json",
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result, xhr) {
				switch (result, xhr) {
					case true:
					default:
				}
			}
		});
	}

	function querySPASAddCircle(areaDrawn, alertId){
		insertUserActivity(current_user,"addCircle");
		var addCircleDrawnArea = {
			"alertID": alertId,
			"radius": areaDrawn._mRadius.toFixed(0),
			"center": {
				"latitude" : areaDrawn._latlng.lat.toFixed(6),
				"longitude" : areaDrawn._latlng.lng.toFixed(6)
			 },
			 "userID": "sat",
			 "userRole": "sat"
		};
		return $.ajax({
			url: "http://"+location.host+"/spas/v1/addCircle",
			headers: { 
				'Content-Type': 'application/json' 
			},
			type: "POST",
			data: JSON.stringify(addCircleDrawnArea),
			dataType: "json",
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result, xhr) {
				switch (result, xhr) {
					case true:
					default:
				}
			}
		});
	}

	function preCountCheckArea(){
		var preCountDrawnArea = {
			"circles" : [
			{
				"radius" : areaDrawn._mRadius.toFixed(0),
				"center" : {
				"latitude" : areaDrawn._latlng.lat.toFixed(6),
				"longitude" : areaDrawn._latlng.lng.toFixed(6),
				}
			}
			],
			"userID" : "sat",
			"userRole": "sat"
		};
		return $.ajax({
			url: "http://"+location.host+"/spas/v1/preCounting",
			headers: { 
				'Content-Type': 'application/json' 
			},
			type: "POST",
			data: JSON.stringify(preCountDrawnArea),
			dataType: "json",
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result, xhr) {
				switch (result, xhr) {
					case true:
					default:
				}
			}
		});
		
	}

	function getCampaignStatus(alertId){
		return $.ajax({
			url: "/cgi-bin/getCampaignInfo.pl/",
			type: "POST",
			data: "queryType=getCampaignStatus&alertId="+alertId,
			beforeSend: function(){ $('#wait').show();},
			complete: function(){ $('#wait').hide();},
			success: function (result, xhr) {
				switch (result, xhr) {
					case true:
					default:
				}
			}
		});

	}

	var map = L.map('mapid').setView([1.358698, 103.838747], 12);
	var osm = L.tileLayer('http://'+mapServerIP+'/osm_tiles/{z}/{x}/{y}.png', {
		maxZoom: 18,
	}).addTo(map);
	
	/*var vectorStyles = {
		water: {	// Apply these options to the "water" layer...
		  fill: true,
		  weight: 1,
		  fillColor: '#06cccc',
		  color: '#06cccc',
		  fillOpacity: 0.2,
		  opacity: 0.4,
		},
		transportation: {	// Apply these options to the "transportation" layer...
		  weight: 0.5,
		  color: '#f2b648',
		  fillOpacity: 0.2,
		  opacity: 0.4,
		},
	  };
	
	var osm = L.vectorGrid.protobuf('http://'+mapServerIP+':8080/data/v3/{z}/{x}/{y}.pbf', {
		vectorTileLayerStyles: vectorStyles,
		attribution: '© OpenStreetMap contributors, © OpenMapTiles'
	  }).addTo(map);*/
	drawnItems = L.featureGroup().addTo(map);
	
	L.control.layers({
		'osm': osm.addTo(map)
		},
		{ 
			'drawlayer': drawnItems 
		},
		{ 
			position: 'topleft',
			collapsed: true 

	});

	map.addControl(new L.Control.Draw({
		edit: {
		featureGroup: drawnItems,
		poly: {
				allowIntersection: false
		}
		},
		draw: {
		polygon: {
			allowIntersection: false,
			showArea: true
		},
		marker: false,
		polyline: false,
		circlemarker: false,
		rectangle: false
		}
	}));

	map.on(L.Draw.Event.CREATED, function (event) {
		var status = $('select[name=selectorCommand]').val();
		var layer = event.layer;
		if (status == "preCounting"){
			if (Object.keys(drawnItems._layers).length == 0){
				var json = editor.get();
				console.log(layer);
				console.log(json);
				drawnItems.addLayer(layer);
				firstAreaDrawn = layer;
				console.log("Area Drawn");
				json.circles[0].center.latitude = layer._latlng.lat.toFixed(6);
				json.circles[0].center.longitude = layer._latlng.lng.toFixed(6);
				json.circles[0].radius = layer._mRadius.toFixed(0);
				editor.set(json);
				editor.expandAll();
			}else{
				drawnItems.removeLayer(firstAreaDrawn);
				console.log("Deleted First Area!");
				console.log(drawnItems);
				var json = editor.get();
				console.log(layer);
				console.log(json);
				drawnItems.addLayer(layer);
				firstAreaDrawn = layer;
				console.log("New Area Drawn");
				json.circles[0].center.latitude = layer._latlng.lat.toFixed(6);
				json.circles[0].center.longitude = layer._latlng.lng.toFixed(6);
				json.circles[0].radius = layer._mRadius.toFixed(0);
				editor.set(json);
				editor.expandAll();
			}
		}else if (status == "addCircle"){
			if (Object.keys(drawnItems._layers).length <= 0){
				var json = editor.get();
				json.center.latitude = layer._latlng.lat.toFixed(6);
				json.center.longitude = layer._latlng.lng.toFixed(6);
				json.radius = layer._mRadius.toFixed(0);
				editor.set(json);
				editor.expandAll();
				areaDrawn = layer; //save the area drawn in the variable for preCount later
				console.log(areaDrawn);
				drawnItems.addLayer(layer);
			}else{
				alert("Max number of Areas Drawn! Cannot draw more areas");
			}
		}else if (status == "addPolygon"){
		}else if (status == "alertStart"){
			console.log(layer);
			// No of areas allowed to add for alertStart
			if (Object.keys(drawnItems._layers).length == 0){
			//if (Object.keys(drawnItems._layers).length < 2){
				areaDrawn = layer; //save the area drawn in the variable for preCount later
				console.log(areaDrawn);
				drawnItems.addLayer(layer);
			}else{
				alert("Max number of Areas Drawn! Cannot draw more areas");
			}
		}else{
			alert("Please select the approriate command from the drop down menu!");
		}
	});
		
});