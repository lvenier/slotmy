//notification when win 5
//cast first page

var audit;
var logger;
var translate = [];

function audit (msg, cmd) {
  var settings = {
     "async": true,
     "crossDomain": true,
     "url": "https://audit.demo.yoctu.com/api/audit-events",
     "method": "POST",
     "headers": {
       "Authorization": "audit"
     },
      "data": "{ \"level\":8, \"flags\":0, \"namespace\":\"/slotmy\", \"message\":\""+msg+"\", \"user\":\"me\", \"server\":\""+window.location.hostname+"\", \"command\":\""+cmd+"\", \"origin\":\"http\", \"category\":\"4\", \"env\":\"test\" }"
   }
   $.ajax(settings).done(function (response) {
	console.log(response);
  	audit = response;
   });
}

function translate (key) {
    var settings = {
	"async": true,
  	"crossDomain": true,
  	"url": "https://translate.demo.yoctu.com/api/i18n-string?key=bck1:8bad63a9-07c4-4bcc-84c0-7ae4f75891cb",
  	"method": "GET",
  	"headers": {
    	    "Authorization": "translate"
  	}
    }
    $.ajax(settings).done(function (response) {
 	console.log(response);
	translate = response;
    });
}

function logger(msg,cmd) {
    var settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": "https://logger.demo.yoctu.com/api/notifications",
  	"method": "POST",
  	"headers": {
    	    "Authorization": "logger"
  	},
  	"data": "{ \"level\":8, \"flags\":0, \"namespace\":\"/\", \"message\":\""+msg+"\", \"user\":\"me\", \"server\":\""+window.location.hostname+"\", \"command\":\""+cmd+"\", \"origin\":\"http\", \"category\":\"4\", \"env\":\"test\" }"
    }
    $.ajax(settings).done(function (response) {
  	console.log(response);
    });
}

function payment () {
    settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": "https://payment.demo.yoctu.com/api/payments",
 	"method": "POST",
  	"headers": {
    	    "Content-Type": "application/x-www-form-urlencoded"
  	},
	"data": {
    "payment": "{\"expirationDate\":\"2019-10-10\",\"requiredPrice\":3.14,\"authorizedPayment\":8,\"contexts\":{\"test\":\"TEST\"},\"callbackUrl\":{\"succeeded\":\"http://urlSuccess\",   \"saved\":\"http://urlSaved\",\"cancelled\":\"http://urlCancelled\"}}" }
    }
    $.ajax(settings).done(function (response) {
  	console.log(response);
    });
}



