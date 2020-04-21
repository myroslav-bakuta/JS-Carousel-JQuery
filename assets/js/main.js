(function (time) {
    let slides = $('.slide');
    let indicators = $('.indicator');

    let currentSlide = 0;
    let isPlaying = true;
    let CarouselInterval = time;
    let swipeStartX = null;
    let swipeEndX = null;

    const LEFT = 'ArrowLeft';
    const RIGHT = 'ArrowRight';
    const SPACE = ' ';

    const goToSlide = (n) => {
        $(slides[currentSlide]).toggleClass('active');
        $(indicators[currentSlide]).toggleClass('active');
        currentSlide = (n + slides.length) % slides.length;
        $(slides[currentSlide]).toggleClass('active');
        $(indicators[currentSlide]).toggleClass('active');
    };

    const nextSlide = () => goToSlide(currentSlide + 1);

    const prevSlide = () => goToSlide(currentSlide - 1);

    const play = () => {
        $('#pause').html('Pause');
        interval = setInterval(nextSlide, CarouselInterval);
        isPlaying = true;
    };

    const pause = () => {
        if (isPlaying) {
            $('#pause').html('Play');
            isPlaying = false;
            clearInterval(interval);
        }
    };

    const clickPause = () => isPlaying ? pause() : play();

    const clickNext = () => {
        pause();
        nextSlide();
    };

    const clickPrev = () => {
        pause();
        prevSlide();
    };

    const clickIndicator = (e) => {
        if ($(e.target).hasClass('indicator')) {
            clickPause();
            goToSlide(+$(e.target).attr('data-slide-to'));
        }
    };

    const pressKey = (e) => {
        if (e.key === LEFT) clickPrev();
        if (e.key === RIGHT) clickNext();
        if (e.key === SPACE) clickPause();
    };

    const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

    const swipeEnd = (e) => {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX > 150 && clickNext();
        swipeStartX - swipeEndX < -150 && clickPrev();
    };

    const setListeners = () => {
        $('#pause').on('click', clickPause);
        $('#next').on('click', clickNext);
        $('#previous').on('click', clickPrev);
        $('.indicators').on('click', clickIndicator);
        $(document).on('keydown', pressKey);
        $('.carousel').on('touchstart', swipeStart);
        $('.carousel').on('touchend', swipeEnd);
    };

    const init = () => {
        $('.indicators').css('display', 'flex');
        $('.controls').css('display', 'block');
        setListeners();
        interval = setInterval(nextSlide, CarouselInterval);
    };

    init();

    let timeToConsole = (str) => str = str.replace(/...$/g, '');
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    console.log(`Slide change interval - ${timeToConsole(`${time}`)} sec`);

}(3000));