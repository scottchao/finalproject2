if (top !== self) top.location.replace(self.location.href);

// SHADOWBOX BEGIN

Shadowbox.init();

// SHADOWBOX END

$( function()
{
	// JS SUPPORT BEGIN

	$('body').addClass('js');
	
	// JS SUPPORT END
	
	// TOGGLE BEGIN
	
	$('a.toggle').each( function()
	{
		if ( ! $(this).hasClass('hide'))
		{
			$(this).next().hide();
		} else
		{
			$(this).next().show();
		}
	});
	
	$('a.toggle').click( function()
	{
		$(this).toggleClass('hide');
		
		if ($(this).hasClass('hide'))
		{
			$(this).next().show();
		} else
		{
			$(this).next().hide();
		}
		
		return false;
	});
	
	// TOGGLE END
	
	// DESCRIPTION FOR IMAGES FROM TITLE ATTRIBUTE BEGIN
	
	$('a.frame-holder > img').each( function()
	{
		if ($(this).attr('title') != '')
		{
			title = $(this).attr('title');

			$(this).after
			(
				$('<span />').addClass('title-description').text(title)
			);
			
			if ($(this).hasClass('aligncenter') || $(this).parent('a.frame').hasClass('aligncenter'))
			{
				$(this).load( function()
				{
					$img = $(this);
					
					$(this).parent('a.frame').css
					({
						'width': $img.width()
					});
				});
			}
		}
	});
	
	$('.frame-holder > *').each( function()
	{
		if ($(this)[0].tagName.toLowerCase() != 'img' && $(this)[0].tagName.toLowerCase() != 'span')
		{
			$(this).parent('.frame-holder').width($(this).width());
		}
	});
	
	// DESCRIPTION FOR IMAGES FROM TITLE ATTRIBUTE END
	
	// SCROLL TOP BEGIN
	
	$('a[href=#header], .separator').click( function()
	{
		$('html,body').animate
		({
			'scrollTop': 0
		}, 300);
		
		return false;
	});
	
	// SCROLL TOP END
	
	// FORM VALIDATION BEGIN
	
	$(config.form_validate).blur( function()
	{
		var val = $(this).val();

		$(this).removeClass('valid');
			
		if (val == '' || val == $(this).data('placeholder'))
		{
			$(this).addClass('error');
		} else
		{
			if ($(this).attr('name') == 'email' || $(this).attr('id') == 'email' || $(this).hasClass('email'))
			{
				if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val))
				{
					$(this).removeClass('error').addClass('valid');
				} else
				{
					$(this).addClass('error');
				}
			} else
			{
				$(this).removeClass('error').addClass('valid');
			}
		}
	});
	
	$('form').submit( function()
	{
		if ($(this).find('input.error, textarea.error').length > 0)
		{
			return false;
		}
	});

	// FORM VALIDATION END
	
	// FORM PLACEHOLDERS BEGIN
	
	$(config.input_placeholder).placeholder(config.placeholder);
		
	// FORM PLACEHOLDERS END
	
	// ZOOMBOX BEGIN

	$('div.zoombox').each( function()
	{
		var item_width = $(this).children('ul.images').children('li').width();

		var $enlarged = $(this).children('div.enlarged');
		var $img = $(this).children('div.enlarged').children('img');
		
		if ($(this).parent().width() < $enlarged.width())
		{
			$enlarged.width($(this).parent().width());
		}
		
		$img.load( function()
		{
			$(this).css
			({
				'position': 'absolute',
				'top': $enlarged.height()/2 - $img.height()/2,
				'left': $enlarged.width()/2 - $img.width()/2
			});
		});
		
		$(this).slider
		({
			nav: 'ul.slider-nav',
			items: 'ul.images',
			visible: Math.round(($(this).width() / item_width)) - 2,
			slide: 2,
			speed: 600,
			auto_width: false,
			width: $enlarged.width() - item_width
		});
	});
	
	$('div.zoombox div.enlarged').mousemove( function(e)
	{
		var $enlarged = $(this);
		var $img = $enlarged.children('img');
		
		if ($img.width() > $enlarged.width() || $img.height() > $enlarged.height())
		{
			var x = $img.width()/2 - ((e.pageX - $enlarged.offset().left) / $enlarged.outerWidth() * $img.width());
			var y = $img.height()/2 - ((e.pageY - $enlarged.offset().top) / $enlarged.outerHeight() * $img.height());
			var offsetx = $enlarged.outerWidth()/2 - (e.pageX - $enlarged.offset().left);
			var offsety = $enlarged.outerHeight()/2 - (e.pageY - $enlarged.offset().top);

			$img.css
			({
				'top': $enlarged.outerHeight()/2 - $img.height() / 2 + y - offsety, 
				'left': $enlarged.outerWidth()/2 - $img.width() / 2 + x - offsetx 
			});
		}
	});

	$('div.zoombox ul.images li').live('click', function()
	{
		var $this = $(this);

		var $zoombox = $(this).parents('div.zoombox');
		var $enlarged = $zoombox.children('div.enlarged');
		
		var $img = $enlarged.children('img');
		
		$img.imgload($this.children('a').attr('href'), { path: config.images_dir, use_parent: true }).load( function()
		{
			$(this).css
			({
				'top': $enlarged.height()/2 - $(this).height()/2,
				'left': $enlarged.width()/2 - $(this).width()/2
			});
		});

		return false;
	});
	
	// ZOOMBOX END
	
	// PIP BEGIN
	
	$('div.pip ul.images').each( function()
	{
		$(this).css('width', 'auto');
		$(this).css('margin-left', -($(this).width() / 2));
	});
	
	$('div.pip ul.images li').click( function()
	{
		var $this = $(this);

		var $pip = $(this).parents('div.pip');
		var $enlarged = $pip.children('div.enlarged');
		
		var $img = $enlarged.children('img');
		
		$img.imgload($this.children('a').attr('href'), { path: config.images_dir, use_parent: true });

		return false;
	});
	
	// PIP END
	
	// TESTIMONIALS BEGIN
	
	$('div.sidebar div.testimonials ul.items li').show();
	
	$('div.sidebar div.testimonials').each( function()
	{
		width = $(this).width();
		
		$(this).children('ul.items').children('li').css('width', width - 2);
	});

	$('div.sidebar div.testimonials').slider
	({
		nav: 'ul.slider-nav',
		items: 'ul.items',
		visible: 1,
		slide: 1,
		auto_height_parent: true
	});

	// TESTIMONIALS END
	
	// FEATURED SLIDER BEGIN
	
	$('div#title div#featured ul.items li').show();
	
	$('div#title div#featured').each( function()
	{
		width = $(this).width();
		
		$(this).children('ul.items').children('li').css('width', width).css('display', 'list-item');
	});

	$('div#title div#featured').slider
	({
		nav: 'ul.slider-nav',
		items: 'ul.items',
		visible: 1,
		slide: 1
	});

	// FEATURED SLIDER END
	
	// SUCCESS STORIES BEGIN
	
	
	$('div.success-stories ul.items li').show();
	
	$('div.success-stories').each( function()
	{
		width = $(this).width();
		
		$(this).children('ul.items').children('li').css('width', width).css('display', 'list-item');
	});

	$('div.success-stories').slider
	({
		nav: 'ul.slider-nav',
		items: 'ul.items',
		pagination: 'ul.slider-pagination',
		wrapper_class: 'success-stories-wrapper',
		visible: 1,
		slide: 1
	});

	// SUCCESS STORIES END
	
	// CLIENTS SLIDER BEGIN
	
	$('div.clients ul.items li').show();
	
	$('div.clients').slider
	({
		nav: 'ul.slider-nav',
		items: 'ul.items',
		wrapper_class: 'clients-wrapper',
		visible: 5,
		slide: 2
	});
	
	// CLIENTS SLIDER END
	
	// ROUNDABOUT BEGIN
	
	$('ul.roundabout').css
	({
		'margin': '0 auto',
		'display': 'block',
		'float': 'none',
		'width': '620px'
	});

	$('ul.roundabout li').css
	({
		'margin': 0,
		'overflow': 'hidden'
	});
	
	$('ul.roundabout li > a > img').css
	({
		'width': '100%',
		'height': '100%'
	});

	$('ul.roundabout').roundabout
	({
		minScale: 0.65,
		childSelector: 'li'
	});
	
	// ROUNDABOUT END
	
	// TOOLTIPS BEGIN
	
	$(config.tooltips).tooltip
	({
		tooltip: '.tooltip',
		x: 32,
		y: -40,
		offset: true,
		sub_width: true,
		sub_height: true,
		standalone: true
	});
		
	$(config.tooltips).hover(function() { $(this).children('.tooltip').hide();});
	
	// TOOLTIPS END
	
	// TOOLTIPS FOR TABLES BEGIN
	
	$('td').each( function()
	{
		if (typeof $(this).attr('custom-description') != 'undefined' && $(this).attr('custom-description') != '')
		{
			desc = $(this).attr('custom-description');
			$(this).append($('<span />').hide().addClass('tooltip').text(desc));
		}
	});
	
	$('td').tooltip
	({
		tooltip: '.tooltip',
		x: -20,
		y: -100,
		offset: false,
		sub_height: true
	});
	
	// TOOLTIPS FOR TABLES END
	
	// CUSTOM MENU BEGIN

	$('ul.menu-1 li:not(.current) ul').hide();

	$('ul.menu-1 li > a').click( function(e)
	{
		var $current = $(this).parent('li');
		var $siblings = $(this).parent('li').siblings();
	
		$current.addClass('current');
		$current.children('ul').slideDown(500);
		
		if ($siblings.find('ul:visible').length > 0)
		{
			$siblings.find('ul:visible').slideUp(500, function()
			{
				$(this).parent('li').removeClass('current');
			});
		} else
		{
			$siblings.removeClass('current');
		}
		
		$current.parents('li').each( function()
		{
			$(this).removeClass('current');
			$(this).children('ul').show();
		});
	
		if ($(e.target).next('ul').length > 0)
		{
			return false;
		}
	});

	// CUSTOM MENU END

	// FEATURED POSTS BEGIN
	
	$('div.widget div.featured ul.items li').show();
	$('div.widget div.featured').each( function()
	{
		//$(this).width($(this).parent().width());
		var width = $(this).width() - 30;

		$(this).children('ul.items').children('li').css('width', width).css('display', 'list-item');
	});
	
	$('div.widget div.featured').slider
	({
		nav: 'ul.slider-nav',
		items: 'ul.items',
		visible: 1,
		slide: 1,
		auto_height: true,
		auto_height_parent: false
	});
	
	// FEATURED POSTS END
	
	$('div.media-slider ul.items li').show();
	$('div.media-slider').slider
	({
		items: 'ul.items',
		visible: 1,
		slide: 1,
		pagination: 'ul.slider-pagination'
	});
	
	// NIVO SLIDER BEGIN
	
	$('div.nivo-slider').nivoSlider();
	
	// NIVO SLIDER END
	
	// SUPERFISH BEGIN
	
	$('#nav > ul').superfish
	({
		autoArrows: false,
		dropShadows : false
	});
	
	$('#nav li:has(ul)').addClass('parent');

	// SUPERFISH END
	
	// JQUERY GLOWING BEGIN
	
	$('#nav ul ul span').each( function()
	{
		$(this).addGlow({ textColor: '#fff', haloColor: '#fff', radius: 1 });
	});
	
	$('a:not(ul ul span a):not(h1 a):not(.menu-1 a):not(.hr)').each( function()
	{
		$(this).addGlow({ textColor: '#cf1919', haloColor: '#cf1919', radius: 1 });
	});

	// JQUERY GLOWING END
});

$(window).ready( function()
{
	$('.main #twitter_div').slider
	({
		items: 'ul.items',
		visible: 2,
		slide: 1,
		nav: 'ul.slider-nav',
		axis: 'y',
		auto_height: false,
		height: 122 * 2
	});
	
	$('#twitter_div.type-1').slider
	({
		items: 'ul.items',
		visible: 3,
		slide: 3,
		nav: 'ul.slider-nav',
		axis: 'y',
		auto_height: true
	});
});

// QUICKSAND AJAX SAMPLE BEGIN

var FILTER_SLUG = '';
var FILTER_ITEMS = [];
var FILTER_COUNTER = 0;

function setup_filter(element, url, callback)
{
	$('ul.filters').hover( function()
	{
		
	}, function()
	{
		var $filter = $(this).find('input[type=checkbox]:checked');
		var categories = [];

		$filter.each( function()
		{
			categories.push($(this).attr('name'));
		});
		
		if (categories.join(',') != FILTER_SLUG && categories.join(',') != '')
		{
			FILTER_SLUG = categories.join(',');
			FILTER_ITEMS = [];
			FILTER_COUNTER = 0;
			
			$.each(categories, function(i, category)
			{
				$.get(url + '/' + category + '.html', function(data)
				{
					FILTER_ITEMS = $.merge(FILTER_ITEMS, $(data).children('li'));
					FILTER_COUNTER++;
					
					if (FILTER_COUNTER == FILTER_SLUG.split(',').length)
					{
						$(element).quicksand(FILTER_ITEMS, { adjustHeight: 'dynamic', enhancement: callback });
					}
				});
			});
		}
	});
}

function setup_pagination(element, dest, url, callback)
{
	$(element).click( function()
	{
		$.get(url + '.html', function(data)
		{
			var $items = $(data).children('li');
			
			$items.each( function()
			{
				$(this).attr('data-id', 'a' + Math.floor(Math.random() * 10000));
			});

			$(dest).quicksand($items.slice(0, $(dest).children('li').length), { adjustHeight: 'dynamic', enhancement: callback });
		});
		
		return false;
	});
}

// QUICKSAND AJAX SAMPLE END

// FLICKR CALLBACK BEGIN

function flickr_callback(data)
{
	var even = true;
	$.each(data.items, function(i, item)
	{
		$('div.flickr-feed').each( function()
		{
			if ( ! even)
			{
				$(this).children('ul.items').append
				(
					$('<li />').append
					(
						$('<a />').addClass('frame-holder').addClass('alignleft').attr('href', item.link).attr('rel', 'lightbox')
						.append
						(
							$('<img/>').attr('src', item.media.m).width(112).height(112)
						)
					).css('width', 112)
				);
			} else
			{
				$(this).children('ul.items').children('li:last').append
				(
					$('<a />').addClass('frame-holder').addClass('alignleft').attr('href', item.link).attr('rel', 'lightbox')
					.append
					(
						$('<img/>').attr('src', item.media.m).width(112).height(112)
					)
				);
			}
		});
		
		even = !even;
	});
	
	$('div.flickr-feed').slider
	({
		nav: 'ul.slider-nav',
		items: 'ul.items',
		visible: 2,
		slide: 2,
		speed: 500,
		auto_height: false,
		height: 258
	});
}

// FLICKR CALLBACK END
