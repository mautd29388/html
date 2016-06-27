(function($) {
	"use strict";
	
	$( window ).load(function() {
		/*
		$('body.loadpage:before').hide();
		if ( $('body').hasClass('loadpage') ) {
			$('body').removeClass('loadpage');
		}
		
		$('body').find('.section').each( function() {
			var $section = $(this);
			new Waypoint({
				element: $section[0],
				handler: function(direction) {
					//console.log(this);
					var $element = $(this.element);
					$element.find('.animated').each(function() {
						var $animate = $(this).attr('data-animate');
						if ( typeof $animate !== "undefined" ){
							$(this).addClass($animate);
						};
			    		
			    	});
				},
				offset: '70%',
			});
		}); */

	});
	
	
	$(document).ready(function() {
		
		//Countdown Time
		$('[data-countdown]').each(function() {
			var $this = $(this), finalDate = $(this).data('countdown');
			
			$this.countdown(finalDate, function(event) {
				
				$this.html(event.strftime
						(
							'<div class="countdown-row"><div class="countdown-section"><span class="countdown-amount featured-color-text">%D</span><span class="countdown-period">days</span></div></div>'
							+ '<div class="countdown-row"><div class="countdown-section"><span class="countdown-amount featured-color-text">%H</span><span class="countdown-period">Hours</span></div></div>'
							+ '<div class="countdown-row"><div class="countdown-section"><span class="countdown-amount featured-color-text">%M</span><span class="countdown-period">Mins</span></div></div>'
							+ '<div class="countdown-row"><div class="countdown-section"><span class="countdown-amount featured-color-text">%S</span><span class="countdown-period">Secs</span></div></div>'
						));
				
			});
		});
		
		// Flickity slider Testimonior
		if ( $('.testimonior-slider .slider-flickity').length > 0 ) {
			$('.testimonior-slider .slider-flickity').imagesLoaded(function() {
				$('.testimonior-slider .slider-flickity').flickity({
					wrapAround: true,
					imagesLoaded: true,
					prevNextButtons: false,
				});
			});
		}
		
		// Slider Testimonior
		if ( $('.testimonior-slider .testimonior').length > 0 ) {
			$('.testimonior-slider .testimonior').owlCarousel({
		        autoplay: true,
		        items: 1, 
		        
		        //itemsDesktop: [1024, 1], 
		        //itemsDesktopSmall: [900, 1],
		        //itemsTablet: [600, 1], 
		        //itemsMobile: [320, 1],
		        navigation: false,
		        slideSpeed: 500,
		        pagination: true
		    });
		}
		
		/* brand-logo-slider */
		if ( $('#brand-logo-slider .slider-items').length > 0 ) {
			$('#brand-logo-slider .slider-items').owlCarousel({
		        autoplay: true,
		        items: 5, //10 items above 1000px browser width
		        //itemsDesktop: [1024, 4], //5 items between 1024px and 901px
		        //itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
		        //itemsTablet: [600, 2], //2 items between 600 and 0;
		        //itemsMobile: [320, 1],
		        navigation: false,
		        // navigationText: ["<a class=\"flex-prev\"></a>", "<a class=\"flex-next\"></a>"],
		        slideSpeed: 500,
		        pagination: false
			});
		}
	});
	
	
})(jQuery);


var mtheme_maps = { 
		LatLng: "51.5042389, -0.1061977", 
		desc_contact: "<p> Email: noreply@gmail.com<br>Phone: +800 - 568 - 8989<br>96 Isabella ST, London, SE 1 8DD</p>"
	},
	
	$map_canvas = document.getElementById("map-canvas");

if ( typeof mtheme_maps !== "undefined" && $map_canvas != null) {
	
	function initialize() {
		
		var grayStyles = [ /*{
			featureType : "all",
			stylers : [ {
				saturation : -100
			}, {
				lightness : 47
			}, {
				gamma : 0.34
			} ]
		},*/ ];
		
		var $LatLng = mtheme_maps.LatLng.split(", "); 
		
		var mapOptions = {
			center : new google.maps.LatLng($LatLng[0], $LatLng[1]),
			zoom : 13,
			styles : grayStyles,
		};
		
		var map = new google.maps.Map(document.getElementById("map-canvas"),
				mapOptions);
	
		var marker = new google.maps.Marker({
			map : map,
			position : map.getCenter(),
			scrollwheel: false,
			icon: '../assets/imgs/icon-map.png',

		});
	
		var infowindow = new google.maps.InfoWindow();
		infowindow.setContent(mtheme_maps.desc_contact);
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		}); 
	}
	
	google.maps.event.addDomListener(window, 'load', initialize());
}