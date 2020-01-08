const navBar  = document.getElementById("nav-bar"),
      navMenu = document.getElementById("nav-menu");
      visible = false;

navBar.onclick = () => {
    if (!visible) {
        navMenu.classList.add("menu-transition-end");
        visible = true;
        event.stopPropagation();
    }
};

window.onclick = () => {
    if (visible) {
        navMenu.classList.remove("menu-transition-end");
        visible = false;
    }
    
};