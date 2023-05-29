//*********************************************
//  CHECK THE DEVICE AND BROWSER
//*********************************************

// Control of the functions exists
$.fn.exists = function () {
	return this.length > 0;
};

// Check the device for mobile or desktop
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 769) {
	var mobile = true;
} else {
	var mobile = false;
}

// Check the browsers
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
	// Firefox 1.0+
	isFirefox = typeof InstallTrigger !== "undefined",
	// Safari 3.0+ "[object HTMLElementConstructor]"
	isSafari =
		/constructor/i.test(window.HTMLElement) ||
		(function (p) {
			return p.toString() === "[object SafariRemoteNotification]";
		})(!window["safari"] || safari.pushNotification),
	// Internet Explorer 6-11
	isIE = /*@cc_on!@*/ false || !!document.documentMode,
	// Edge 20+
	isEdge = !isIE && !!window.StyleMedia,
	// Chrome 1+
	isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
	// Blink engine detection
	isBlink = (isChrome || isOpera) && !!window.CSS,
	// Parallax effects for selected browsers
	isParallaxBrowsers = isOpera || isFirefox || isBlink || isChrome;

// Add .ie-browser class if browsing with internet explorer.
if (isIE) {
	$("body").addClass("ie-browser");
}

//*********************************************
//  DETECT RETINA SCREENS
//*********************************************

//Detect retina screen type
function isRetina() {
	return (
		(window.matchMedia &&
			(window.matchMedia(
				"only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)"
			).matches ||
				window.matchMedia(
					"only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)"
				).matches)) ||
		(window.devicePixelRatio && window.devicePixelRatio > 1.3)
	);
}
//Add .retina-device class to body if the device is retina. And change images for retina screens
if (isRetina()) {
	$("body").addClass("retina-device");
	$("[data-retina]").each(function () {
		var $this = $(this),
			$itemWidth = $(this).width(),
			$rtnIMG = $(this).attr("data-retina");
		$(this)
			.attr("src", $rtnIMG)
			.css({ "max-width": $itemWidth + "px" });
	});
}
//Add .has-retina-logo class to body if navigation has retina logo
if ($(".retina-logo").exists()) {
	$("body").addClass("has-retina-logo");
}

//*********************************************
//  NAVIGATION SCRIPTS
//*********************************************

//Get Navigation
var themeNav = $("#navigation"),
	stickyNav = $("#navigation.sticky"),
	hideByScroll = $(".hide-by-scroll");

//Call sticky for navigation
$(stickyNav).sticky({ topSpacing: 0 });
// $("body").scrollspy({ target: ".nav-menu", offset: 200 });

var position = $(window).scrollTop();

//Add scrolled class when scroll down
function getScrolledClass() {
	if ($(window).scrollTop() > 0) {
		$(themeNav).addClass("scrolled");
	} else {
		$(themeNav).removeClass("scrolled");
	}
}
getScrolledClass();

var scroll = function () {
	var linkParent = $(".nav-menu").find("a").parents("li"),
		linkParentActive = $(".nav-menu").find("a.active").parents("li");
	$(linkParent).removeClass("active");
	$(linkParentActive).addClass("active");

	getScrolledClass();
	var scroll = $(window).scrollTop();
	if (scroll > position - 1 && scroll > 700) {
		$(hideByScroll).addClass("hiding");
	} else {
		$(hideByScroll).removeClass("hiding");
	}
	position = scroll;
	if ($(window).scrollTop() + $(window).height() === $(document).height()) {
		$(hideByScroll).removeClass("hiding");
	}
};

var waiting = false,
	endScrollHandle;
$(window).scroll(function () {
	if (waiting) {
		return;
	}
	waiting = true;
	// clear previous scheduled endScrollHandle
	clearTimeout(endScrollHandle);
	scroll();
	setTimeout(function () {
		waiting = false;
	}, 50);
	// schedule an extra execution of scroll() after 200ms
	// in case the scrolling stops in next 100ms
	endScrollHandle = setTimeout(function () {
		scroll();
	}, 100);
});

//Stay Page when click on "stay" class
$(".stay").on("click", function (e) {
	e.preventDefault();
});


// add #top href for scroll to top
$("a[href='#top']").on("click", function () {
	$("html, body").stop().animate({ scrollTop: 0 }, 1400, "easeInOutExpo");
	return false;
});

// Show/Hide mobile navigation
$(".mobile-nb").on("click", function () {
	$(".navigation .mobile-nav-bg").fadeIn(300);
	$("#navigation .nav-menu").addClass("animate");
	setTimeout(function () {
		$("#navigation .nav-menu").addClass("active");
	}, 300);
	return false;
});
$(".mobile-nav-bg").on("click", function () {
	$("#navigation .nav-menu").removeClass("active");
	$(".navigation .mobile-nav-bg").fadeOut(300);
	$("#navigation li").removeClass("showing");
	$("#navigation .dropdown-menu").slideUp(300);
	setTimeout(function () {
		$("#navigation .nav-menu").removeClass("animate");
	}, 500);
	return false;
});


//*********************************************
//  POPOVERS
//*********************************************

//Call popovers
$('[data-toggle="popover"]').each(function () {
	$(this).popover({ html: true, boolean: false });
});



//*********************************************
//  BACKGROUND IMAGES & COLORS WITH DATA ATTRIBUTES
//*********************************************

//Get Background Image
$("[data-background]").each(function () {
	var bgSRC = $(this).data("background"),
		self = $(this);
	$(this).css({ "background-image": "url(" + bgSRC + ")" });
});
//Get Background Image for only mobile
$("[data-mobile-background]").each(function () {
	if ((mobile === true) & ($(window).width() < 769)) {
		var mBgSRC = $(this).data("mobile-background"),
			self = $(this);
		$(this).css({ "background-image": "url(" + mBgSRC + ")" });
	}
});
//Get Color
$("[data-color]").each(function () {
	var colorSRC = $(this).data("color"),
		self = $(this);
	$(this).css({ color: colorSRC });
});
//Get background color
$("[data-bgcolor]").each(function () {
	var bgColorSRC = $(this).data("bgcolor"),
		self = $(this);
	$(this).css({ "background-color": bgColorSRC });
});

//*********************************************
//  DETECT DOCUMENT HEIGHT CHANGE
//*********************************************

//Detect changed body height
function onElementHeightChange(elm, callback) {
	var lastHeight = elm.clientHeight,
		newHeight;
	(function run() {
		newHeight = elm.clientHeight;
		if (lastHeight != newHeight) callback();
		lastHeight = newHeight;
		if (elm.onElementHeightChangeTimer) clearTimeout(elm.onElementHeightChangeTimer);
		elm.onElementHeightChangeTimer = setTimeout(run, 200);
	})();
}
//Refresh plugins when document height changed
onElementHeightChange(document.body, function () {
	Waypoint.refreshAll();
	if (mobile === false) {
		s.refresh();
	}
});

//*********************************************
//  CALL PARALLAX EFFECT FOR ONLY LARGE SCREENS
//*********************************************

var bgParallax = $(".bg-parallax"),
	bgParallaxParents = $(bgParallax).parents("section");

if (mobile === false) {
	//Ready skrollr effects
	var s = skrollr.init({
		forceHeight: false,
		smoothScrolling: false,
	});
	$(bgParallaxParents).addClass("has-parallax");
} else {
	//Add class for mobile devices
	$(bgParallax).addClass("bg-parallax-mobiled").parents("section").addClass("has-parallax");
}

//*********************************************
//  WINDOW LOAD FUNCTION START
//*********************************************

// Start Function
$(window).on("load", function () {
	"use strict";

	//*********************************************
	//  ABOUT VISION-MISSION PAGE SLIDER
	//*********************************************

	//Call Swiper Slider For Home V3
	var swiperHome = new Swiper(".home-slider-container", {
		effect: "fade", // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
		speed: 600,
		loop: true,
		touchRatio: 0,
		followFinger: false,
		autoplay: {
			delay: 12000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".slider-next",
			prevEl: ".slider-prev",
		},
		on: {
			resize: function () {
				swiperHome.update();
			},
		},
	});

	//*********************************************
	//  CONTACT FORM SCRIPTS
	//*********************************************

	//Input effects
	$(".contact .contact-input").each(function () {
		//Focus In
		$(this).focusin(function () {
			$(this).parent().addClass("focused");
		});
		//Focus out
		$(this).focusout(function () {
			if ($(this).val().length === 0) {
				$(this).parent().removeClass("focused");
			}
		});
	});
	//If contact form is not visible
	$(".contact-form").each(function () {
		var elem = $(this);
		$(elem).waypoint(
			function (direction) {
				if (direction == "up") {
					$(elem).addClass("unvisible");
				} else {
					$(elem).removeClass("unvisible");
				}
				$(elem).toggleClass("unvisible");
			},
			{ offset: "0%" }
		);
	});

	//Contact Form Settings
	var validator = $(".contact-form, .newsletter-form");
	// var rnuma = Math.floor(Math.random() * 5);
	// var rnumb = Math.floor(Math.random() * 5);
	// var sum = rnuma + rnumb;
	// $('<textarea id="math" style="display:none;">' + sum + "</textarea>").insertAfter(validator);
	// $("#verify-label span").html(rnuma + "+" + rnumb + "= ?");

	// Validate Contact Form
	$(validator).each(function () {
		var sendBtn = $(this).find(":submit"),
			$this = $(this),
			timer = window.setTimeout(1000);

		$(sendBtn).on("click", function () {
			if ($($this).hasClass("unvisible")) {
				$("html, body")
					.stop()
					.animate({ scrollTop: $($this).offset().top - 70 }, 1000, "easeInOutExpo");
			}
		});
		// Classic Zeplin Validate
		$(this).validate({
			ignore: ".ignore",
			rules: {
				verify: {
					required: true,
					equalTo: "#math",
				},
				hiddenRecaptcha: {
					required: function () {
						if (grecaptcha.getResponse() === "") {
							$($this).find(".g-recaptcha").addClass("error_warning");
							return true;
						} else {
							$($this).find(".g-recaptcha").removeClass("error_warning");
							return false;
						}
					},
				},
			},
			showErrors: function (map, list) {
				this.currentElements.removeClass("error_warning");
				$.each(list, function (index, error) {
					window.clearTimeout(timer);
					if ($($this).hasClass("contact-form")) {
						$($this).parent().find(".error-messages").addClass("show error").removeClass("success");
						$($this).addClass("error-message-showing");
						window.clearTimeout(timer);
					}
					$(error.element).addClass("error_warning");
				});
			},
			submitHandler: function (form) {
				$(sendBtn).not(".loading").addClass("loading").append("<span class='loader'></span>");
				$($this).find("label").addClass("ok");
				$.ajax({
					url: form.action,
					type: form.method,
					data: new FormData($(form)[0]),
					cache: false,
					contentType: false,
					processData: false,
					success: function () {
						if ($($this).hasClass("contact-form")) {
							$($this).addClass("error-message-showing");
							$($this).parent().find(".error-messages").addClass("show success").removeClass("error");
							timer = window.setTimeout(function () {
								$($this).removeClass("error-message-showing");
								$($this).parent().find(".error-messages").removeClass("success");
							}, 5000);
						}
						$(sendBtn).removeClass("loading");
						$(".focused").removeClass("focused");
						$(validator).trigger("reset").addClass("reseting");
						setTimeout(function () {
							$(validator).removeClass("reseting");
						}, 1000);
						if ($this.hasClass("newsletter-form")) {
							$("footer .footer-newsletter").addClass("success");
						}
					},
				});
			},
		});
	});

	//*********************************************
	//  LAZY LOAD
	//*********************************************

	//Use lazy load with only data-src attribute
	var myLazyLoad = new LazyLoad({
		threshold: 1000,
		elements_selector: "[data-src]",
	});

	//*********************************************
	//  ANIMATED ITEMS
	//*********************************************

	//Animated Items for desktops
	$.fn.animatedItems = function () {
		var animatedItem = $(".animated");
		if ($(window).width() > 992 && mobile === false) {
			$(animatedItem).each(function () {
				var item = $(this),
					animation = item.data("animation");
				$(item).waypoint(
					function () {
						if (!item.hasClass("visible")) {
							var animationDelay = item.data("animation-delay");
							if (animationDelay) {
								setTimeout(function () {
									item.addClass(animation + " visible");
								}, animationDelay);
							} else {
								item.addClass(animation + " visible");
							}
						}
					},
					{ offset: "95%" }
				);
			});
		} else {
			$(animatedItem).addClass("visible");
		}
	};
	$("body").animatedItems();

	//*********************************************
	//  SMOOTH SCROLL WITH CLICKS
	//*********************************************

	//See links inside the page for smooth scroll
	$("a[href^='#']:not([href='#']):not(.no-scroll):not([data-slide]):not([data-toggle])").on("click", function (eve) {
		var $anchor = $(this),
			headerOffset = $("#navigation").data("offset"),
			$target = $($anchor).attr("href");
		eve.preventDefault();
		if ($($target).length) {
			if ($("#navigation").length) {
				if (!$anchor.parent(".has-sub").length) {
					$("html, body")
						.stop()
						.animate({ scrollTop: $($anchor.attr("href")).offset().top - headerOffset + "px" }, 1150, "easeInOutExpo");
				} else if (mobile === false) {
					$("html, body")
						.stop()
						.animate({ scrollTop: $($anchor.attr("href")).offset().top - headerOffset + "px" }, 1150, "easeInOutExpo");
				}
			} else {
				$("html, body")
					.stop()
					.animate({ scrollTop: $($anchor.attr("href")).offset().top }, 700, "easeInOutExpo");
			}
		}
		return false;
	});

	//*********************************************
	//  DISABLE PAGELOADER
	//*********************************************

	//Fadeout circles before
	$(".pageloader").not(".delay").find(">div").fadeOut(100);
	$(".pageloader.delay>div").delay(450).fadeOut(100);
	//Fadeout all loader
	$(".pageloader")
		.not(".delay")
		.fadeOut(700, function () {
			$(this).addClass("stop");
		});
	$(".pageloader.delay")
		.delay(500)
		.fadeOut(700, function () {
			$(this).addClass("stop");
		});
	//Before window unload
	$(
		"a:not(a[href^='#']):not(a[href^='mailto']):not(a[href^='tel']):not([href='#']):not(.no-scroll):not(.lightbox):not(.lightbox-item):not([data-slide]):not([data-toggle]):not([target]):not(.more-post-button):not([rel]):not(.nl-field-toggle)"
	).on("click", function () {
		var Exlink = this.getAttribute("href"),
			$elem = $(this);
		if (/\.(?:jpg|jpeg|gif|png|mp3|mp4)$/i.test($(this).attr("href"))) {
		} else {
			if ($elem.parents(".lightbox-gallery").length || $elem.parent(".has-sub").length) {
			} else {
				$(".pageloader").fadeIn(400);
				$(".pageloader").delay(450).hide(0);
				setTimeout(function () {
					document.location.href = Exlink;
				}, 450);
				if (mobile === true || isSafari || isFirefox) {
					setTimeout(function () {
						$(".pageloader").hide();
					}, 1200);
				}
				return false;
			}
		}
	});

	//*********************************************
	//  RE-LAYOUT ISOTOPE AND PARALLAX
	//*********************************************

	if (mobile === false) {
		s.refresh();
	}
}); //  END START FUNCTION

