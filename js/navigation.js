const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('#primary-navigation');
const submenuTrigger = document.querySelector('.nav-dropdown-trigger');
const submenuParent = submenuTrigger?.closest('.has-submenu');

if (menuButton && navigation) {
    const setMenuState = (isOpen) => {
        navigation.classList.toggle('is-open', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? '關閉導覽選單' : '開啟導覽選單');

        const icon = menuButton.querySelector('i');
        icon?.classList.toggle('fa-bars', !isOpen);
        icon?.classList.toggle('fa-xmark', isOpen);
    };

    menuButton.addEventListener('click', () => {
        setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            setMenuState(false);
            submenuParent?.classList.remove('submenu-open');
            submenuTrigger?.setAttribute('aria-expanded', 'false');
        }
    });

    submenuTrigger?.addEventListener('click', () => {
        const isOpen = submenuTrigger.getAttribute('aria-expanded') !== 'true';
        submenuParent?.classList.toggle('submenu-open', isOpen);
        submenuTrigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
            submenuParent?.classList.remove('submenu-open');
            submenuTrigger?.setAttribute('aria-expanded', 'false');
            menuButton.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) setMenuState(false);
    });
}

document.querySelectorAll('.case-carousel').forEach((carousel) => {
    const scroller = carousel.querySelector('.case-scroll');
    const previousButton = carousel.querySelector('.case-arrow-prev');
    const nextButton = carousel.querySelector('.case-arrow-next');

    if (!scroller) return;

    const scrollOneCard = (direction) => {
        const card = scroller.querySelector('.case-card');
        if (!card) return;

        const gap = parseFloat(getComputedStyle(scroller).gap) || 0;
        scroller.scrollBy({
            left: direction * (card.getBoundingClientRect().width + gap),
            behavior: 'smooth'
        });
    };

    previousButton?.addEventListener('click', () => scrollOneCard(-1));
    nextButton?.addEventListener('click', () => scrollOneCard(1));
});
