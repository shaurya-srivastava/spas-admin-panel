$(document).ready(function(){
    $('.sidenav').sidenav();
	$('.time').keyup(function() {
		if (/\D/g.test(this.value)){
			// Filter non-digits from input value.
			this.value = this.value.replace(/\D/g, '');
		}
		//var foo = $(this).val(); // remove hyphens
		//$(this).val(this.value);
    });
    $(".brand-logo").css({"height": "100%"});
    var mhaUser = "userRole:userName";
    var singtelUser = "sat:sat";
	var type, url, data, error, success;
	var params = {
		type: "POST",
		url: "/cgi-bin/getDashboardResult.pl",
		cache: false,
		timeout: 30000
    }
    params.data = "user=" + mhaUser;
    params.error = function(){
                $('div#mhaDashboardResult').text("script call was not successful");
    };
    params.success =  function(perl_data){
                console.log(perl_data);
                $('#mhaDashboardResult').html(perl_data);
    };
	$.ajax(params);
	$('div#mhaDashboardResult').fadeIn();
    
    params.data = "user=" + singtelUser;
    params.error = function(){
                $('div#singtelDashboardResult').text("script call was not successful");
    };
    params.success =  function(perl_data){
                console.log(perl_data);
                $('#singtelDashboardResult').html(perl_data);
    };
	$.ajax(params);
	$('div#singtelDashboardResult').fadeIn();
    return false;
    
});

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};


