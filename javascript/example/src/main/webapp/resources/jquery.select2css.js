/*#############################################################
Name: Select to CSS
Version: 0.2
Author: Utom
URL: http://utombox.com/
#############################################################*/
/**
 * 修改成jquery插件, 并且在页面全部载入之后才执行
 */
(function($) {
	$.fn.select2css = function(){
		$(document).bind('click', function(){
			$('.select_box').removeClass('select_box_open');
			$('.tag_options').hide();
		});
		return $(this).each(function(){
			if(!$(this).is('select')){
				return;
			}
			var select = $(this);
			var style = select.attr('style');
			var regex_w = /width:\s*(\d+)px/ig;
			var regex_h = /height:\s*(\d+)px/ig;
			var _css_width = regex_w.exec(style);
			var _css_height = regex_h.exec(style);
			var css_width = _css_width!=null?_css_width[1]:null;
			var css_height = _css_height!=null?_css_height[1]:null;
			var width = css_width || select.outerWidth();
			var height = css_height || select.outerHeight();
			width -= 2;
			height -= 2;
			var name = select.attr('name');
			var padding = 20;
			select.css('display', 'none');
			var select_box = $('<div class="select_box"></div>').attr('id', 'for_' + name).insertBefore(select);
			select_box.attr('fmp_for', name).width(width).height(height);
			var select_show = $('<div class="select_show" style="cursor:pointer;"></div>').height(height)
				.width(width - padding).css({'line-height': height + 'px', 'background-position' : width - 14 + 'px center'});
			select_box.append(select_show);
			select_show.hover(function(){
				select_box.addClass('select_box_hover');
			}, function(){
				select_box.removeClass('select_box_hover');
			}).click(function(event){
				event.stopPropagation();
				if(options_ul.is(':visible')){
					select_box.removeClass('select_box_open');
					options_ul.hide();
				}else{
					select_box.addClass('select_box_open');
					options_ul.css('left', select_box.offset().left).show();
					//IE6 not properly show the class
					options_ul.find('.option_selected').removeClass('option_selected').addClass('option_selected');
				}
			});
			var options_ul = $('<ul class="tag_options" style="margin:0;"></ul>');
			options_ul.width(width);
			select_box.append(options_ul);
			//rebuild options
			select.find('option').each(function(index){
				var option = $(this);
				var option_li = $('<li></li>').width(width - padding)
					.height(height - 2).css('line-height', height - 2 + 'px').text(option.text()).attr('fmp_value', option.attr('value'));
				options_ul.append(option_li);
				option_li.css('cursor', 'pointer');
				option_selected = option.prop('selected');
				if(option_selected){
					option_li.addClass('option_selected');
					options_ul.data('selected', option_li);
					select_show.text(option_li.text());
				}
				option_li.hover(function(){
					option_li.addClass('option_hover');
				}, function(){
					option_li.removeClass('option_hover');
				}).click(function(event){
					event.stopPropagation();
					select.val(option_li.attr('fmp_value'));
					select.trigger('blur');
					select.trigger('change');
					options_ul.data('selected').removeClass('option_selected');
					options_ul.data('selected', option_li);
					option_li.addClass('option_selected');
					select_box.removeClass('select_box_open');
					select_show.text(option_li.text());
					options_ul.hide();
				});
			});
		});
	};
})(jQuery);
jQuery(function($){
	$.loadResources('jquery.select2css.js', 'jquery.select2css.css');
	$('select:not(.nowrapper)').select2css();
});