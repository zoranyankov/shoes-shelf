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

const route = async (fullPath) => {
    const contentEl = document.getElementById('main-content');
    let [path, id] = fullPath.split('/');

    const user = getUser();
    let isLogged = Boolean(user);
    let templateData = isLogged ? { 'email': user.email, isLogged } : '';
    let buyed;
    let owner;
    let currentShoe;

    switch (path) {
        case 'logout':
            clearUser();
            return navigate(routes['logout']);
        case 'home':
            let allShoes = await shoes.getAll();
            if (allShoes) {
                allShoes.map(shoe => {
                    shoe.buyed = shoe.buyers ? Object.values(shoe.buyers).some(buyer => buyer == user.email) : false;
                    shoe.owner = Boolean(shoe.creator == user.email);
                });
            }
            templateData.shoes = allShoes;
            templateData = Object.assign(templateData, { buyed });
            break;
        case '':
            templateData.shoes = await shoes.getAll();
            break;
        case 'details':
            currentShoe = await shoes.getOne(id);
            templateData = Object.assign(templateData, currentShoe)
            owner = Boolean(currentShoe.creator == user.email);
            buyed = currentShoe.buyers ? Object.values(currentShoe.buyers).some(buyer => buyer == user.email) : false;
            let buyersCount = currentShoe.buyers ? Object.keys(currentShoe.buyers).length : 0;
            templateData = Object.assign(templateData, { owner, buyed, id, buyersCount })
            break;
        case 'edit-offer':
            templateData = await shoes.getOne(id);
            templateData = Object.assign(templateData, { id })
            break;
        case 'buy-offer':
            await shoes.addBuyer(id, user.email);
            currentShoe = await shoes.getOne(id);
            console.log(currentShoe);
            buyed = currentShoe.buyers ? Object.values(currentShoe.buyers).some(buyer => buyer == user.email) : false;
            templateData = Object.assign(templateData, { buyed, id, ...currentShoe });
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

const navigate = (fullPath) => {
    updateHeader();
    history.pushState({}, '', fullPath);
    route(fullPath);
}