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

$('a[href*="#"]')
	.click(function (event) {
      if ($(this).attr('href') === '#') {
         return false;
      }
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				event.preventDefault();
				$('html, body').animate(
					{
						scrollTop: target.offset().top - document.documentElement.clientHeight * 0.15,
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


$(window).on('load', function() {
   var sidebarAnchorsLinks = $('.sidebar-anchors-item a');
   var sections = $('.section-title');
   var sectionsScrollTop = sections.map(function (index, item) {
      return Math.floor($(item).offset().top);
   });
   
   const handleScroll = debounce(function () {
      sections.each(function(index, item) {
         if (Math.floor($(document).scrollTop()) > (sectionsScrollTop[index] - $(window).height() * 0.16)) {
            var id = '#' + $(item).attr('id');
            $(sidebarAnchorsLinks).each(function(index, item) {
               $(item).removeClass('active');
               if($(item).attr('href') === id) {
                  $(item).addClass('active');
               }
            })
         }
      });
   }, 20);
   
   $(document).scroll(handleScroll);
});