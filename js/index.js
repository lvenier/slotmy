var width = 30; 

var select = new Howl({ src: ['https://lvenier.github.io/slotmy/sounds/press_but.mp3'], volume: 1 });

function move(move) { 
        document.getElementById("dotlist").style.display="block"; 
        document.getElementById("prev").style.display="block"; 
        document.getElementById("next").style.display="block"; 
}

function plusSlides(n) {
  select.play(); 
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  select.play(); 
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

var slideIndex = 1;

window.onload = function(){
    var urlParams = new URLSearchParams(location.search);
    if (urlParams.has('slot')) {
	window.location.replace("/slot.html?slot="+urlParams.get('slot'));
    } else {
	showSlides(slideIndex);
    }
};

document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowLeft': plusSlides(-1); break;
	case 'Enter': select.play(); document.getElementById("slot"+slideIndex).click(); break;
        case 'ArrowRight': plusSlides(1); break
    }
};


