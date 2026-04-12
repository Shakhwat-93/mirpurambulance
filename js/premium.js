/**
 * Premium Ambulance Service JS
 */

$(document).ready(function() {
    
    // 1. Sticky Header
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.main_header').addClass('scrolled');
        } else {
            $('.main_header').removeClass('scrolled');
        }
    });

    // 2. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }

    // 3. Counter Animation for Stats
    $('.stat-number').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2500,
            easing: 'swing',
            step: function (now) {
                // Add comma separator for thousands
                $(this).text(Math.ceil(now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            }
        });
    });

    // 4. Smooth Scrolling for Anchor Links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80 // Offset for sticky header
            }, 1000);
        }
    });

    // 5. Testimonial Carousel (using Owl Carousel if present)
    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive:{
                0:{ items:1 },
                768:{ items:2 },
                992:{ items:3 }
            }
        });
    }

    // 6. Booking Form simple validation
    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();
        // Just a simple visual feedback for the static site
        var btn = $(this).find('button[type="submit"]');
        var originalText = btn.html();
        
        btn.html('<i class="fa fa-spinner fa-spin"></i> Submitting...');
        btn.prop('disabled', true);
        
        setTimeout(function() {
            btn.removeClass('btn-accent').addClass('btn-success');
            btn.html('<i class="fa fa-check"></i> Request Received');
            
            // Optional: reset form
            $('#bookingForm')[0].reset();
            
            setTimeout(function() {
                btn.removeClass('btn-success').addClass('btn-accent');
                btn.html(originalText);
                btn.prop('disabled', false);
            }, 3000);
        }, 1500);
    });
});
