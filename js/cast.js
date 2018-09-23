$(document).ready( function() {
    $("#play").click( function () {
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "/ajaxcast?action=play&machine_id="+$("#machine_id").val(),
		"method": "GET" })
	.done(function (response) {
		console.log(response);
	});	
    });
    $("#spin").click( function () {
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "/ajaxcast?action=spin&machine_id="+$("#machine_id").val(),
		"method": "GET" })
	.done(function (response) {
		console.log(response);
	});	
    });
    $("#info").click( function () {
	$.ajax({
		"async": true,
		"crossDomain": true,
		"url": "/ajaxcast?action=info&machine_id="+$("#machine_id").val(),
		"method": "GET" })
	.done(function (response) {
		console.log(response);
	});	
    });

});
