$('.question-mark').on('mouseenter', function(){
	$('.youtube-tooltip').fadeIn(100);
});
$('.question-mark').on('mouseleave', function(){
	$('.youtube-tooltip').fadeOut(100);
});
////
$('.talkbox-document-header .button').on('click', function(e){

	$('.talkbox-document-header #BrowserHidden2').trigger('click');
	e.preventDefault();
});

$('.csv-slidedown #BrowserVisible1 .browse-button').on('click', function(e){

	$('.csv-slidedown #BrowserHidden1').trigger('click');
	e.preventDefault();
});
$('#BrowserVisible3').on('click', function(e){

	$('#BrowserHidden3').trigger('click');
	e.preventDefault();
});

//toggling the state of the like link in the newsfeed
(function(){
	$('.like-link').toggle(function(e){
		e.preventDefault();
		$(this).removeClass('like-link').addClass('liked-link').text('Unlike');
		var count = $(this).siblings('.countnb').text();
		count++;
		$(this).siblings('.countnb').text(count);
	}, function(e){
		e.preventDefault();
		$(this).removeClass('liked-link').addClass('like-link').text('Like');
		var count = $(this).siblings('.countnb').text();
		count--;
		$(this).siblings('.countnb').text(count);
	});
	$('.like-link-up').toggle(function(e){
		e.preventDefault();
		$(this).removeClass('like-link-up').addClass('liked-link-up').text('Unlike');
		var count = $(this).siblings('.countnb').text();
		count++;
		$(this).siblings('.countnb').text(count);
	}, function(e){
		e.preventDefault();
		$(this).removeClass('liked-link-up').addClass('like-link-up').text('Like');
		var count = $(this).siblings('.countnb').text();
		count--;
		$(this).siblings('.countnb').text(count);
	});
})();

//find connections dropdown (in the header) logic
(function(){
//slides down the content of the accordion when clicking on a title (bulk invites and quick invites)
	$('.accordion').on('click', '.accordion-tab', function(){
		var $this = $(this);
		if($this.hasClass('active-tab')){
			$this.removeClass('active-tab');
			$this.next().slideUp(50);
		}
		else{

			$this.addClass('active-tab');
			$this.next().show(50).siblings('.accordion-content').slideUp();
			$this.siblings().removeClass('active-tab');
		}
	});
//logic for the quick invite accordion
	var MaxInputs = 5;//max number of allowed emails
	var InputsWrapper = $('.input-wrapper');
	var AddButton = $('.add-button');
	var x = InputsWrapper.length;

	$(AddButton).click(function (e)  
	{
	        if(x < MaxInputs && ($('.email-address-input').val() !== 0) )
	        {
	        	$(this).removeAttr('disabled');
	        	$(this).removeClass('disabled');
	            $(InputsWrapper).append('<div><input type="text"  placeholder="Enter email address here.." class="email-address-input"/><a href="#" class="removeclass">&times;</a></div>');
	            x++;
	        }
	        if(x==5) {
	        	$(this).attr('disabled', 'disabled').addClass('disabled');
	        }
		return false;
	});

	$('.accordion-content').on('click','.removeclass', function(e){ //event delegation
        if( x > 1 ) {
            $(this).parent('div').remove();
            x--; 
            $(AddButton).removeAttr('disabled');
            $(AddButton).removeClass('disabled');
            console.log(x);
        }
		return false;
	});

})();

//part of the logic that controls all the dropdowns in the homepage
(function(){
		var open=false;
	
	$('html').click(function() {
	 	$('.dropdown-wrapper').removeClass('active');
		$('.no-tooltip').removeClass('no-tooltip');
		$('.avatar-submenu').hide();
		$('.accordion-tab').not('.find-friends').removeClass('active-tab');
		$('.accordion-tab.find-friends').addClass('active-tab');
		$('.accordion-content.invite-networks').show().siblings('.accordion-content').hide();
		open=false;
	 });
	$('.first-level, .find-connections-dropdown').children('a').click(function(e){e.preventDefault();});

	$('.dropdown-wrapper').children('.dropdown-button').click(function(e){

		var $this = $(this);

		$('.dropdown-wrapper').removeClass('active');
		$('.no-tooltip').removeClass('no-tooltip');

		
		if(open){
			$this.parent().removeClass('active');
			$this.removeClass('no-tooltip');
			open=false;
		}
		else{
			$this.parent().addClass('active');
			$this.addClass('no-tooltip');
			
			open=true;
		}
		$this.parent('.dropdown-wrapper').click(function(e){e.stopPropagation();});

	});

	$('.dropdown-wrapper').children('.dropdown-button').click(function(e){
		$('*').not($(this).parent('.dropdown-wrapper')).removeClass('active');
	});
	

	})();
	(function(){
		$('.talkbox-textarea').on('keydown',function(){
			$('.bucket-list').addClass('active');
			$('.bucket-dropdown').show();
			$('.talk-button').removeClass('off').addClass('on');
		});
		$('.talkbox-textarea').on('focusout',function(){
			$('.talk-button').removeClass('on').addClass('off');
		});
	})();
	
	
//logic for the bucket dropdown and all its checkboxes
(function(){

		var item = $('.list-items .professional, .list-items .personal');
			
		item.children('.arrow').click(function(e){
			$this = $(this).closest('li');
			if($this.hasClass('active')){
				$this.removeClass('active');
				$this.next('.subclass').slideUp(300);
				return;
			}
			$this.addClass('active');
			$this.siblings().next('.subclass').slideUp(300);
			$this.siblings().removeClass('active').trigger('click');
			$this.next('.subclass').slideDown(300);
		});

		var cbprofessional = $('.parent-checkbox.professional');
		var cbpersonal = $('.parent-checkbox.personal');

		var checked = $('.child-checkbox:checked').length;
		var checkedprofessional = $('.professional-subclass .child-checkbox:checked').length;
		var checkedpersonal = $('.personal-subclass .child-checkbox:checked').length;

		console.log(checked);
		
		cbprofessional.on('click', function(){

			if($(this).is(':checked')){

				if(checkedpersonal !== 0){
					$('.bucket-label').text('All Connections');
				}
				else {
					$('.bucket-label').text('Professional');
					console.log(checkedpersonal);
				}
				$(this).closest('li').next('.professional-subclass').find('.child-checkbox').attr('checked', 'checked');
				$('.only-me-checkbox').removeAttr('checked');
				$('.make-public-checkbox').removeAttr('checked');
				checked += 6;
				checkedprofessional = 6;
				console.log(checked);
			}
			else {
				if(cbpersonal.is(':checked')){
					$('.bucket-label').text('Personal');
				}
				else {
					$('.bucket-label').text('Custom');
				}
				$(this).closest('li').next('.professional-subclass').find('.child-checkbox').removeAttr('checked');
				$('.make-public-checkbox').removeAttr('checked');
				checked -= 6;
				checkedprofessional = 0;
				console.log(checked);
			}
		});
		cbpersonal.on('click', function(){
			if($(this).is(':checked')){
				if(checkedprofessional !== 0){
					$('.bucket-label').text('All Connections');
				}
				else {
					$('.bucket-label').text('Personal');
				}
				$(this).closest('li').next('.personal-subclass').find('.child-checkbox').attr('checked', 'checked');
				$('.only-me-checkbox').removeAttr('checked');
				$('.make-public-checkbox').removeAttr('checked');
				checked += 3;
				checkedpersonal =3;
				console.log(checked);
			}
			else {
				if(cbprofessional.is(':checked')){
					$('.bucket-label').text('Professional');
				}
				else {
					$('.bucket-label').text('Custom');
				}
				$(this).closest('li').next('.personal-subclass').find('.child-checkbox').removeAttr('checked');
				$('.make-public-checkbox').removeAttr('checked');
				checked -= 3;
				checkedpersonal = 0;
				console.log(checked);
			}
		});
		
		$('.only-me-checkbox').on('click', function(){
			$('.bucket-label').text('Only Me');
			var $this = $(this);
			if($this.is(':checked')){
				$('.parent-checkbox').removeAttr('checked');
				$('.parent-checkbox').closest('li').next('.subclass').find('.child-checkbox').removeAttr('checked');
				$('.parent-checkbox').closest('li').next('.subclass').slideUp(300);
				$('.parent-checkbox').closest('li').removeClass('active');
				$('.make-public-checkbox').removeAttr('checked');
				checked = 0;
				console.log(checked);
			}
			
		});	
		$('.make-public-checkbox').on('click', function(){
			var $this = $(this);
			if($this.is(':checked')){
				$('.bucket-label').text('Public');
				$('.parent-checkbox').attr('checked', 'checked');
				$('.parent-checkbox').closest('li').next('.subclass').find('.child-checkbox').attr('checked', 'checked');
				// $('.parent-checkbox').closest('li').next('.subclass').slideUp(300);
				$('.only-me-checkbox').removeAttr('checked');
				checked = 9;
				console.log(checked);
			}
			
		});	
		
		$('.child-checkbox').on('click', function(){

			var $this = $(this);

			if($('.only-me-checkbox').is(':checked')){
				$('.only-me-checkbox').removeAttr('checked');
			}
			
			if($this.is(':checked')){
				checked += 1;
				console.log($this.checked);
				console.log(checked);
			}
			else {
				checked -= 1;
				console.log(checked);
			}
			if (checked == 1) {
			    var label = $('.child-checkbox:checked').next('label').text();
			    $('.bucket-label').text(label);
			}
			else{
				$('.bucket-label').text('Custom');
			}

			if($('.professional-subclass').find('.bucket-checkbox:checked').length < 6){
				$(cbprofessional).removeAttr('checked');
			}
			if($('.professional-subclass').find('.bucket-checkbox:checked').length == 6){
				$(cbprofessional).attr('checked', 'checked');
				if($('.personal-subclass').find('.bucket-checkbox:checked').length == 0)
					$('.bucket-label').text('Professional');
			}
		
			if($('.personal-subclass').find('.bucket-checkbox:checked').length < 3){
				$(cbpersonal).removeAttr('checked');
			}
			if($('.personal-subclass').find('.bucket-checkbox:checked').length == 3){
				$(cbpersonal).attr('checked', 'checked');
				if($('.professional-subclass').find('.bucket-checkbox:checked').length == 0)
					$('.bucket-label').text('Personal');
			}
		});


	})();

(function(){
//YOU CAN ADD THIS I JUST ADDED IT FOR EXAMPLE PURPOSE this removes the person in the PYMK widget when u click on the
//small x which appears on hover
	$('.remove-friend-button').click(function(){
		$(this).closest('.friend').fadeOut(300);
	});
//logic for the small menu that appears when u hover over every feed on the wall
	$(document).click(function(){
		$('.hide-menu').removeClass('active');
		$('.x-box').removeClass('no-hover');
		$('.hide-menu-dropdown').hide();
	});
	$('.hide-menu').click(function(e){
		e.stopPropagation();
		$(this).addClass('active');
		$('.x-box').addClass('no-hover');
		$('.hide-menu-dropdown').show();
	});
	$('.feed').on('mouseleave', function(){
		$('.hide-menu-dropdown').hide();
		$('.hide-menu').removeClass('active');
		$('.x-box').removeClass('no-hover');
	});
	//open the "my account" submenu
	$('.other-accounts').click(function(e){
		if($('.avatar-submenu').is(':visible')){
			$('.avatar-submenu').hide();
		}
		else{
			$('.avatar-submenu').show();
		}
		e.preventDefault();
	});
	//switch between states of the talkbox whenever u click on each of the photo/video/doc/status icons below the textarea
	$('.textbox-link').on('click', function(e){
		e.preventDefault();
		var talkboxHeader= $(this).data('textbox');
		$(this).find('a').addClass('active')
				.end().siblings().children('a').removeClass('active');

		$('.'+talkboxHeader).removeClass('hidden').siblings().filter('.talkbox-header').addClass('hidden');
	});
	$('.status-link').on('click', function(e){
		e.preventDefault();
		$(this).find('a').addClass('active')
				.end().siblings().children('a').removeClass('active');

		$('.talkbox-header').addClass('hidden');
	});
	//switch between the sidebar widgets recommendations/requests/birthdays
	$('.widget-title').on('click', function(e){
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		var widget= $(this).data('widget');
		$('.switch-widget.'+widget).removeClass('hidden');
		$('.switch-widget.'+widget).siblings().filter('.switch-widget').addClass('hidden');
	});

	//when the user starts typing in the text area, the talk button becomes on
	$('.talkbox-textarea').on('keydown', function(){
		$('.talk-button').removeClass('off').addClass('on');
	});
	
	$('.talkbox-textarea').focusout(function(){
		$('.talk-button').removeClass('on').addClass('off');
	});
	
	
})();
//logic for the sticky sidebar
	$(window).load(function(){

	    var $win = $(window),
	    $side = $('.main-sidebar'),
	    $stop = $('.sticky'), 
	    sideTop = $side.offset().top,
	    stopTop = $stop.offset().top - 60,
	    scrollTop = 0,
	    isFixed = false;    
	    $('.widget-title').on('click', function(e){
	    	$('.main-sidebar').css('height', '2450px');
	    	//recalculate the offset if one of the above widgets is open
	    	stopTop = $stop.offset().top - 90;

	    });
	   
		$win.on('scroll', function(){
		  scrollTop = $win.scrollTop();
		  if(isFixed){
		    if(scrollTop < stopTop){
		      $side.removeClass('fixed').css('top', 0);
		      isFixed = false;
		    };
		  } else {
		    if(scrollTop >= stopTop){
		      $side.addClass('fixed').css('top', sideTop - stopTop + 'px');
		      isFixed = true;
		    };    
		  };
		});
		//logic for the notification bar which appears once the page is loaded
		$('.notification-bar').css('margin-top', '60px');
		$('.close-notification-bar-icon').on('click', function(){
			$(this).closest('.notification-bar').css('margin-top', '25px');
		});

	});



//remaining controls for the page dropdowns (don'tchange anything here and above)
var dropdownControls = (function() {
 
    var $listItems = $( '.dropdown-wrapper' ),
        $menuItems = $listItems.children( '.dropdown-button' ),
        $body = $( 'body' ),
        current = -1;
 
    function init() {
        $menuItems.on( 'click', open );
        $listItems.on( 'click', function( event ) { event.stopPropagation(); } );
    }
 
    function open( event ) {
 
        if( current !== -1 ) {
            $listItems.eq( current ).removeClass( 'active' );
        }
 
        var $item = $( event.currentTarget ).parent( '.dropdown-wrapper' ),
            idx = $item.index();
 
        if( current === idx ) {
            $item.removeClass( 'active' );
            current = -1;
        }
        else {
            $item.addClass( 'active' );
            current = idx;
            $body.off( 'click' ).on( 'click', close );
        }
 
        return false;
 
    }
 
    function close( event ) {
        $listItems.eq( current ).removeClass( 'active' );
        current = -1;
        $('.avatar-submenu').hide();
    }
 	/////////////////////////////////////////////////////////////////
 	var label = $('.dropdown-label');

	$('.exchange-label').on('click', function(e){
		var $this = $(this);
		$('.network-type').removeClass('active');
		current = -1;
		
		if($this.text() == "Commercial News"){
			$('.network-type').css('width', '170px');
			$('.filter-feed-links').css('padding-left', '0px');
			$('.news-dropdown').addClass('got-bigger');
		}
		else{
			$('.network-type').css('width', '141px');
			$('.filter-feed-links').css('padding-left', '30px');
			$('.news-dropdown').removeClass('got-bigger');
		}
		var menu = $this.children('span').data('menu');
		

		var value = $(this).html(),
			text = $(this).text();
		    initial = label.html(),
			temp = initial;

		 label.html(value);
		 $this.html(temp);
		$('.' + menu).removeClass('hidden').siblings('.filter-feed-links').addClass('hidden');

	});
	/////////////////////////////////////////////////////////////
    return { init : init };
 
})();

(function(){
	dropdownControls.init();
})();

// expanding.js plugin for the expanding textarea in the talkbox

// Expanding Textareas
// https://github.com/bgrins/ExpandingTextareas

(function(factory) {
    // Add jQuery via AMD registration or browser globals
    if (typeof define === 'function' && define.amd) {
        define([ 'jquery' ], factory);
    }
    else {
        factory(jQuery);
    }
}(function ($) {
    $.expandingTextarea = $.extend({
        autoInitialize: true,
        initialSelector: "textarea.expanding",
        opts: {
            resize: function() { }
        }
    }, $.expandingTextarea || {});
    
    var cloneCSSProperties = [
        'lineHeight', 'textDecoration', 'letterSpacing',
        'fontSize', 'fontFamily', 'fontStyle', 
        'fontWeight', 'textTransform', 'textAlign', 
        'direction', 'wordSpacing', 'fontSizeAdjust', 
        'wordWrap', 'word-break',
        'borderLeftWidth', 'borderRightWidth',
        'borderTopWidth','borderBottomWidth',
        'paddingLeft', 'paddingRight',
        'paddingTop','paddingBottom',
        'marginLeft', 'marginRight',
        'marginTop','marginBottom',
        'boxSizing', 'webkitBoxSizing', 'mozBoxSizing', 'msBoxSizing'
    ];
    
    var textareaCSS = {
        position: "absolute",
        height: "100%",
        resize: "none"
    };
    
    var preCSS = {
        visibility: "hidden",
        border: "0 solid",
        whiteSpace: "pre-wrap" 
    };
    
    var containerCSS = {
        position: "relative"
    };
    
    function resize() {
        $(this).closest('.expandingText').find("div").text(this.value.replace(/\r\n/g, "\n") + ' ');
        $(this).trigger("resize.expanding");
    }
    
    $.fn.expandingTextarea = function(o) {
        
        var opts = $.extend({ }, $.expandingTextarea.opts, o);
        
        if (o === "resize") {
            return this.trigger("input.expanding");
        }
        
        if (o === "destroy") {
            this.filter(".expanding-init").each(function() {
                var textarea = $(this).removeClass('expanding-init');
                var container = textarea.closest('.expandingText');
                
                container.before(textarea).remove();
                textarea
                    .attr('style', textarea.data('expanding-styles') || '')
                    .removeData('expanding-styles');
            });
            
            return this;
        }
        
        this.filter("textarea").not(".expanding-init").addClass("expanding-init").each(function() {
            var textarea = $(this);
            
            textarea.wrap("<div class='expandingText'></div>");
            textarea.after("<pre class='textareaClone'><div></div></pre>");
            
            var container = textarea.parent().css(containerCSS);
            var pre = container.find("pre").css(preCSS);
            
            // Store the original styles in case of destroying.
            textarea.data('expanding-styles', textarea.attr('style'));
            textarea.css(textareaCSS);
            
            $.each(cloneCSSProperties, function(i, p) {
                var val = textarea.css(p);
                
                // Only set if different to prevent overriding percentage css values.
                if (pre.css(p) !== val) {
                    pre.css(p, val);
                }
            });
            
            textarea.bind("input.expanding propertychange.expanding keyup.expanding", resize);
            resize.apply(this);
            
            if (opts.resize) {
                textarea.bind("resize.expanding", opts.resize);
            }
        });
        
        return this;
    };
    
    $(function () {
        if ($.expandingTextarea.autoInitialize) {
            $($.expandingTextarea.initialSelector).expandingTextarea();
        }
    });
    
}));

//jTruncate plugin to truncate the text in the notifications dropdown

(function($){$.fn.jTruncate=function(h){var i={length:300,minTrail:20,moreText:"more",lessText:"less",ellipsisText:"...",moreAni:"",lessAni:""};var h=$.extend(i,h);return this.each(function(){obj=$(this);var a=obj.html();if(a.length>h.length+h.minTrail){var b=a.indexOf(' ',h.length);if(b!=-1){var b=a.indexOf(' ',h.length);var c=a.substring(0,b);var d=a.substring(b,a.length-1);obj.html(c+'<span class="truncate_ellipsis">'+h.ellipsisText+'</span>'+'<span class="truncate_more">'+d+'</span>');obj.find('.truncate_more').css("display","none");obj.append('<div class="clearboth">'+'<a href="#" class="truncate_more_link">'+h.moreText+'</a>'+'</div>');var e=$('.truncate_more_link',obj);var f=$('.truncate_more',obj);var g=$('.truncate_ellipsis',obj);e.click(function(){if(e.text()==h.moreText){f.show(h.moreAni);e.text(h.lessText);g.css("display","none")}else{f.hide(h.lessAni);e.text(h.moreText);g.css("display","inline")}return false})}}})}})(jQuery);

