/**
 * Por Design Image Loading
 *
 * Copyright (c) 2010 Por Design (pordesign.eu)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 *
 */

(function($)
{
	$.imgload_images = [];

	$.fn.imgload = function(src, options)
	{
		var options = $.extend
		({
			path: '',
			use_parent: false
		}, options);

		$(this).each( function()
		{
			var exists = false;

			for (var i = 0; i < $.imgload_images.length; i++)
			{
				if ($.imgload_images[i] == src)
				{
					exists = true;
					break;
				}
			}
			
			if ($(this).attr('src') == src)
			{
				exists = true;
			}
			
			if ( ! exists)
			{
				$img = $(this);

				var left = $img.position().left;
				var top = $img.position().top;
				
				if (options.use_parent)
				{
					var width = $img.parent().width();
					var height = $img.parent().height();
				} else
				{
					var width = $img.width();
					var height = $img.height();
				}

				$(this).next('loading').remove();
				$(this).next('loading-wrapper').remove();
				
				$loading_wrapper = $('<div />');
				$loading_wrapper.addClass('loading-wrapper');
				$loading_wrapper.css
				({
					'background': '#000',
					'position': 'absolute',
					'left': (options.use_parent ? 0 : left),
					'top': (options.use_parent ? 0 : top),
					'width': width,
					'height': height,
					'z-index': 6666,
					'opacity': 0.8
				}).hide();
				
				$loading = $('<div />');
				$loading.addClass('loading');
				
				$loading.css
				({
					'background': 'transparent url(' + options.path + 'loading.gif) 50% 50% no-repeat',
					'position': 'absolute',
					'left': (options.use_parent ? 0 : left),
					'top': (options.use_parent ? 0 : top),
					'width': width,
					'height': height,
					'z-index': 6667
				}).hide();
				
				$loading.fadeIn();
				$loading_wrapper.fadeIn();
				
				$(this).after($loading_wrapper);
				$(this).after($loading);
				
				if (typeof src == 'undefined')
				{
					src = $(this).attr('src');
				}
				
				$(this).attr('src', src/* + '?' + new Date().getTime()*/).bind('load', function()
				{
					$(this).unbind('load');

					$(this).nextAll('.loading').fadeOut(function() { $(this).remove(); });
					$(this).nextAll('.loading-wrapper').fadeOut(function() { $(this).remove(); });
					
					$.imgload_images.push($(this).attr('src').split('?')[0]);
				});
			} else
			{
				$(this).attr('src', src);
			}
		});
		
		return this;
	};
})(jQuery);
