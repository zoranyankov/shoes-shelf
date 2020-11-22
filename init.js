function init() {

    route(location.pathname.slice(1));

    updateHeader();
    document.getElementById('main-content').addEventListener('click', navigateHandler);
    document.querySelector('div.nav').addEventListener('click', navigateHandler);
}

function updateHeader() {
    const user = getUser();
    const isLogged = Boolean(user);

    if (!isLogged) {
        document.querySelector('div.nav li.create').style.display = 'none';
        document.querySelector('div.nav li.welcome').style.display = 'none';
        document.querySelector('div.nav a.logo').href = 'register';
        return
    }
    document.querySelector('div.nav li.welcome').innerHTML = `Welcome, ${user.email} | <a href="logout">Logout</a>`;
    document.querySelector('div.nav li.create').style.display = 'block';
    document.querySelector('div.nav li.welcome').style.display = 'block';
}

init();