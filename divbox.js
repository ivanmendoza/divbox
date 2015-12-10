(function($){
	$.fn.divBox = function(options){
		return this.each(function(){

			var opts = $.extend( {}, $.fn.divBox.defaults, options );

			var target 			= this;
			var closeButton 	= opts.closeButton;
			var $content 		= $(opts.content, target);
			$.fn.divBox.content = $content;
			$.fn.divBox.sourceContent = opts.sourceContent?$(opts.sourceContent):$(target);
			$.fn.divBox.customClass = opts.customClass;
			$.fn.divBox.callback = opts.callback;
			$.fn.divBox.onload = opts.onload;
			$.fn.divBox.onclose = opts.onclose;

			createDivbox = function(target, divboxColor){
				target = target || 'body';
				$target = $(target);
				$.fn.divBox.target = $target;

				var $divboxContent = $(">.divboxContainer>.divboxContent", $target);
				if($divboxContent.length>0){
					return $divboxContent;
				}
				var styleClasses = "divboxContainer";
				if($.fn.divBox.customClass){
					styleClasses += " " + $.fn.divBox.customClass;
				}

				$target.css('position', 'relative');
				var $divboxContainer = 	$("<div>").addClass(styleClasses).css({'position':'absolute', 'display':'none', 'top':'0', 'bottom':'0', 'left':'0', 'right':'0', 'z-index':'1001'});
				var $divbox = 			$("<div>").attr("class", "divbox").css({'position':'absolute', 'background':divboxColor, 'top':'0', 'bottom':'0', 'left':'0', 'right':'0', 'z-index':'1002'}).fadeTo(0, .8);
					$divboxContent = 	$("<div>").attr("class", "divboxContent").css({'position':'absolute', 'top':'30px', 'bottom':'30px', 'left':'30px', 'right':'30px', 'z-index':'1003'});

				if($.fn.divBox.closeOnClickOut){
					$divbox.on("click", function(){
						$.fn.divBox.deleteDivbox();
					});
				}

				if($content){
					$content.show();
					$divboxContent.append($content);
				}
				$divboxContainer.append($divbox, $divboxContent);
				$target.append($divboxContainer);
				$divboxContainer.fadeIn(500);

				if (typeof $.fn.divBox.onload == 'function') {
			        $.fn.divBox.onload.call($divboxContainer);
			    }

				setTimeout(function(callback, divContainer){
					if (typeof callback == 'function') {
				        callback.call(divContainer);
				    }
				}, 50, $.fn.divBox.callback, $divboxContainer);

				$(closeButton, target).each(function(){
					if($(this).data("isCerrar")!= true){
						$(this).data("isCerrar", true);
						$(this).on("click", function(e){
							e.preventDefault();
							$dc = $(this).parents("div.divboxContainer");
							$.fn.divBox.deleteDivbox($dc.parent(), $content);
						});
					}
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
		sourceContent: 		null,
		closeButton: 	'.close-divbox',
		bgColor:		'#fff',
		closeOnClickOut:true,
		onload:			null,
		onclose:		null,
		callback:		null
	};

	$.fn.divBox.deleteDivbox = function (){
		$target 	= $.fn.divBox.target;
		$content 	= $.fn.divBox.content;

		$(".divboxContainer", $target).fadeOut(500, function(){
			if($content){
				$content.hide();
				$content.detach().appendTo($.fn.divBox.sourceContent);
			}
			$(this).remove();
			if (typeof $.fn.divBox.onclose == 'function') {
		        $.fn.divBox.onclose.call($target);
		    }
		})
	};
})(jQuery);
