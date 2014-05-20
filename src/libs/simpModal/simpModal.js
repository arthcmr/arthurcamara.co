(function($) {
	$.extend({
		simpModal: function(options) { 

			/* class and id definitions */
			var definitions = {
				modal_wrapper: 'simp_modal_wrapper',
				modal_overlay: 'simp_overlay',
				modal: 'simp_modal',
				loading: 'loading',
				close_button: 'close_button',
                dataclose_parameter: 'data-close',
                dataclose_value: 'true'
			}; 

			/* default options */
			var defaults = {
				top: 100,
				overlay: 0.4,
				extraClass: null,
				element: null,
				link: null,
				ajax: {},
				content: null,
				width: null,
				closeButton: false,
				speed: 200,
				transition: 'fade',
                clickEnter: true,
                closeEsc: true,
                close: false,
                beforeOpen: null,
                afterClose: null,
                lock: false,
                iframe: {},
			};
			options = $.extend(defaults, options); 

			if(options.close === true) {
				close_modal();
				return;
			}

			//remove if it already exists
			$("#" + definitions.modal).remove();

			/* add necessary html markup */
			var modal_all = $("<div id='" + definitions.modal_wrapper + "' class='" + definitions.modal_wrapper + "'><div id='" + definitions.modal_overlay + "' class='" + definitions.modal_overlay + "'></div><div id='" + definitions.modal + "' class='" + definitions.modal + "'></div></div>");
			$("body").append(modal_all);
			overlay = $("#" + definitions.modal_overlay);
			modal = $("#" + definitions.modal);
			modal_wrapper = $("#" + definitions.modal_wrapper); 
			
			var html_overflow = $("html").css('overflow');
            
            /* define fixed styles */
            modal_wrapper.css({
                "position": "fixed",
                "z-index": 9998,
                "top": "0px",
                "left": "0px",
                "bottom": "0px",
                "right": "0px",
                "height": "100%",
                "width": "100%",
                "overflow-y": "auto",
                "overflow-x" : "hidden"
            });
            overlay.css({
                "position": "fixed",
                "z-index": 9999,
                "top": "0px",
                "left": "0px",
                "bottom": "0px",
                "right": "0px",
                "height": "100%",
                "width": "100%"
            });

			/* handle specific option */
			if (options.width !== null) {
				// force width
				modal.css('width', options.width);
			}
			if (options.content !== null) {
				// insert content
				modal.html(options.content);
			}
			if (options.link !== null) {
				// works with <a> tags
				var linkObj = options.link;
				var link = linkObj.attr("href");
				options.element = $(link);
				options.link = null;
				linkObj.click(function() {
					$.simpModal(options);
				});
				return;
			}
			if (options.element !== null) {
				// load DOM element content into modal
				var element = options.element.html();
				modal.html(element);
			}
			if (options.extraClass !== null) {
				// apply extra class
				var extraClass = '';
				//extraClass may be an array
				if (options.extraClass instanceof Array) {
					for(var i in options.extraClass) {
						extraClass = options.extraClass.join(' ');
					}
				} else {
					extraClass = options.extraClass;
				}
				modal.attr('class', definitions.modal + ' ' + extraClass);
			} 

			if (!$.isEmptyObject(options.iframe)) {
				//insert iframe if it exists
				var iframe_defaults = {
					id: 'iframe',
					file: '',
					width: '100%',
					height: '500'
				};

				var iframe = $.extend(iframe_defaults, options.iframe);
				var iframe_html = "<iframe id='" + iframe.id + "' border='0' src='" + iframe.file + "' width='" + iframe.width + "' height='" + iframe.height + "' scrollbars='auto'></iframe>";

				modal.html(iframe_html);
			}

			/* Open Modal or load AJAX */
			if ($.isEmptyObject(options.ajax)) {
				close_button(); //add close button if necessary
				open_modal();
				return;
			} else {
				//loading message
				var ajax_defaults = {
					file: null,
					method: 'post',
					params: null,
					loadingMessage: null,
					beforeLoad: null,
					onError: null,
					onSuccess: null
				};

				var ajax = $.extend(ajax_defaults, options.ajax); 				
				var openAfter = true;

				if (ajax.loadingMessage !== null) {
					loading = "<div class='" + definitions.loading + "'>" + ajax.loadingMessage + "</div>";
					modal.html(loading);
					open_modal();
					openAfter = false;
				}

				var params = {};
				if (ajax.params !== null) {
					params = ajax.params;
				}

				//beforeLoad
				trigger_event(ajax.beforeLoad);

				//ajax
				if (ajax.method === 'get') {
					$.get(ajax.file, params, function(data) {
						modal.html(data);
						close_button(); //add close button if necessary
						//openModal if not opened
						if (openAfter) {
							open_modal();
						}
						//onSucess
						trigger_event(ajax.onSuccess);						
					}).error(function() {
					    //onError
						trigger_event(ajax.onError);
					});
				} else {
					$.post(ajax.file, params, function(data) {
						modal.html(data);
						close_button(); //add close button if necessary
						//openModal if not opened
						if (openAfter) {
							open_modal();
						}
						//onSucess
						trigger_event(ajax.onSuccess);						
					}).error(function() {
					    //onError
						trigger_event(ajax.onError);
					});
				}
				return;
			} 

			/* Method that actually displays our modal */
			function open_modal() {

				//beforeOpen
				trigger_event(options.beforeOpen);

				if(options.lock === false) {
					
					//how to close
					overlay.click(function() {
						close_modal();
					});
					
					//bind esc key event
					$('html').bind('keyup', key_events);
					
					var dataclose_btns = modal.find("*["+definitions.dataclose_parameter+"='"+definitions.dataclose_value+"']");
	                	dataclose_btns.click(function() {
						close_modal();
					});
				
				}
                //overflow
                //$("html").css({ 'height':'100%', 'overflow': 'hidden'});
				
				//measurements
				var modal_height = modal.outerHeight();
				var modal_width = modal.outerWidth();
				//overlay transition
				overlay.css({
					"display": "block",
					opacity: 0
				});
				overlay.fadeTo(options.speed, options.overlay);
				//modal transition
				var possibleTransitions = ['fade', 'slide', 'slideUp', 'slideRight'];
				if ($.inArray(options.transition, possibleTransitions) === -1) {
					options.transition = 'fade';
				}
				switch (options.transition) {
				case "slide":
					modal.css({
						"display": "block",
						"position": "absolute",
						"opacity": 1,
						"z-index": 10000,
						"left": "50%",
						"margin-left": -(modal_width / 2) + "px",
						"top": "-" + (modal_height + 50) + "px"
					});
					modal.animate({
						top: options.top + "px"
					}, options.speed);
					break;
                case "slideUp":
                    modal_wrapper.css({ "overflow-y" : "hidden" });
					modal.css({
						"display": "block",
						"position": "absolute",
						"opacity": 1,
						"z-index": 10000,
						"left": "50%",
						"margin-left": -(modal_width / 2) + "px",
						"top": "105%"
					});
					modal.animate({
						top: options.top + "px"
                    }, options.speed, function() {
                        modal_wrapper.css({ "overflow-y" : "auto" });   
                    });
					break;
                case "slideRight":
                    modal_wrapper.css({ "overflow-y" : "hidden" });
					modal.css({
						"display": "block",
						"position": "absolute",
						"opacity": 1,
						"z-index": 10000,
						"left": -(modal_width) + "px",
						"margin-left": -(modal_width / 2) + "px",
						"top": options.top + "px"
					});
					modal.animate({
						left: "50%"
                    }, options.speed, function() {
                        modal_wrapper.css({ "overflow-y" : "auto" });   
                    });
					break;
				case "fade":
					modal.css({
						"display": "block",
						"position": "absolute",
						"opacity": 0,
						"z-index": 10000,
						"left": "50%",
						"margin-left": -(modal_width / 2) + "px",
						"top": options.top + "px"
					});
					modal.fadeTo(options.speed, 1);
					break;
				}
			} 

			/* Method that closes the modal */
			function close_modal() {
				overlay.fadeOut(200);
                
                switch (options.transition) {
				case "slide":
					modal.animate({
						top: "-" + (modal.outerHeight()+50) + "px"
					}, 200, remove_modal);
					break;
                case "slideUp":
                    modal_wrapper.css({ "overflow-y" : "hidden" });
					modal.animate({
						top: "105%"
					}, 200, remove_modal);
					break;
                case "slideRight":
					modal.animate({
						left: "150%"
					}, 200, remove_modal);
					break;
				case "fade":
					modal.fadeOut(200, remove_modal);
					break;
				}
                
				//unbind esc event
				$('html').unbind('keyup');
				//overflow
                //$("html").css({ 'height': 'auto', 'overflow' : html_overflow });
			} 
            
            /* Method that removes DOM elements */
            function remove_modal() {
                overlay.remove();
                modal.remove();
                modal_wrapper.remove();
                //afterClose
				trigger_event(options.afterClose);
            }

			/* Method that handles key events (ESC key only for now) */
			function key_events(e) {
				var code = (e.keyCode ? e.keyCode : e.which);
				//Esc keycode
				if (options.closeEsc === true && code == 27) {
					close_modal();
				}
                if(options.clickEnter !== false && code == 13) {
                    var enterBtn = false;
                    switch(options.clickEnter) {
                        case true:
                            enterBtn = modal.find("button[type='submit']:last");
                            break;
                        case 'first':
                            enterBtn = modal.find("button:first");
                            break;
                        case 'last':
                            enterBtn = modal.find("button:last");
                            break;
                        default:
                            enterBtn = modal.find(options.enterButton);
                            break;
                    }
                    enterBtn.click();
                    //avoid multiple Enter hits
                    options.clickEnter = null;
                }
			} 

			/* Method that determines what to do with close button */
			function close_button() {
				if (options.closeButton === true) {
					modal.prepend("<button type='button' class='" + definitions.close_button + "'>&times;</button>");
					modal.find("." + definitions.close_button).unbind('click');
					modal.find("." + definitions.close_button).bind('click', close_modal);
				}
			}

			function trigger_event(funct) {
				if ($.isFunction(funct)) {
					funct();
				}
			}
		}
	});
})(jQuery);