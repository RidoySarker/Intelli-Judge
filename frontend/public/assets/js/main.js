    "use strict";

    /*--
        Header Sticky
    -----------------------------------*/
    window.onload = function(){
        //hide the preloader
        // document.querySelector(".preloader").style.display = "none";
    }
    

    /*--
        Header Sticky
    -----------------------------------*/

    window.onscroll = function () {
        const left = document.getElementById("header");

        if (left.scrollTop > 180 || self.pageYOffset > 180) {
            left.classList.add("sticky")
        } else {
            left.classList.remove("sticky");
        }
    }    


    /*--
        Menu parent Element Icon
    -----------------------------------*/
    const $subMenu = document.querySelectorAll('.sub-menu');
    $subMenu.forEach(function (subMenu) {
        const menuExpand = document.createElement('span')
        menuExpand.classList.add('menu-icon')
        // menuExpand.innerHTML = '+'
        subMenu.parentElement.insertBefore(menuExpand, subMenu)
        if (subMenu.classList.contains('mega-menu')) {
            subMenu.classList.remove('mega-menu')
            subMenu.querySelectorAll('ul').forEach(function (ul) {
                ul.classList.add('sub-menu')
                const menuExpand = document.createElement('span')
                menuExpand.classList.add('menu-icon')
                menuExpand.innerHTML = '+'
                ul.parentElement.insertBefore(menuExpand, ul)
            })
        }
    })

    
    /*--
        Mobile Menu 

        Global Functions
        - Get Sibling
        - Slide Up
        - Slide Down
        - Slide Toggle
    -----------------------------------*/

    /* Get Sibling */
    const getSiblings = function (elem) {
        const siblings = []
        let sibling = elem.parentNode.firstChild
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling)
            }
            sibling = sibling.nextSibling
        }
        return siblings
    }

    /* Slide Up */
    const slideUp = (target, time) => {
        const duration = time ? time : 500;
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.boxSizing = 'border-box'
        target.style.height = target.offsetHeight + 'px'
        target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        window.setTimeout(() => {
            target.style.display = 'none'
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Down */
    const slideDown = (target, time) => {
        const duration = time ? time : 500;
        target.style.removeProperty('display')
        let display = window.getComputedStyle(target).display
        if (display === 'none') display = 'block'
        target.style.display = display
        const height = target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.offsetHeight
        target.style.boxSizing = 'border-box'
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.height = height + 'px'
        window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Toggle */
    const slideToggle = (target, time) => {
        const duration = time ? time : 500;
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration)
        } else {
            return slideUp(target, duration)
        }
    }

    /* Offcanvas/Collapseable Menu */
    const offCanvasMenu = function (selector) {

        const $offCanvasNav = document.querySelector(selector),
            $subMenu = $offCanvasNav.querySelectorAll('.sub-menu');
        $subMenu.forEach(function (subMenu) {
            const menuExpand = document.createElement('span')
            menuExpand.classList.add('menu-expand')
            // menuExpand.innerHTML = '+'
            subMenu.parentElement.insertBefore(menuExpand, subMenu)
            if (subMenu.classList.contains('mega-menu')) {
                subMenu.classList.remove('mega-menu')
                subMenu.querySelectorAll('ul').forEach(function (ul) {
                    ul.classList.add('sub-menu')
                    const menuExpand = document.createElement('span')
                    menuExpand.classList.add('menu-expand')
                    menuExpand.innerHTML = '+'
                    ul.parentElement.insertBefore(menuExpand, ul)
                })
            }
        })

        $offCanvasNav.querySelectorAll('.menu-expand').forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault()
                const parent = this.parentElement
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    parent.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                        subMenu.parentElement.classList.remove('active');
                        slideUp(subMenu)
                    })
                } else {
                    parent.classList.add('active');
                    slideDown(this.nextElementSibling)
                    getSiblings(parent).forEach(function (item) {
                        item.classList.remove('active')
                        item.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                            subMenu.parentElement.classList.remove('active');
                            slideUp(subMenu)
                        })
                    })
                }
            })
        })
    }
    offCanvasMenu('.offcanvas-menu');


    /*--
		Mousemove Parallax
	-----------------------------------*/
    var b = document.getElementsByTagName("BODY")[0];  

    b.addEventListener("mousemove", function(event) {
    parallaxed(event);

    });

    function parallaxed(e) {
        var amountMovedX = (e.clientX * -0.3 / 8);
        var amountMovedY = (e.clientY * -0.3 / 8);
        var x = document.getElementsByClassName("parallaxed");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
        }
    }


    /*--    
        Counter Up
    -----------------------------------*/  

    const counters = document.querySelectorAll('.value');
    const speed = 400;

    counters.forEach( counter => {
    const animate = () => {
        const value = +counter.getAttribute('data-count');
        const data = +counter.innerText;
        
        const time = value / speed;
        if(data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 1);
            }else{
            counter.innerText = value;
            }
        
    }    
    animate();
    });

    /*--    
        feature-category
    -----------------------------------*/
    var swiper = new Swiper(".feature-category-active .swiper-container", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".feature-category-active .swiper-button-next",
            prevEl: ".feature-category-active .swiper-button-prev",
        },
        pagination: {
            el: ".feature-category-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        },
    });


    /*--    
        Testimonial
    -----------------------------------*/
    var swiper = new Swiper(".author-images-active .swiper-container", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        effect: "fade",
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".testimonial-content-active .swiper-container", {
        loop: true,
        spaceBetween: 20,
        pagination: {
            el: ".testimonial-content-active .swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        thumbs: {
          swiper: swiper,
        },
    });


    /*--    
        Testimonial Active 02
    -----------------------------------*/
    var swiper = new Swiper(".testimonial-active-02 .swiper-container", {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            el: ".testimonial-active-02 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 2,
            },
            1500: {
              slidesPerView: 3,
            },
        },
    });


    /*--    
        Testimonial Active 03
    -----------------------------------*/
    var swiper = new Swiper(".testimonial-active-03 .swiper-container", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            el: ".testimonial-active-03 .swiper-pagination",
            clickable: true,
        },
    });


     /*--    
        Testimonial Active 04
    -----------------------------------*/
    var swiper = new Swiper(".testimonial-active-04 .swiper-container", {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: ".testimonial-active-04 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            }
        },
    });


    /*--    
        Courses Active
    -----------------------------------*/
    var swiper = new Swiper(".courses-02-active .swiper-container", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".courses-02-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          }
        },
    });

    /*--    
        Brand Active
    -----------------------------------*/
    var swiper = new Swiper(".brand-active .swiper-container", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          },
        },
    });

    /*--    
        Testimonial Active 03
    -----------------------------------*/
    var swiper = new Swiper(".testimonial-05-active .swiper-container", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            el: ".testimonial-05-active .swiper-pagination",
            clickable: true,
        },
    });

    /*--    
        Program Active 
    -----------------------------------*/
    var swiper = new Swiper(".program-active .swiper-container", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: ".program-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            }
        },
    });

     /*--    
        Testimonial Active 06
    -----------------------------------*/
    var swiper = new Swiper(".testimonial-06-active .swiper-container", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: ".testimonial-06-active .swiper-pagination",
            clickable: true,
        },
    });

    /*--
       GLightbox
    -----------------------------------*/
    var lightboxVideo = GLightbox({
        selector: '.videoLightbox'
    });

    /*--
        Nice Select
    -----------------------------------*/
    var els = document.querySelectorAll(".select");
    els.forEach(function(select){
        NiceSelect.bind(select);
    });


    /*--
        Back To Top
    -----------------------------------*/
    var toTopBtn = document.getElementById('backBtn');

    toTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    //hide/show button on scroll up/down
    var scrollPos = 0;

    window.addEventListener('scroll', function () {

        // detects new state and compares it with the new one
        if ((document.body.getBoundingClientRect()).top > scrollPos) {
            toTopBtn.style.display = "none";

        } else {
            toTopBtn.style.display = "block";
        }
        // saves the new position for iteration.
        scrollPos = (document.body.getBoundingClientRect()).top;
    });


    (function ($) {

        // mouse-on examples
        $('.single-course').data('powertiptarget', 'course-hover');

        $('.single-course').powerTip({
            placement: 'e',
            mouseOnToPopup: true,
            smartPlacement: true,
        });

    })(jQuery);

    
