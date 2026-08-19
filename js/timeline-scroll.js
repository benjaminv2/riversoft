document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.tech-timeline-section .timeline-scroll');

    if (!timeline) return;

    timeline.addEventListener('wheel', (event) => {
        const maxScrollLeft = timeline.scrollWidth - timeline.clientWidth;

        if (maxScrollLeft <= 0 || event.deltaY === 0) return;

        const movingRight = event.deltaY > 0;
        const canMoveRight = timeline.scrollLeft < maxScrollLeft - 1;
        const canMoveLeft = timeline.scrollLeft > 1;

        if ((movingRight && canMoveRight) || (!movingRight && canMoveLeft)) {
            event.preventDefault();
            timeline.scrollLeft += event.deltaY;
        }
    }, { passive: false });
});
