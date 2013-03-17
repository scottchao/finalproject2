/**
 * Por Design Placeholder
 *
 * Copyright (c) 2010 Por Design (pordesign.eu)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($)
{
	$.fn.placeholder = function(options)
	{
		$(this).each( function()
		{
			if ($(this).attr('name') != '' && $(this).attr('name') in options)
			{
				var placeholder = options[$(this).attr('name')];

				$(this).data('placeholder', placeholder);
				
				if ($(this).val() == '')
				{
					$(this).val(placeholder);
					$(this).addClass('placeholder');
				}
			} else
			{
				$(this).data('placeholder', '');
			}
		});

		$(this).focus( function()
		{
			if ($(this).val() == $(this).data('placeholder'))
			{
				$(this).val('');
				$(this).removeClass('placeholder');
			}
		});
			
		$(this).blur( function()
		{
			if ($(this).val() == '')
			{
				$(this).val($(this).data('placeholder'));
				$(this).addClass('placeholder');
			}
		});

		$(this).parents('form').submit( function()
		{
			$(this).find('input, textarea').each( function()
			{
				if ($(this).data('placeholder') != '')
				{
					if ($(this).val() == $(this).data('placeholder'))
					{
						$(this).val('');
					}
				}
				
				$(this).blur();
			});
		});

		return this;
	}
})(jQuery);
