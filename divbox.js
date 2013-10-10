(function($){
	$.fn.divBox = function(options){
		return this.each(function(){
			
			var opts = $.extend( {}, $.fn.divBox.defaults, options );
		
			var target 			= this;
			var closeButton 	= opts.closeButton;
			var $content 		= $(opts.content, target);
			$.fn.divBox.content = $content;
			
			createDivbox = function(target, divboxColor){
				target = target || 'body';
				$target = $(target);
				$.fn.divBox.target = $target;
				
				var $divboxContent = $(">.divboxContainer>.divboxContent", $target);
				if($divboxContent.length>0){
					return $divboxContent;
				}
				
				$target.css('position', 'relative');
				var $divboxContainer = 	$("<div>").attr("class", "divboxContainer").css({'position':'absolute', 'display':'none', 'top':'0', 'bottom':'0', 'left':'0', 'right':'0', 'z-index':'1001'});
				var $divbox = 			$("<div>").attr("class", "divbox").css({'position':'absolute', 'background':divboxColor, 'top':'0', 'bottom':'0', 'left':'0', 'right':'0', 'z-index':'1002'}).fadeTo(0, .9);
					$divboxContent = 	$("<div>").attr("class", "divboxContent").css({'position':'absolute', 'top':'30px', 'bottom':'30px', 'left':'30px', 'right':'30px', 'z-index':'1003'});
				
				if($content){
					$content.show();
					$divboxContent.append($content);
				}
				$divboxContainer.append($divbox, $divboxContent);
				$target.append($divboxContainer);
				$divboxContainer.fadeIn(500);
				
				$(closeButton, target).each(function(){
					$(this).on("click", function(){
						$dc = $(this).parents("div.divboxContainer");
						$.fn.divBox.deleteDivbox($dc.parent(), $content);
					});
				});
				
				return $divboxContent;
			};
			
			toggleDivbox = function(target, divboxColor){
				$target = $(target);
				var $divboxContent = $(">.divboxContainer>.divboxContent", $target);
				if($divboxContent.length>0){
					$.fn.divBox.deleteDivbox();
				}else{
					createDivbox(target, divboxColor);
				}
			};
			
			toggleDivbox(target, opts.bgColor);
			
		});
	};
	$.fn.divBox.defaults = {
		content: 		'.content-divbox',
		closeButton: 	'.close-divbox',
		bgColor:		'#fff'
	};
	
	$.fn.divBox.deleteDivbox = function (){
		$target 	= $.fn.divBox.target;
		$content 	= $.fn.divBox.content;
		
		$(".divboxContainer", $target).fadeOut(500, function(){
			if($content){
				$content.hide();
				$target.append($content);
			}
			$(this).remove();
		})
	};
})(jQuery);