/*
Документация: 
https://gsap.com/
https://gsap.com/docs/v3/Plugins/ScrollTrigger/
https://gsap.com/docs/v3/Plugins/ScrollToPlugin
*/

gsap.registerPlugin(
	ScrollTrigger,
	ScrollToPlugin,
	// drawSVGPlugin,
);
// console.clear();

window.addEventListener('load', function () {
	setTimeout(() => {
		ScrollTrigger.refresh();
		breakpointGsapAnimChecker();
		window.scrollTo(0, 0);
	}, 100);
})

//========================================================================================================================================================
/* MOVE SVG LINE */
function moveSvgDashed(dashed, mask, trigger, top = 50, end = 50, markers = 0) {
	if (document.querySelector(dashed) && document.querySelector(mask) && document.querySelector(trigger)) {
		gsap.from(mask, {
			// drawSVG: "0%",
			scrollTrigger: {
				trigger: trigger,
				start: `top-=50% top`,
				end: `bottom+=50% bottom`,
				scrub: 1,
				// markers: 1,
			},
		});

		gsap.from(dashed, {
			"--dashOffset": 1000,
			delay: 5,
			scrollTrigger: {
				trigger: trigger,
				start: `top-=${top}% top`,
				end: `bottom+=${end}% bottom`,
				scrub: 1,
				// markers: 1,
			}
		});
		ScrollTrigger.refresh()
		document.querySelector(dashed).setAttribute("stroke-dashoffset", "var(--dashOffset)");
	}
}

/* REVEAL ANIMATION */
function showContentOnScroll(elem, duration, delay, direction) {
	if (document.querySelectorAll(elem)) {
		const elems = gsap.utils.toArray(elem);
		elems.forEach((item, i) => {
			let anim;

			switch (true) {
				case direction === 'bottom-up':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'right-left':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'up-bottom':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'left-right':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'fade':
					anim = gsap.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'scale':
					anim = gsap.fromTo(item, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, delay: delay, duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'bottom-up--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'right-left--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'up-bottom--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, y: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'left-right--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, x: -50 }, { autoAlpha: 1, y: 0, x: 0, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'fade--every':
					anim = gsap.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'scale--every':
					anim = gsap.fromTo(item, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, delay: delay * (i + 1), duration: duration, ease: 'cubic-1' });
					break;
				case direction === 'width-100':
					anim = gsap.fromTo(item, { width: 0 + '%' }, { width: 100 + '%', delay: delay, duration: duration, ease: 'cubic-1', });
					break;

				default:
					break;
			}

			ScrollTrigger.create({
				trigger: item,
				animation: anim,
				once: true,
				// scrub: true,
				// markers: 1,

				onEnter: () => function () { },
				onLeave: () => function () { },
				onEnterBack: () => function () { },
				onLeaveBack: () => function () { },
			});
		});
	}
}

//========================================================================================================================================================
function animDesktop() {
}

function animMobile() {
}

function animCommon() {
	// // /* MOVE SVG LINE */
	// moveSvgDashed(".rs-features-img__line #dashed-line-1", ".rs-features-img__line #mask-line-1", ".rs-features-img");

	// /* REVEAL ANIMATION */
	// showContentOnScroll('section .section-header', 0.1, 0.5, 'bottom-up');
	// showContentOnScroll('.rs-slider .rs-slider__slider', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-catalog .rs-catalog__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-text-block .rs-text-block__item', 0.1, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-features .rs-features__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-news .rs-news__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-reviews .rs-reviews__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-form .form__row > *', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-form .form__agreement', 0.3, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-footer .rs-footer__spollers_item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-features-row .rs-features-row__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-features-img .rs-features-img__wrapper > *', 0.05, 0.5, 'fade--every');
	// showContentOnScroll('.rs-parallax .rs-parallax__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-steps .rs-steps__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-gallery .rs-gallery__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-slider-block .rs-slider-block__item', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-partners .rs-partners__slide', 0.05, 0.5, 'bottom-up--every');
	// showContentOnScroll('.rs-timer .rs-timer__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-tabs .rs-tabs__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-quote .rs-quote__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-feedback .rs-feedback__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-subscribe .rs-subscribe__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-tariff .rs-tariff__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-contacts .rs-contacts__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-accordion .rs-accordion__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-documents .rs-documents__container', 0.1, 0.5, 'fade');
	// showContentOnScroll('.rs-table .rs-table__container', 0.1, 0.5, 'fade');
}

// Проверка ширины экрана для вызова отдельных анимаций
const breakpoint = window.matchMedia('(min-width: 991.98px)');
const breakpointGsapAnimChecker = function () {

	animCommon()
	if (breakpoint.matches === true) {
		return animDesktop();
	} else if (breakpoint.matches === false) {
		return animMobile();
	}
};
breakpoint.addListener(breakpointGsapAnimChecker);
