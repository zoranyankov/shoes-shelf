function init() {

    route(location.pathname.slice(1));

    updateHeader();
    document.getElementById('main-content').addEventListener('click', navigateHandler);
    document.querySelector('div.nav').addEventListener('click', navigateHandler);
}

function onLoginSubmit(e) {
    e.preventDefault();
    const formData = new FormData(document.forms['login-form']);

    const email = formData.get('email');
    const password = formData.get('pass');

    if (!email || password.length < 6) {
        console.log('err');
        return;
    }

    authUser.logInUser({ email, password })
        .then (userData => {
            saveUser(userData.email, userData.localId);
            navigate('home');
        })
}

function onRegisterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(document.forms['register-form']);

    const email = formData.get('email');
    const password = formData.get('pass');
    const rePass = formData.get('rePass');

    if (!email || password.length < 6 || password !== rePass) {
        console.log('err');
        return
    }

    let newUserInfo = {email, password};

    authUser.addUser({ email, password })
        .then(userData => {
            saveUser(userData.email, userData.localId);
            navigate('home');
        })
}

function onCreateSubmit(e) {
    console.log(document.forms['create-offer-form']);
    const formData = new FormData(document.forms['create-offer-form']);
    const user = getUser();

    const name = formData.get('name');
    const price = formData.get('price');
    const imgUrl = formData.get('imgUrl');
    const description = formData.get('description');
    const brand = formData.get('brand');
    const creator = user.id;
    const buyers = [];

    if (!name || !price || !imgUrl || !description || !brand || !creator) {
        console.log('not all Data!!!');
        return;
    }

    let newOfferObj = { name, price, imgUrl, description, brand, creator, buyers };
    shoes.addOffer(newOfferObj);
    console.log('CREATED');

    navigate('home');

}

init();