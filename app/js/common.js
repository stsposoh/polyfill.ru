;(function () {
    "use strict";

    let imageZoomItems = document.querySelectorAll('.js-image-zoom');
    let imageZoomed = document.querySelector('.js-image-zoomed');
    let smoothLinks = document.querySelectorAll('.js-smooth-to');
    let hamburger = document.querySelector('.hamburger');
    let nav = document.querySelector('.nav');


    //menu
    hamburger.addEventListener('click', function () {
        this.classList.toggle('hamburger--is-active');

        nav.classList.toggle('nav--visible');
    });


    //header parralax
    $('.header').parallax({imageSrc: '/img/n71.jpg'});


    //smooth scroll to link ankhor
    const smoothSpeed = .3;

    for (let i = 0; i < smoothLinks.length; i++) {
        smoothLinks[i].addEventListener('click', function(e) {
            e.preventDefault();

            hamburger.classList.remove('hamburger--is-active');
            nav.classList.remove('nav--visible');

            let w = window.pageYOffset;
            let hash = this.href.replace(/[^#]*(.*)/, '$1');
            let t = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) start = time;

                let progress = time - start;
                let r = (t < 0 ? Math.max(w - progress / smoothSpeed, w + t) : Math.min(w + progress / smoothSpeed, w + t));

                window.scrollTo(0, r);

                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash
                }
            }
        }, false);
    }


    //experience timer
    const myDate = '01.06.2015 00:00:00';

    let a = myDate.split(' '),
        b = a[0].split('.'),
        c = a[1].split(':'),
        d = new Date(),
        T = [],
        C = [];

    T[0] = b[2],
    C[0] = d.getFullYear(),
    T[1] = b[1] - 1,
    C[1] = d.getMonth(),
    T[2] = parseInt(b[0]),
    C[2] = d.getDate(),
    T[3] = parseInt(c[0]),
    C[3] = d.getHours(),
    T[4] = parseInt(c[1]),
    C[4] = d.getMinutes(),
    T[5] = parseInt(c[2]),
    C[5] = d.getSeconds();

    for (var D = [], j = 0; j < 6; j++) {
        D[j] = C[j] - T[j];
    }if (D[5] < 0) D[5] += 60, D[4]--;
    if (D[4] < 0) D[4] += 60, D[3]--;
    if (D[3] < 0) D[3] += 24, D[2]--;
    if (D[2] < 0) D[2] = C[2] + new Date(C[0], C[1], 0).getDate() - T[2], D[1]--;
    if (D[1] < 0) D[1] = C[1] + 12 - T[1], D[0]--;

    for (j = 0; j < 3; j++) {
        formTxt(D[j], j);
    }function formTxt(n, q) {
        let w = [['год', 'года', 'лет'],
                ['месяц', 'месяца', 'месяцев'],
                ['день', 'дня', 'дней']],

            k = n % 10,
            l = !k || n > 5 && n < 21 || k > 4 ? 2 : k == 1 ? 0 : 1,
            t = w[q][l];

        let z = ',';

        if ([q] == 2) z = '';

        document.querySelector('.js-experience-timer').children[q].innerHTML = n + ' ' + t + z;
    }


    //Zoom image
    for(let i = 0; i < imageZoomItems.length; i++) {
        imageZoomItems[i].addEventListener('click', getImgAdress);
    }

    function getImgAdress(e) {
        e.preventDefault();

        let imgAdress = this.getAttribute('href');

        setImgAdress(imgAdress);
        showZoomedimage();
    }

    function setImgAdress(imgAdress) {
        let zoomedImage = document.querySelector('.js-image-zoomed-image');

        zoomedImage.setAttribute('src', imgAdress);
    }

    function showZoomedimage() {
        document.body.style.overflow = 'hidden';
        imageZoomed.style.display = 'block';
    }

    document.querySelector('.js-image-zoomed-hider').addEventListener('click', function () {
        document.body.style.overflow = 'auto';
        imageZoomed.style.display = '';
    });


    //Sertificates
    mixitup('.js-portfolio', {
        load: {
            sort: 'order:asc'
        },
        animation: {
            effects: 'fade rotateZ(-180deg)',
            duration: 700
        },
        classNames: {
            block: '',
            elementFilter: 'certificates__list-item',
        },
        selectors: {
            target: '.certificates__images-item'
        }
    });

})();