(function($) { 

	"use strict";
	
	/* ================ Dynamic content height. ================ */
	var winH = $(window).height(),
		headH = $('#headWrapper').outerHeight(),
		footH = $('#footWrapper').outerHeight(),
		H = winH -(headH + footH);
	$('#contentWrapper').css('min-height',H);
	$(".loader-in").append('<div class="status"><span class="spin"></span><span></span></div>');

	

	/* ================ Responsive Navigation menu ============ */
	if($('.top-nav').length > 0){
	if (!$('body').hasClass('one-page')){
		var men = $('.top-nav > ul').html();	
		$('<a href="#" class="menuBtn"><i class="fa fa-bars"></i></a><div class="responsive-nav"></div>').prependTo('body');
		$('.responsive-nav').html('<h3>Menu Navigation</h3><ul>'+men+'</ul>');
		if($('html').css('direction') == 'rtl'){
			$('.responsive-nav h3').text('');
		}
		$('.menuBtn').click(function(e){
			e.preventDefault();
			$('.responsive-nav').toggleClass('res-act');
			$('.menuBtn').toggleClass('menuBtn-selected');
			$('.pageWrapper').click(function(){
				$(this).removeClass('colBody');
				$('.responsive-nav').removeClass('res-act');
				$('.menuBtn').removeClass('menuBtn-selected');
			});
		});
	}else{
		var menOne = $('.top-nav > ul').html();
		$('<div class="responsive-one"></div>').prependTo('body');
		$('.responsive-one').html('<a href="#" class="menuBtnOne"><i class="fa fa-bars"></i></a><ul>'+menOne+'</ul>');
		$('.menuBtnOne').click(function(e){
			e.preventDefault();
			$(this).toggleClass('menuBtnOneTogg');
			$('.responsive-one ul').toggleClass('showOne');
		});
		$('.responsive-one ul').onePageNav();
	}
	
	var men = $('.responsive-nav ul'),
		menItems = men.find('li');
	menItems.each(function(){
		var uls = $(this).find('> ul'),
			divs = $(this).find('.div-mega');
		if (uls.length){
			$(this).prepend('<span class="collapse"></span>');
			$(this).find('> span.collapse').click(function(){
				uls.slideToggle(500);
				$(this).parent().toggleClass('current');
			});
		}
		if (divs.length){
			$(this).prepend('<span class="collapse"></span>');
			$(this).find('> span.collapse').click(function(){
				divs.slideToggle(500);
				$('.responsive-nav .div-mega').removeClass('selected');
				$(this).addClass('selected');
			});
		}
	});
	
	/* ================ Top navigation menu. ================ */
		
	var menu = $('.top-nav > ul'),
		menuW = menu.width(),
		items = menu.find('li'),
		sel = menu.find('li.selected').index(),
		ulW,winW,menOff,m,totalOff;
	items.each(function(){
		var ul = $(this).find('ul:first');
		ul.css('max-width',menuW);
		if($(this).hasClass('selected')){
			$(this).addClass('current');
		}
		if (ul.length){
			$(this).addClass('hasChildren');
			var delay = 0;
			$(this).find('> ul > li').each(function(){
				$(this).css({transitionDelay: delay+'ms'});
				delay += 50;
			});
			$(this).hover(function(){
				$(this).addClass('selected');
			},function(){
				$(this).removeClass('selected');
			});
			if ($(this).find('ul li ul').length){
				var thisUL = $(this).find('ul ul');
					ulW = thisUL.outerWidth(),
					winW = $(window).width(),
					menOff= thisUL.offset(),
					m = menOff.left,
					totalOff = winW - m;
				if (totalOff < ulW){
					thisUL.css({left:'auto',right:'100%'});
				}
			}
		}
	});
 	
 	if($('.mega-menu').length > 0){
		var mainW = $('.top-head .container').width(),
			lft = $('.top-head .container').offset().left+15;
		$('.top-nav > ul > li').each(function(){
			var itemOff = $(this).offset().left /2,
				thisOff = $(this).offset().left,
				newOff = thisOff - lft,
				thisW	=  $(this).outerWidth(),
				offT	= itemOff - mainW,
				len		= $(this).find('.div-mega-section').length;
			$(this).find('.div-mega').css({width:mainW+'px',left:-newOff+'px',padding:'25px 0'});
			if(len == '2'){
				$(this).find('.div-mega-section').css('width','46%');
			}else if(len == '3'){
				$(this).find('.div-mega-section').css('width','29%');
			}else if(len >= '4'){
				$(this).find('.div-mega-section').css('width','21%');
			}
		});
		/*$('.top-nav > ul > li').hover(function(){
			$(this).find('.div-mega').stop(true, true).fadeIn('slow');
		},function(){
			$(this).find('.div-mega').stop(true, true).delay(0).fadeOut('slow');
		});*/
	}
	
	}
	
	/* ================ Sticky nav. ================ */
	
	if($('.top-head, .top-bar').attr('data-sticky') == "true"){
		$(window).on("scroll",function(){
			var Scrl = $(window).scrollTop();
			if (Scrl > 1) {
				$('.top-head').addClass('sticky');
				$('.top-bar').addClass('stickyTop');
			}else{
				$('.top-head').removeClass('sticky');
				$('.top-bar').removeClass('stickyTop');
			}
		});
		$('document').ready(function(){
			var Scrl = $(window).scrollTop();
			if (Scrl > 1) {
				$('.top-head').addClass('sticky');
				$('.top-bar').addClass('stickyTop');
			}else{
				$('.top-head').removeClass('sticky');
				$('.top-bar').removeClass('stickyTop');
			}
		});
	}

	
	
	/* ================ Back to top button. ================ */
	var winScroll = $(window).scrollTop();
	if (winScroll > 1) {
		$('#to-top').css({bottom:"10px"});
	} else {
		$('#to-top').css({bottom:"-100px"});
	}
	$(window).on("scroll",function(){
		winScroll = $(window).scrollTop();
		
		// PARALLAX background Animation.
		var y = parseInt($('.parallax').css('background-position-y'));
		var newY = -(winScroll * 0.05) + 'px';
		$('.parallax').css("background-position-y",newY);

		
		//  Show Hide back to top button.
		if (winScroll > 1) {
			$('#to-top').css({opacity:1,bottom:"10px"});
		} else {
			$('#to-top').css({opacity:0,bottom:"-100px"});
		}
	});
	$('#to-top').click(function(){
		$('html, body').animate({scrollTop: '0px'}, 800);
		return false;
	});
	
	
	/****** menu effects ***********/ /* new in version 2 */
	if($('.top-nav').length > 0){
		$('.top-nav').find('> ul').attr('id','mnu-eft');
		if($('#mnu-eft').attr('class') == undefined){
			$('#mnu-eft').addClass('def-effect');
			$('.top-nav > ul > li').hover(function(){
				$(this).find('.div-mega').stop(true, true).delay(100).fadeIn();
			},function(){
				$(this).find('.div-mega').stop(true, true).delay(100).fadeOut();
			});
		}
		
		$('#mnu-eft.slide li').each(function(){
			$(this).hover(function(){
				$(this).find('> ul').stop(true, true).delay(200).slideDown();
				$(this).find('.div-mega').stop(true, true).delay(100).slideDown();
			},function(){
				$(this).find('> ul').stop(true, true).delay(100).slideUp();
				$(this).find('.div-mega').stop(true, true).delay(100).slideUp();
			});
		});
		
		$('#mnu-eft.fade li').each(function(){
			$(this).hover(function(){
				$(this).find('> ul').stop(true, true).delay(100).fadeIn();
				$(this).find('.div-mega').stop(true, true).delay(100).fadeIn();
			},function(){
				$(this).find('> ul').stop(true, true).delay(100).fadeOut();
				$(this).find('.div-mega').stop(true, true).delay(100).fadeOut();
			});
		});
		
		var mnu_eft = $('#mnu-eft').not('.def-effect,.slide,.fade').attr('class');
		$('.'+mnu_eft).find('li').each(function(){
			$(this).hover(function(){
				$(this).find('> ul').stop(true, true).show(0).addClass('animated '+mnu_eft);
				$(this).find('.div-mega').stop(true, true).show(0).addClass('animated '+mnu_eft);
			},function(){
				$(this).find('> ul').stop(true, true).hide(0).removeClass('animated '+mnu_eft);
				$(this).find('.div-mega').stop(true, true).hide(0).removeClass('animated '+mnu_eft);
			});
		});
	}
	/****** end menu effects ***********/
	
	// Gallery Plugin.
    
   


})(jQuery);