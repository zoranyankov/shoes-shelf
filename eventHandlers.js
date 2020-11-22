function navigateHandler(e) {
    e.preventDefault();
    
    if (e.target.nodeName != 'A' && e.target.nodeName != 'BUTTON' || e.target.className == 'submitBtn') {
        return;
    }

    const url = new URL(e.target.href);

    navigate(url.pathname.slice(1));

}