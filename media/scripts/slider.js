/**
 * Por Design Slider
 *
 * Copyright (c) 2010 Por Design (pordesign.eu)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * NOTE: pagination works only for options.visible = 1
 *
 */

(function($)
{
	$.fn.slider = function(options)
	{
		var $sliders = $(this);
		
		var options = $.extend
		({
			nav: 'ul.nav',
			pagination: 'ul.pagination',
			items: 'ul.items',
			item: options.item,
			visible: 3,
			slide: 1,
			speed: 200,
			auto_width: true,
			width: null,
			height: null,
			wrapper_class: 'slider-wrapper',
			fade: false,
			auto_slide: false,
			auto_delay: 500,
			auto_direction: 'right',
			easing: 'swing',
			auto_height: true,
			auto_height_parent: false,
			count: null,
			axis: 'x',
			on_show: null
		}, options);
		
		$sliders.each( function()
		{
			var $slider = $(this);
			
			var $slider_nav = $(this).children(options.nav);
			var $slider_pagination = $(this).children(options.pagination);
			var $slider_items = $(this).children(options.items);
				
			$slider_items.after($slider_items.clone().hide());
				
			var $slider_items_content = $(this).children(options.items).eq(1);
			
			$slider_items.css
			({
				'position': 'absolute',
				'width': (options.axis == 'x' ? 9999 : 'auto'),
				'height': (options.axis == 'y' ? 9999 : 'auto')
			}).wrap
			(
				$('<div />').addClass(options.wrapper_class).css
				({
					'position': 'relative',
					'overflow': 'hidden',
					'height': (options.axis == 'x' ? $slider_items.outerHeight(true) : 'auto'),
					'width': (options.auto_width ? 'auto': options.width)
				})
			).children(options.item).css
			({
				'float': 'left'
			});
			
			if (options.count == null)
			{
				options.count = $slider_items.children(options.item).length;
			}
				
			$slider_items.children(options.item).remove();
			$slider_items.data('last-index', options.visible);
			
			var height = 0;
			
			for (i = 0; i < options.visible; i++)
			{
				$item = $slider_items_content.children(options.item).eq(i).clone();
				
				if (options.on_show != null)
				{
					options.on_show($item);
				}
				
				$slider_items.append($item);
				
				if (options.auto_height)
				{
					if (options.axis == 'x')
					{
						if ($slider_items.children(options.item).last().outerHeight(true) > height)
						{
							height = $slider_items.children(options.item).last().outerHeight(true);
						}
					} else
					{
						height += $slider_items.children(options.item).last().outerHeight(true);
					}
				}
			}

			if (options.auto_height && height != 0)
			{
				if (options.auto_height_parent)
				{
					$slider_items.parent('div.' + options.wrapper_class).parent().height(height);
				} else
				{
					$slider_items.parent('div.' + options.wrapper_class).height(height);
				}
			}
			
			if ( ! options.auto_height && options.height != null)
			{
				$slider_items.parent('div.' + options.wrapper_class).height(options.height);
			}
			
			slider_item = function()
			{
				var $slider = $(this).data('slider');
				var options = $slider.data('options');
				var $slider_pagination = $slider.children(options.pagination);
				var $slider_items = $slider.children('div.' + options.wrapper_class).children(options.items);				
				var $slider_items_content = $slider.children(options.items);
				var item = $slider_pagination.children(options.item).index(this);
				
				if (options.count > options.visible)
				{
					if ($slider_items.is(':not(:animated)'))
					{
						var start_index = $slider_items.data('last-index') - 1;
						var height = 0;

						if (item < start_index)
						{
							var $item = $slider_items_content.children(options.item).eq(item).clone();
							
							if (options.on_show)
							{
								options.on_show($item);
							}
							
							$slider_items.prepend($item);
								
							if (options.auto_height)
							{
								if (options.axis == 'x')
								{
									if ($slider_items.children(options.item).first().outerHeight(true))
									{
										height = $slider_items.children(options.item).first().outerHeight(true);
									}
								} else
								{
									height += $slider_items.children(options.item).first().outerHeight(true);
								}
							}
								
							$slider_items.data('last-index', (item + 1 >= options.count ? 0 : item + 1));
						} else if (item > start_index)
						{
							var $item = $slider_items_content.children(options.item).eq(item).clone();
							
							if (options.on_show != null)
							{
								options.on_show($item);
							}
							
							$slider_items.append($item);
							
							if (options.auto_height)
							{
								if (options.axis == 'x')
								{
									if ($slider_items.children(options.item).last().outerHeight(true))
									{
										height = $slider_items.children(options.item).last().outerHeight(true);
									}
								} else
								{
									height += $slider_items.children(options.item).last().outerHeight(true);
								}
							}
							
							$slider_items.data('last-index', (item + 1 >= options.count ? 0 : item + 1));
						}
						
						if (item != start_index)
						{
							$slider_pagination.children(options.item).removeClass('current').eq(item).addClass('current');
							
							if (item < start_index)
							{
								$slider_items.css((options.axis == 'x' ? 'left' : 'top'), -(options.axis == 'x' ? $slider_items.children(options.item).outerWidth(true) : $slider_items.children(options.item).outerHeight(true)) * options.slide);
							}
								
							if (options.fade)
							{
								if (item < start_index)
								{
									$slider_items.children(options.item).last().fadeOut(options.speed);
								} else
								{
									$slider_items.children(options.item).first().fadeOut(options.speed);
								}
							}
							
							if (options.auto_height && height != 0)
							{
								if (options.auto_height_parent)
								{
									$slider_items.parent('div.' + options.wrapper_class).parent().animate
									({
										'height': height
									}, options.speed);
								} else
								{
									$slider_items.parent('div.' + options.wrapper_class).animate
									({
										'height': height
									}, options.speed);
								}
							}
							
							if (item < start_index)
							{
								if (options.axis == 'x')
								{
									$slider_items.animate
									({
										'left': '+=' + $slider_items.children(options.item).outerWidth(true) * options.slide
									}, options.speed, options.easing, function()
									{
										for (i = 0; i < options.slide; i++)
										{
											$slider_items.children(options.item).last().remove();
										}
									});
								} else
								{
									$slider_items.animate
									({
										'top': '+=' + $slider_items.children(options.item).outerHeight(true) * options.slide
									}, options.speed, options.easing, function()
									{
										for (i = 0; i < options.slide; i++)
										{
											$slider_items.children(options.item).last().remove();
										}
									});
								}
							} else
							{
								if (options.axis == 'x')
								{
									$slider_items.animate
									({
										'left': '-=' + $slider_items.children(options.item).outerWidth(true) * options.slide
									}, options.speed, options.easing, function()
									{
										$slider_items.css('left', 0);

										for (i = 0; i < options.slide; i++)
										{
											$slider_items.children(options.item).first().remove();
										}
									});
								} else
								{
									$slider_items.animate
									({
										'top': '-=' + $slider_items.children(options.item).outerHeight(true) * options.slide
									}, options.speed, options.easing, function()
									{
										$slider_items.css('top', 0);

										for (i = 0; i < options.slide; i++)
										{
											$slider_items.children(options.item).first().remove();
										}
									});
								}
							}
						}
					}
				}
					
				return false;
			}
				
			slide_left = function()
			{
				var $slider = $(this).data('slider');
				var options = $slider.data('options');
				var $slider_nav = $slider.children(options.nav);
				var $slider_pagination = $slider.children(options.pagination);
				var $slider_items = $slider.children('div.' + options.wrapper_class).children(options.items);				
				var $slider_items_content = $slider.children(options.items);

				if (options.count > options.visible)
				{
					if ($slider_items.is(':not(:animated)'))
					{
						var start_index = $slider_items.data('last-index') - options.visible - 1;
						var height = 0;
						
						for (i = start_index; i > start_index - options.slide ; i--)
						{
							if (i < 0)
							{
								var index = $slider_items_content.children(options.item).length + i;
							} else
							{
								var index = i;
							}
							
							var $item = $slider_items_content.children(options.item).eq(index).clone();
							
							if (options.on_show != null)
							{
								options.on_show($item);
							}
			
							$slider_items.prepend($item);
							
							if (options.auto_height)
							{
								if (options.axis == 'x')
								{
									if ($slider_items.children(options.item).first().outerHeight(true))
									{
										height = $slider_items.children(options.item).first().outerHeight(true);
									}
								} else
								{
									height += $slider_items.children(options.item).first().outerHeight(true);
								}
							}
							
							$slider_items.data('last-index', index + options.visible);
						}
						
						$slider_pagination.children(options.item).removeClass('current').eq(index).addClass('current');
						
						$slider_items.css((options.axis == 'x' ? 'left' : 'top'), -(options.axis == 'x' ? $slider_items.children(options.item).outerWidth(true) : $slider_items.children(options.item).outerHeight(true)) * options.slide);
							
						if (options.fade)
						{
							for (i = $slider_items.children(options.item).length - 1; i > $slider_items.children(options.item).length - options.slide - 1; i--)
							{
								$slider_items.children(options.item).eq(i).fadeOut(options.speed);
							}
						}
						
						if (options.auto_height && height != 0)
						{
							if (options.auto_height_parent)
							{
								$slider_items.parent('div.' + options.wrapper_class).parent().animate
								({
									'height': height
								}, options.speed);
							} else
							{
								$slider_items.parent('div.' + options.wrapper_class).animate
								({
									'height': height
								}, options.speed);
							}
						}
						
						if (options.axis == 'x')
						{
							$slider_items.animate
							({
								'left': '+=' + $slider_items.children(options.item).outerWidth(true) * options.slide
							}, options.speed, options.easing, function()
							{
								for (i = 0; i < options.slide; i++)
								{
									$slider_items.children(options.item).last().remove();
								}
							});
						} else
						{
							$slider_items.animate
							({
								'top': '+=' + $slider_items.children(options.item).outerHeight(true) * options.slide
							}, options.speed, options.easing, function()
							{
								for (i = 0; i < options.slide; i++)
								{
									$slider_items.children(options.item).last().remove();
								}
							});
						}
					}
				}
					
				return false;
			};
			
			slide_right = function()
			{
				var $slider = $(this).data('slider');
				var options = $slider.data('options');
				var $slider_nav = $slider.children(options.nav);
				var $slider_items = $slider.children('div.' + options.wrapper_class).children(options.items);
				var $slider_items_content = $slider.children(options.items);
				
				if (options.count > options.visible)
				{
					if ($slider_items.is(':not(:animated)'))
					{
						var start_index = $slider_items.data('last-index');
						var height = 0;
						
						for (i = start_index; i < start_index + options.slide ; i++)
						{
							if (i >= $slider_items_content.children(options.item).length)
							{
								var index = i - $slider_items_content.children(options.item).length;
							} else
							{
								var index = i;
							}
							
							var $item = $slider_items_content.children(options.item).eq(index).clone();
							
							if (options.on_show != null)
							{
								options.on_show($item);
							}
							
							$slider_items.append($item);
							
							if (options.auto_height)
							{
								if (options.axis == 'x')
								{
									if ($slider_items.children(options.item).last().outerHeight(true))
									{
										height = $slider_items.children(options.item).last().outerHeight(true);
									}
								} else
								{
									height += $slider_items.children(options.item).last().outerHeight(true);
								}
							}
							
							$slider_items.data('last-index', index + 1);
						}
						
						$slider_pagination.children(options.item).removeClass('current').eq(index).addClass('current');
							
						if (options.fade)
						{
							for (i = 0; i < options.slide; i++)
							{
								$slider_items.children(options.item).eq(i).fadeOut(options.speed);
							}
						}
						
						if (options.auto_height && height != 0)
						{
							if (options.auto_height_parent)
							{
								$slider_items.parent('div.' + options.wrapper_class).parent().animate
								({
									'height': height
								}, options.speed);
							} else
							{
								$slider_items.parent('div.' + options.wrapper_class).animate
								({
									'height': height
								}, options.speed);
							}
						}
						
						if (options.axis == 'x')
						{
							$slider_items.animate
							({
								'left': '-=' + $slider_items.children(options.item).outerWidth(true) * options.slide
							}, options.speed, options.easing, function()
							{
								$slider_items.css('left', 0);

								for (i = 0; i < options.slide; i++)
								{
									$slider_items.children(options.item).first().remove();
								}
							});
						} else
						{
							$slider_items.animate
							({
								'top': '-=' + $slider_items.children(options.item).outerHeight(true) * options.slide
							}, options.speed, options.easing, function()
							{
								$slider_items.css('top', 0);
								
								for (i = 0; i < options.slide; i++)
								{
									$slider_items.children(options.item).first().remove();
								}
							});
						}
					}
				}
					
				return false;
			};
			
			$slider.data('options', options);
			$slider_nav.children('li.prev').data('slider', $slider).click(slide_left);
			$slider_nav.children('li.next').data('slider', $slider).click(slide_right);
			
			$slider_pagination.children(options.item).data('slider', $slider).click(slider_item);
				
			if (options.auto_slide)
			{
				auto_timeout = setTimeout( function()
				{
					setInterval( function()
					{
						if (options.auto_direction == 'left')
						{
							$slider.children(options.nav).children('li.prev').click();
						} else
						{
							$slider.children(options.nav).children('li.next').click();
						}
					}, options.auto_delay);
					
					clearTimeout(auto_timeout);
				}, options.auto_delay);
			}
		});
	
		return this;
	}
})(jQuery);
