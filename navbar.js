const navBar  = document.getElementById("nav-bar"),
      navMenu = document.getElementById("nav-menu");
      visible = false;

const showMenu = () => {
    navMenu.classList.add("menu-transition-end");
    visible = true;
};

const hideMenu = () => {
    if (visible) {
        navMenu.classList.remove("menu-transition-end");
        visible = false;
    }
};

navBar.onclick = () => {
    if (!visible) {
        showMenu();
        event.stopPropagation();
    }
    setTimeout(hideMenu, 5000);
};

window.onclick = () => {
    if (visible) {
        hideMenu();
    }
};