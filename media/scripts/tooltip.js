/**
 * Por Design Tooltip
 *
 * Copyright (c) 2010 Por Design (pordesign.eu)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($)
{
	$.fn.tooltip = function(options)
	{
		var $tooltips = $(this);
		
		var options = $.extend
		({
			index: 9999,
			tooltip: 'div.tooltip',
			fade: false,
			fade_speed: 500,
			x: 0,
			y: 0,
			sub_width: false,
			sub_height: false,
			follow: true,
			offset: true,
			standalone: false
		}, options);
		
		var $tooltip_trigger = $tooltips;
			
		if (options.follow)
		{
			$tooltip_trigger.css
			({
				'position': 'relative'
			});
				
			$tooltip_trigger.children(options.tooltip).css
			({
				'position': 'absolute',
				'z-index': options.index
			});
		}
			
		$tooltip_trigger.live('mouseenter', function(event)
		{
			var $tooltip = $(this).children(options.tooltip);
			
			if (options.standalone)
			{
				$('body').append($tooltip.clone());
					
				$tooltip = $('body > ' + options.tooltip).last();
			}
				
			if (options.fade)
			{
				$tooltip.not(':animated').fadeIn(options.fade_speed);
			} else
			{
				$tooltip.show();
			}
		});
			
		$tooltip_trigger.live('mouseleave', function()
		{
			var $tooltip = $(this).children(options.tooltip);
				
			if (options.standalone)
			{
				$tooltip = $('body > ' + options.tooltip).last();
			}
				
			if (options.fade)
			{
				$tooltip.fadeOut(options.speed, function()
				{
					if (options.standalone)
					{
						$tooltip.remove();
					}
				});
			} else
			{
				$tooltip.hide();
					
				if (options.standalone)
				{
					$tooltip.remove();
				}
			}
		});
			
		if (options.follow)
		{
			$tooltip_trigger.live('mousemove', function(event)
			{
				var $this = $(this);
				var $tooltip = $(this).children(options.tooltip);
				
				if (options.standalone)
				{
					$tooltip = $('body > ' + options.tooltip).last();
				}

				$tooltip.css
				({
					'top': event.pageY + (options.offset && ! options.standalone ? -$this.offset().top : 0) + options.y - (options.sub_height ? $tooltip.height() : 0),
					'left': event.pageX + (options.offset && ! options.standalone ? -$this.offset().left : 0) + options.x - (options.sub_width ? $tooltip.width() : 0)
				});
			});
		}
	
		return this;
	}
})(jQuery);
