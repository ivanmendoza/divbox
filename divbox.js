(function($){
	$.fn.divBox = function(content, closeButton, callbacks){
		var $this = this;
		var closeButton = closeButton || '.close-box';
		var $divboxTarget = $this;
		if(content){
			$content = $(content, $this);
		}
		
		createDivbox = function(target, divboxColor){
			target = target || 'body';
			$target = $(target);
			divboxColor = divboxColor || "#fff";
			
			var $divboxContent = $(">.divboxContainer>.divboxContent", $target);
			if($divboxContent.length>0){
				return $divboxContent;
			}
			
			$target.css('position', 'relative');
			var $divboxContainer = 	$("<div>").attr("class", "divboxContainer").css({'position':'absolute', 'display':'none', 'top':'0', 'bottom':'0', 'left':'0', 'right':'0', 'z-index':'1001'});
			var $divbox = 			$("<div>").attr("class", "divbox").css({'position':'absolute', 'background':divboxColor, 'top':'0', 'bottom':'0', 'left':'0', 'right':'0', 'z-index':'1002'}).fadeTo(0, .9);
				$divboxContent = 	$("<div>").attr("class", "divboxContent").css({'position':'absolute', 'top':'30px', 'bottom':'30px', 'left':'30px', 'right':'30px', 'z-index':'1003'});
			
			$(closeButton).each(function(){
				$(this).on("click", function(){
					deleteDivbox($divboxContainer.parent());
				});
			});
			
			if($content){
				$content.show();
				$divboxContent.append($content);
			}
			$divboxContainer.append($divbox, $divboxContent);
			$target.append($divboxContainer);
			$divboxContainer.fadeIn(500);
			
			
			return $divboxContent;
		};
		
		deleteDivbox = function (target){
			target = target || this;
			$(".divboxContainer", $(target)).fadeOut(500, function(){
				if($content){
					$content.hide();
					$(target).append($content);
				}
				$(this).remove();
			})
		};
		
		toggleDivbox = function(target, divboxColor){
			$target = $(target);
			var $divboxContent = $(">.divboxContainer>.divboxContent", $target);
			if($divboxContent.length>0){
				deleteDivbox($target);
			}else{
				createDivbox(target, divboxColor);
			}
		};
		
		toggleDivbox(this);
		return this;
	};
})(jQuery);