const routes = {
    '' : 'homepage-view',
    '/' : 'homepage-view',
    'home' : 'homepage-view',
    'register' : 'register-form-view',
    'login' : 'login-form-view',
    'logout' : 'home',
    'create-offer' : 'create-offer-view',
    'shoes' : 'shoes-view'
}

const route = (fullPath) => {
    const contentEl = document.getElementById('main-content');

    switch (fullPath) {
        case 'logout' : 
            clearUser();
            return navigate(routes['logout']);
    }
    
    const user = getUser();
    let isLogged = Boolean(user);
    templateData = isLogged ? {'email': user.email} : '';

    fullPath = fullPath ? fullPath : location.pathname;

    const templateView = document.getElementById(routes[fullPath]).innerHTML;
    const template = Handlebars.compile(templateView);
    const newContent = template(templateData);

    contentEl.innerHTML = newContent;
}

const navigate = (path) => {
    updateHeader();
    history.pushState({}, '', path);
    route(path);
}