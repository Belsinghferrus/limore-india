

    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (toggle) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            const lines = toggle.querySelectorAll('span');
            if (menu.classList.contains('open')) {
                lines[0].style.transform = 'rotate(45deg) translateY(5px)';
                lines[1].style.transform = 'rotate(-45deg) translateY(-5px)';
                lines[1].style.width = '24px';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.transform = 'none';
                lines[1].style.width = '16px';
            }
        });
    }
