(function($) {
	"use strict";
	
	$( window ).load(function() {
		
		$('body.loadpage:before').hide();
		if ( $('body').hasClass('loadpage') ) {
			$('body').removeClass('loadpage');
		}

		$('body').find('.section').each( function() {
			var $section = $(this);
			new Waypoint({
				element: $section[0],
				handler: function(direction) {
					
					var $element = $(this.element);
					
					$element.find('.animated').each(function() {
						var $animate = $(this).attr('data-animate');
						if ( typeof $animate !== "undefined" ){
							$(this).addClass($animate);
						};
			    		
			    	});
				},
				offset: '35%',
			});
		});
		
	});
	
	
	$(document).ready(function() {
		
		// Scrollspy Menu
		var $one_page_v1 = $('body.style-v1');
		if ( $one_page_v1.length > 0 ) {
			$one_page_v1.attr('data-spy', 'scroll').attr('data-target', '#navbar').attr('data-offset', '71');
		}
		
		$one_page_v1.on('click', '#navbar a', function (e) {
	        e.preventDefault();
	        
	        var $element = $($(this).attr('href'));
	        
	        $('html,body').animate({
	            scrollTop: $element.offset().top - 70,
	        }, 2000);
	    });
		
		
		// Header Sticky
		var $header_top = $('.header-top_'),
			$menu_style_v1 = $('.header-style-v1 #primary-navigation');
		if ($header_top.length > 0) {
			new Waypoint.Sticky({
			  element: $header_top[0],
			  wrapper: '<div class="header-sticky" />',
			  stuckClass: 'header-stuck',
			  offset: '-1'
			});
		}
		
		if ( $menu_style_v1.length > 0 ) {
			new Waypoint.Sticky({
			  element: $menu_style_v1[0],
			  wrapper: '<div class="primary-navigation-sticky" />',
			  stuckClass: 'primary-navigation-stuck',
			  offset: '0'
			});
		}
		
		
		// Banner Slider
		var $slider = $('#banner .slider-wrapper');
		if ( $slider.length > 0 ) {
			$slider.imagesLoaded(function() {
				$slider.find('.nivoSlider').nivoSlider({
					pauseTime: 100000,
					directionNav: false,
				    controlNav: true,
				    randomStart: false, 
				    beforeChange: function(){
				    },    
				    afterChange: function(){
				    	$slider.find('.nivo-caption').find('.animated').each(function() {
				    		$(this).addClass($(this).attr('data-animate'));
				    	});
				    },        
				    slideshowEnd: function(){
				    },     
				    lastSlide: function(){
				    },         
				    afterLoad: function(){
				    	if ( $('.banner-v2').length > 0 ) {
				    		$slider.find('.nivo-html-caption').find('aside > *').each(function() {
					    		$(this).addClass('animated');
					    	});
				    	} else {
					    	$slider.find('.nivo-html-caption').find('aside').each(function() {
					    		$(this).addClass('animated');
					    	});
				    	}
				    },         
				});
			});
		}
		
		
		// Couple
		if ( $('.section-couple').length > 0 ) {
			$('.section-couple').on('click', 'figure', function(e){
				e.preventDefault();
				
				$(this).toggleClass("active");
			});
		}
		
		
		//Countdown Time
		$('[data-countdown]').each(function() {
			var $this = $(this), finalDate = $(this).data('countdown');
			
			$this.countdown(finalDate, function(event) {
				
				if ( $this.parents('.section-getting-married-v2').length > 0 ) {
					$this.html(event.strftime('<div class="row">'
							+ '<div class="col-xs-6 col-sm-6"><div class="countdown-item"><span class="featured-color-text">%D</span> days</div></div>'
							+ '<div class="col-xs-6 col-sm-6"><div class="countdown-item"><span class="featured-color-text">%H</span> Hours</div></div>'
							+ '<div class="col-xs-6 col-sm-6"><div class="countdown-item"><span class="featured-color-text">%M</span> Minutes</div></div>'
							+ '<div class="col-xs-6 col-sm-6"><div class="countdown-item"><span class="featured-color-text">%S</span> Seconds</div></div>'
							+ '</div>'));
					
				} else if ( $this.parents('.section-getting-married').length > 0 ) {
					$this.html(event.strftime('<div class="row">'
							+ '<div class="col-xs-3 col-sm-3"><div class="countdown-item"><span class="featured-color-text">%D</span> days</div></div>'
							+ '<div class="col-xs-3 col-sm-3"><div class="countdown-item"><span class="featured-color-text">%H</span> Hours</div></div>'
							+ '<div class="col-xs-3 col-sm-3"><div class="countdown-item"><span class="featured-color-text">%M</span> Minutes</div></div>'
							+ '<div class="col-xs-3 col-sm-3"><div class="countdown-item"><span class="featured-color-text">%S</span> Seconds</div></div>'
							+ '</div>'));
				}
			});
		});
		
		
		// Maps click
		$('.contact-maps').on('click', '.view-the-map', function(e){
			e.preventDefault();
			
			var $height = $('.contact-maps').find('#map-canvas-v2').height();

			if ( $('.contact-maps').find('#maps').height() >= $height ) {
				$('.contact-maps').find('#maps').css({'height': '150px'});
			} else
				$('.contact-maps').find('#maps').css({'height': $height});
			
		});
		
		// Flickity slider
		var $slider_flickity = $('.section-important-person .slider-flickity');
		if ( $slider_flickity.length > 0 ) {
			$slider_flickity.imagesLoaded(function() {
				if ( $slider_flickity.parents('.section-important-person-v2').length > 0 ) {
					var i = 0;
					var $flickity = $slider_flickity.flickity({
						wrapAround: true,
						imagesLoaded: true,
						pageDots: false,
						cellAlign: 'left',
						arrowShape: { 
							  x0: 25,
							  x1: 55, y1: 35,
							  x2: 65, y2: 30,
							  x3: 40
							}
					});
					
					$slider_flickity.on( 'click', '.gallery-cell:not(.is-selected)',function(e) {
						e.preventDefault();
						
						$flickity.flickity( 'select', $(this).index() );
					});
					
					$flickity.on( 'cellSelect', function() {
						
						if ( i == 1 ) {
							$flickity.find('.gallery-cell').css({"-webkit-transition":"width 0.5s","transition":"width 0.5s"});
						}
						
						if ( i >=1 ) {
							$flickity.find('.gallery-cell:not(.is-selected)').css({"margin-left": "-20%"});
							$flickity.find('.gallery-cell.is-selected ~ .gallery-cell').css({"margin-left": "20%"});
						}
						
					}); 
					
					$flickity.on( 'settle', function() {
						i++;
						
						$flickity.find('.gallery-cell').css({"margin-left": "0"});
						$flickity.flickity('reposition');
					});
					
				} else {
					var $flickity = $slider_flickity.flickity({
						wrapAround: true,
						imagesLoaded: true,
						prevNextButtons: false,
						draggable: false
					});
					
					//var flkty = $flickity.data('flickity');
					
					$slider_flickity.on( 'click', '.gallery-cell:not(.is-selected)',function(e) {
						e.preventDefault();
						
						$flickity.flickity( 'select', $(this).index() );
					});
					
					$flickity.on( 'cellSelect', function() {
						$flickity.find('.gallery-cell figure').removeClass('zoomIn');
						$flickity.find('.gallery-cell figure').addClass('zoomOut');
					}); 
					
					$flickity.on( 'settle', function() {
						//setTimeout(function(){ 
							$flickity.find('.gallery-cell figure').removeClass('zoomOut');
							$flickity.flickity('reposition');
							$flickity.find('.gallery-cell figure').addClass('zoomIn');
						//}, 500);
					});
				}
			});
		}
		
		// Flickity slider Blog
		if ( $('.section-blog .slider-flickity').length > 0 ) {
			$('.section-blog .slider-flickity').imagesLoaded(function() {
				$('.section-blog .slider-flickity').flickity({
					wrapAround: true,
					imagesLoaded: true,
					prevNextButtons: false,
				});
			});
		}
		
		// Flickity slider Blog
		if ( $('.section-testimonial .slider-flickity').length > 0 ) {
			$('.section-testimonial .slider-flickity').imagesLoaded(function() {
				$('.section-testimonial .slider-flickity').flickity({
					wrapAround: true,
					imagesLoaded: true,
					prevNextButtons: false,
				});
			});
		}
		
		// Flickity slider Our Love Story
		if ( $('.section-our-love-story .slider-flickity').length > 0 ) {
			$('.section-our-love-story .slider-flickity').imagesLoaded(function() {
				var $our_love_story_slider = $('.section-our-love-story .slider-flickity').flickity({
					contain: true,
					pageDots: false,
					initialIndex: 1,
					cellAlign: 'left',
					arrowShape: { 
						  x0: 25,
						  x1: 55, y1: 35,
						  x2: 65, y2: 30,
						  x3: 40
						}
				});
				
				
				$our_love_story_slider.on('click', '.our-love-story-readmore a', function(e) {
					e.preventDefault();
					
					var $this = $(this);
					
					if ( $this.parents('.our-love-story-item').hasClass('show') ) {
						
						$this.parents('.our-love-story-item').removeClass('show')
						$this.text('Read more');
						
						$our_love_story_slider.flickity('resize');
						
					} else {
						$this.parents('.our-love-story-item').addClass('show')
							.parents('.gallery-cell').siblings()
							.find('.our-love-story-item').removeClass('show').find('.our-love-story-readmore a').text('Read more');
						
						$this.text('Less');
						//setTimeout(function(){ 
							$our_love_story_slider.flickity('resize');
						//}, 500);
					}
					
				});
				
			});
		}
		
		
		// Ajax Blog
		var $section_blog = $('.section-blog');
		if ( $section_blog.length > 0 ) {
			$section_blog.on('click', 'a.post-ajax', function(e) {
				e.preventDefault();
				
				var $this = $(this),
					$url = $this.attr('data-url'),
					$modal = $($this.attr('data-target'));
				
				$( document ).ajaxStart(function() {
					$('body').addClass('loadpage');
				});
				$( document ).ajaxStop(function() {
					$('body').removeClass('loadpage');
				});
				
				$.ajax({
					url: $url,
					cache: false,
				}).done(function( html ) {
					
					var $element = $(html).find('.main-content');
				
					$modal.find('.modal-body').html( $element.html() );
					
				})
				
				.fail(function() {
					location.reload();
				})
				.always(function(html) {
				});
				
				
			});
		}
		
		
		// Gallery
		var $gallery = $('#section-gallery .gallery-inner');
		if ( $gallery.length > 0 ) {
			
			var photos_total = [],
				gallery_ulr = $('#section-gallery').find('.loadmore .button').data('url');
	
			if ( typeof gallery_ulr !== "undefined" &&  gallery_ulr != '' &&  gallery_ulr != '#' ) {
				
				// Gallery Expanding
				/*$gallery.GalleryExpanding({
	        		selector: '.gallery-photo',
				}, function() {
					$gallery.find('.picrow').css({'height': "auto"});
				}); */
	        	
				
				// Load Window
				$.ajax({
		            url : gallery_ulr,
		            cache: false,
				}).done( function( html ) {
					var __ulr = $(html).find('#gallery-ajax .loadmore .button').data('url');
					
					if ( typeof __ulr !== "undefined" &&  __ulr != '' &&  __ulr != '#' ) {
						$('#section-gallery').find('.loadmore .button').data('url', __ulr);
					
					} else $('#section-gallery').find('.loadmore .button').data('url', '#');
					
				}).always(function(html) {
					var photos = [],
						i = 0;
					
		        	$(html).find('#gallery-ajax img').each( function () {
		        		photos[i] = { alt: $(this).attr('alt'), src: $(this).attr('src'), width: $(this).attr('width'), height: $(this).attr('height'), filter: $(this).attr('data-filter')};
		        		i++;
		        	});
		        	
		        	photos_total = photos_total.concat(photos); 
		        	showPhotos($gallery, photos);
		        	
				});
				
				$('body').find('.section').each( function() {
					var $section = $(this);
					new Waypoint({
						element: $section[0],
						handler: function(direction) {
							
							var $element = $(this.element);
							
							if ( $element.hasClass('section-gallery') ) {
								$gallery.empty();
								showPhotos($gallery, photos_total);
							}
						},
						offset: '35%',
					});
				});
				
				// Load More
				$('#section-gallery').on('click', '.loadmore .button', function(e) {
					e.preventDefault();
					
					var ulr = $('#section-gallery').find('.loadmore .button').data('url');
					
					if ( typeof ulr !== "undefined" &&  ulr != '' &&  ulr != '#' ) {
						$.ajax({
				            url : ulr,
				            cache: false,
						}).done( function( html ) {
							var __ulr = $(html).find('#gallery-ajax .loadmore .button').data('url');
							
							if ( typeof __ulr !== "undefined" &&  __ulr != '' &&  __ulr != '#' ) {
								$('#section-gallery').find('.loadmore .button').data('url', __ulr);
							
							} else $('#section-gallery').find('.loadmore .button').data('url', '#');
							
						}).always(function(html) {
							var photos = [],
								i = 0;
							
				        	$(html).find('#gallery-ajax img').each( function () {
				        		photos[i] = { alt: $(this).attr('alt'), src: $(this).attr('src'), width: $(this).attr('width'), height: $(this).attr('height'), filter: $(this).attr('data-filter') };
				        		i++;
				        	});
				        	
				        	photos_total = photos_total.concat(photos);
				        	showPhotos($gallery, photos);
						});
					}
				});
				
				
				// Resize
				$(window).resize(function(){
					if ( photos_total.length > 0 ) {
						$gallery.empty();
						showPhotos($gallery, photos_total);
					}
					
				});
				
				// Filter
				var $filter = $('#filter');
				if( $filter.length > 0 ) {
					$filter.on('click', '.button', function(e) {
						e.preventDefault();
						
						var $this = $(this);
						
						$this.siblings().removeClass('active');
						$this.addClass('active');
						
						if ( photos_total.length > 0 ) {
							var photo_filter = [], 
								i,
								j = 0,
								data_filter = $this.data('filter');
							
							if ( data_filter == '*' ) { 
								$gallery.empty();
								showPhotos($gallery, photos_total);
								
							} else {
							
								for (i = 0; i < photos_total.length; i++) {
									var filter = '.' + photos_total[i].filter;
									
									if ( filter == data_filter ) {
										photo_filter[j] = photos_total[i];
										j++;	
									}
								}
								
								$gallery.empty();
								showPhotos($gallery, photo_filter);
							}
						}
						
					});
				}
			}
			
		}
		
	});
	
	var showPhotos = function($gallery, photos){
    	
		var margin = 0;
		
		if ( $gallery.data('margin') > 0 ) {
			margin = $gallery.data('margin');
		}
		
		$gallery.justifiedImages({
            images : photos,
            rowHeight: 350,
            maxRowHeight: 500,
            thumbnailPath: function(photo, width, height){
                return photo.src;
            },
            getSize: function(photo){
                return {width: photo.width, height: photo.height};
            },
            margin: margin,
            imageSelector: 'image-thumb',
            imageContainer: 'gallery-photo',
            template: function(data) {
            	/*
                return '<a href="' + data.src + '" class="gallery-photo ' + data.filter + '" style="height:' + data.displayHeight + 'px;margin-right:' + data.marginRight + 'px;">' +
                    '<img class="image-thumb" src="' + data.src + '" style="width:' + data.displayWidth + 'px;height:' + data.displayHeight + 'px;" >' +
                    '</a>'; */
                
            	var padding_top = data.displayHeight/2 - 45;
            	
            	return '<div class="white-color-text gallery-photo ' + data.filter + '" style="height:' + data.displayHeight + 'px;margin-right:' + data.marginRight + 'px;">' +
							'<img class="image-thumb" src="' + data.src + '" style="width:' + data.displayWidth + 'px;height:' + data.displayHeight + 'px;" >' +
							'<a href="' + data.src + '" style="padding-top: ' + padding_top + 'px;">' +
								'<span class="photo-title">' + data.alt + '</span>' +
								'<i class="fa fa-search-plus"></i>' + 
								'<span class="photo-category">' + data.filter + '</span>' +
							'</a>' +
						'</div>';
            	
            },
        });
		
		// Gallery Popup
		$gallery.lightGallery({
			selector: ".gallery-photo a",
			mode: 'lg-slide',
			zoom: false,
			hash: false,
			thumbnail: false
		});
		
    };
	
    
    // Plugin Gallery Expanding
    $.fn.GalleryExpanding = function(options, callback) {
        
        /* GET DEFAULT OPTIONS OR USE THE ONE PASSED IN THE FUNCTION  */
        var opts = $.extend( {}, $.fn.GalleryExpanding.defaults, options ),
        	$element = $(this);
        
        if ( !opts.selector.trim() ) { 
        	opts.selector = $element.children()[0];
        } 
       
        $element.on('click', opts.selector, function(e){
        	e.preventDefault();
        	
        	var $children = $(this),
        		$expanding = $(opts.expanding_dom).addClass(opts.expanding_class);
        	
        	if ( !$children.next().hasClass(opts.expanding_class) ) {
        		
        		$children.addClass('selectedItem').siblings().removeClass('selectedItem');
        		if ( !$element.hasClass('hasSelectedItem') ) { $element.addClass("hasSelectedItem"); }
        		
        		$element.find('.' + opts.expanding_class).remove();
        		
        		$expanding.html('<img alt="" src="'+ $children.attr('href') +'">')
        			.insertAfter($children);
	        }
        	
        	// Call Back
        	if (typeof callback == 'function') {
                callback.call($element);
            }
        	
        });

        return true;
    };
    
    $.fn.GalleryExpanding.defaults = {
    	selector: '',
    	expanding_dom: '<div></div>',
    	expanding_class: 'gallery-expanding-show',
    };
    
    
})(jQuery);


var mtheme_maps = [
                   { 
						LatLng: "38.907193, -77.009690", 
						desc_contact: 	'<div class="map-infowindow">' + 
											'<img alt="" src="../images/contact/map-1.jpg">' +
											'<div class="map-infowindow-content">' +
												'<h4 class="map-infowindow-title featured-color-text">The Church<small>Cerimony</small></h4>' +
												'<span class="map-infowindow-date">11:30 AM</span>' +
											'</div>' +
										'</div>'
                   },
                   { 
						LatLng: "38.895180, -77.050409", 
						desc_contact: 	'<div class="map-infowindow">' + 
											'<img alt="" src="../images/contact/map-2.jpg">' +
											'<div class="map-infowindow-content">' +
												'<h4 class="map-infowindow-title featured-color-text">Restaurant<small>party</small></h4>' +
												'<span class="map-infowindow-date">11:30 AM</span>' +
											'</div>' +
										'</div>'
                  },
                  { 
						LatLng: "38.887951, -76.976897", 
						desc_contact: 	'<div class="map-infowindow">' + 
											'<img alt="" src="../images/contact/map-3.jpg">' +
											'<div class="map-infowindow-content">' +
												'<h4 class="map-infowindow-title featured-color-text">Hard Rocks<small>Hotel</small></h4>' +
												'<span class="map-infowindow-date">11:30 AM</span>' +
											'</div>' +
										'</div>'
                }
				],
		
	$event_maps = [
                   { 
						LatLng: "38.907193, -77.009690", 
						desc_contact: 	''
                   }
                  ],

    mtheme_maps_v2 = [
               { 
					LatLng: "38.907193, -77.009690", 
					desc_contact: 	''
               }
              ];
	
	function initialize( $canvas, $options ) {
		
		var grayStyles = [ {
			featureType : "all",
			stylers : [ {
				saturation : -100
			}, {
				lightness : 26
			}, {
				gamma : 1.8
			} ]
		}, ];
		
		
		// Multi Maps
		var mapOptions,
			map,
			$LatLng,
			i,
			marker = [],
			infowindow = [];
		
		$LatLng = $options[0].LatLng.split(", "); 
		
		mapOptions = {
				center : new google.maps.LatLng($LatLng[0], $LatLng[1]),
				zoom : 13,
				styles : grayStyles,
				
				panControl: false,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				scrollwheel: false, 
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			};
			
		map = new google.maps.Map($canvas,
				mapOptions);
		
		for ( i = 0; i < $options.length; i++ ) {
			
			var $_LatLng = $options[i].LatLng.split(", "); 
			
			marker[i] = new google.maps.Marker({
				map : map,
				position : new google.maps.LatLng($_LatLng[0], $_LatLng[1]),
				icon: '../assets/imgs/icon-map.png',
				key: i,
			});
		
			if ( $options[i].desc_contact.length > 0 ) {
				infowindow[i] = new google.maps.InfoWindow();
				infowindow[i].setContent($options[i].desc_contact); 
				
				//infowindow[i].open(map, marker[i]);
				google.maps.event.addListener(marker[i], 'click', function() {
					infowindow[this.key].open(map, marker[this.key]);
				}); 
			}
		}
	}


var $map_canvas = document.getElementById("map-canvas"),
	$map_canvas_v2 = document.getElementById("map-canvas-v2"),
	$event_canvas = document.getElementById("event-canvas");

if ( typeof mtheme_maps !== "undefined" && mtheme_maps.length > 0 && $event_canvas != null) {
	google.maps.event.addDomListener(window, 'load', initialize($event_canvas, $event_maps));
}
if ( typeof mtheme_maps !== "undefined" && mtheme_maps.length > 0 && $map_canvas != null) {
	google.maps.event.addDomListener(window, 'load', initialize($map_canvas, mtheme_maps ));
}
if ( typeof mtheme_maps_v2 !== "undefined" && mtheme_maps_v2.length > 0 && $map_canvas_v2 != null) {
	google.maps.event.addDomListener(window, 'load', initialize($map_canvas_v2, mtheme_maps_v2 ));
}
