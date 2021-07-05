$('.interface-slider-top').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	asNavFor: '.interface-slider-bottom',
});

$('.interface-slider-bottom').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: false,
	asNavFor: '.interface-slider-top',
	focusOnSelect: true,
});

$('a[href*="#"]').click(function (event) {
	if ($(this).attr('href') === '#') {
		return false;
	}
	if (
		location.pathname.replace(/^\//, '') ==
			this.pathname.replace(/^\//, '') &&
		location.hostname == this.hostname
	) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			event.preventDefault();
			$('html, body').animate(
				{
					scrollTop:
						target.offset().top -
						document.documentElement.clientHeight * 0.15,
				},
				1000
			);
		}
	}
});

function debounce(func, wait, immediate) {
	let timeout;

	return function executedFunction() {
		const context = this;
		const args = arguments;

		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) func.apply(context, args);
	};
}

const overallItems = document.querySelectorAll('.overall-item');

overallItems.forEach(item => {
	const result = item.querySelector('.overall-result');
	const line = item.querySelector('.overall-line-active');
	line.style.width = +result.textContent + '%';
});

$(window).on('load', function () {
	var sidebarAnchorsLinks = $('.sidebar-anchors-item a');
	var sections = $('.section-title');
	var sectionsScrollTop = sections.map(function (index, item) {
		return Math.floor($(item).offset().top);
	});

	const handleScroll = debounce(function () {
		sections.each(function (index, item) {
			if (
				Math.floor($(document).scrollTop()) >
				sectionsScrollTop[index] -
					document.documentElement.clientHeight * 0.25
			) {
				var id = '#' + $(item).attr('id');
				$(sidebarAnchorsLinks).each(function (index, item) {
					$(item).removeClass('active');
					if ($(item).attr('href') === id) {
						$(item).addClass('active');
					}
				});
			}
		});
	}, 20);

	$(document).scroll(handleScroll);
});

if (window.matchMedia('(max-width: 768px)').matches) {
	const hamburger = document.querySelector('.nav-hamburger');
	const menu = document.querySelector('.mob-menu');

	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		menu.classList.toggle('dn');
	});
}

const shareBtn = document.querySelector('.offer-actions-share');
const sharePop = document.querySelector('.share-pop');


shareBtn.addEventListener('click', () => {
	navigator.clipboard.writeText(shareBtn.dataset.url).then(() => {
		shareBtn.classList.add('active');
		setTimeout(() => {
			shareBtn.classList.remove('active');
		}, 1000);
	});
});


const openSearch = document.querySelector('.header-search');
const search = document.querySelector('.search');
const closeSearchBtn = document.querySelector('.search-form-close')

openSearch.addEventListener('click', () => {
	search.classList.add('active');
	search.classList.add('z-up');
});

closeSearchBtn.addEventListener('click', () => {
	closeSearch()
});

search.addEventListener('click', e => {
	if (!e.target.closest('.search-form')) {
		closeSearch();
	}
});

const closeSearch = () => {
	search.classList.remove('active');
	setTimeout(() => {
		search.classList.remove('z-up');
	}, 300);
};