const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('#primary-navigation');
const submenuItems = navigation ? [...navigation.querySelectorAll('.has-submenu')] : [];

if (menuButton && navigation) {
    const setMenuState = (isOpen) => {
        navigation.classList.toggle('is-open', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? '關閉導覽選單' : '開啟導覽選單');

        const icon = menuButton.querySelector('i');
        icon?.classList.toggle('fa-bars', !isOpen);
        icon?.classList.toggle('fa-xmark', isOpen);
    };

    const closeSubmenus = (exception = null) => {
        submenuItems.forEach((item) => {
            if (item === exception) return;
            item.classList.remove('submenu-open');
            item.querySelector(':scope > button[aria-controls]')?.setAttribute('aria-expanded', 'false');
        });
    };

    menuButton.addEventListener('click', () => {
        setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a, .language-option')) {
            setMenuState(false);
            closeSubmenus();
        }
    });

    submenuItems.forEach((item) => {
        const trigger = item.querySelector(':scope > button[aria-controls]');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') !== 'true';
            closeSubmenus(item);
            item.classList.toggle('submenu-open', isOpen);
            trigger.setAttribute('aria-expanded', String(isOpen));
        });
    });

    navigation.querySelectorAll('.language-option').forEach((option) => {
        option.addEventListener('click', () => {
            navigation.querySelectorAll('.language-option').forEach((item) => item.removeAttribute('aria-current'));
            option.setAttribute('aria-current', 'true');
            option.blur();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
            closeSubmenus();
            menuButton.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            setMenuState(false);
            closeSubmenus();
        }
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
