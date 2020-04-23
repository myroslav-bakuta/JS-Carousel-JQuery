(function (time) {

    // http://jquery.page2page.ru/index.php5/Функция_jQuery
    // http://jquery.page2page.ru/index.php5/Объект_jQuery
    // https://html5book.ru/vvedenie-v-jquery/

    let $slides = $('.slide');
    let $indicators = $('.indicator');
    let $carousel = $('.carousel');
    let $controls = $('.controls');
    let $pausePlayBtn = $('#pause');
    let $nextBtn = $('#next');
    let $prevBtn = $('#previous');
    let $indicatorContainer = $('.indicators');

    let currentSlide = 0;
    let isPlaying = true;
    let carouselInterval = time;
    let swipeStartX = null;
    let swipeEndX = null;

    const LEFT = 'ArrowLeft';
    const RIGHT = 'ArrowRight';
    const SPACE = ' ';

    const goToSlide = (n) => {
        $($slides[currentSlide]).toggleClass('active');
        $($indicators[currentSlide]).toggleClass('active');
        currentSlide = (n + $slides.length) % $slides.length;
        $($slides[currentSlide]).toggleClass('active');
        $($indicators[currentSlide]).toggleClass('active');
    };

    const nextSlide = () => goToSlide(currentSlide + 1);

    const prevSlide = () => goToSlide(currentSlide - 1);

    const play = () => {
        $pausePlayBtn.html('Pause');
        interval = setInterval(nextSlide, carouselInterval);
        isPlaying = true;
    };

    const pause = () => {
        if (isPlaying) {
            $pausePlayBtn.html('Play');
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
        clickPause();
        goToSlide(+$(e.target).attr('data-slide-to'));
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

        // http://jquery.page2page.ru/index.php5/On

        $pausePlayBtn.on('click', clickPause);
        $nextBtn.on('click', clickNext);
        $prevBtn.on('click', clickPrev);
        $indicatorContainer.on('click', '.indicator', clickIndicator);
        $(document).on('keydown', pressKey);
        $carousel.on('touchstart', swipeStart);
        $carousel.on('touchend', swipeEnd);
    };

    const init = () => {
        $indicatorContainer.css('display', 'flex');
        $controls.css('display', 'block');
        setListeners();
        interval = setInterval(nextSlide, carouselInterval);
    };

    init();

    // Slides interval

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    //    let timeToConsole = (str) => str = str.replace(/...$/g, '');
    //    console.log(`Slides change interval - ${timeToConsole(`${time}`)} sec`);

}(3000));