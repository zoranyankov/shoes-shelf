const routes = {
    '': 'homepage-view',
    '/': 'homepage-view',
    'home': 'homepage-view',
    'register': 'register-form-view',
    'login': 'login-form-view',
    'logout': 'home',
    'create-offer': 'create-offer-view',
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
            console.log(templateData.shoes);
            break;
    }

    // if (shoes) {
    //     let newShoes = [];
    //     Object.entries(shoes)
    //         .map(([id, info]) => {
    //             console.log(Object.assign(info, id));
    //     })

    //     console.log(newShoes);



    //     templateData = Object.assign(templateData, shoes);

    // }


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