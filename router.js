const routes = {
    // '': 'homepage-view',
    // '/': 'homepage-view',
    'home': 'homepage-view',
    'register': 'register-form-view',
    'login': 'login-form-view',
    'logout': 'home',
    'create-offer': 'create-offer-view',
    'details': 'offer-details-view',
    'edit-offer': 'edit-offer-view',
    'buy-offer': 'offer-details-view',
    'delete-offer': 'home',
}

const route = async (fullPath, data) => {
    const contentEl = document.getElementById('main-content');
    let [path, id] = fullPath.split('/');
    console.log(fullPath);
    console.log(path);
    console.log(id);

    const user = getUser();
    let isLogged = Boolean(user);
    let templateData = isLogged ? { 'email': user.email, isLogged } : '';

    switch (path) {
        case 'logout':
            clearUser();
            return navigate(routes['logout']);
        case 'home':
            templateData.shoes = await shoes.getAll();
            break;
        case '':
            templateData.shoes = await shoes.getAll();
            break;
        case 'details':
            let current = await shoes.getOne(id);
            templateData = Object.assign(templateData, current)
            let owner = Boolean(current.creator == user.id);
            let notBuyed = !(current.buyers.includes(user.id));
            templateData = Object.assign(templateData, {owner, notBuyed, id})
            break;
        case 'edit-offer':
            templateData = await shoes.getOne(id);
            templateData = Object.assign(templateData, {id})
            break;
        case 'delete-offer':
            await shoes.deleteOffer(id);
            return navigate(routes['delete-offer']);
    }

    path = path ? path : location.pathname;

    const templateView = document.getElementById(routes[path]).innerHTML;
    const template = Handlebars.compile(templateView);
    const newContent = template(templateData);

    contentEl.innerHTML = newContent;
}

const navigate = (path) => {
    updateHeader();
    history.pushState({}, '', path);
    route(path);
}