$(document).ready(function(){
    checkOtp();

    function checkOtp() {
        $.ajax({
			url: "/cgi-bin/getPass.pl",
			type: "GET",
			success: function (result) {
				switch (result) {
					case true:
						break;
					default: 
						console.log(result);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
			}		
		});
	}
});