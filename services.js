const apiKey = firebaseConfig.apiKey;
const dbUrl = `https://shoe-shelf-921e0.firebaseio.com/Shoes/`;

function updateHeader() {
    const user = getUser();
    const isLogged = Boolean(user);

    if (!isLogged) {
        document.querySelector('div.nav li.create').style.display = 'none';
        document.querySelector('div.nav li.welcome').style.display = 'none';
        document.querySelector('div.nav a.logo > img').setAttribute('onclick', "navigate('register')");
        return
    }
    document.querySelector('div.nav li.welcome').innerHTML = `Welcome, ${user.email} | <a href="logout">Logout</a>`;
    document.querySelector('div.nav li.create').style.display = 'block';
    document.querySelector('div.nav li.welcome').style.display = 'block';
    let logoLink = document.querySelector('div.nav a.logo > img');
    logoLink.removeAttribute('onclick', "navigate('register')");
    logoLink.setAttribute('onclick', "navigate('home')");
}

const request = async function (url, method, body) {
    let obj = { method };
    if (body) {
        obj = Object.assign(obj, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
    let response = await fetch(url, obj);
    if (response.status != 200) {
        console.log('!=200');
        return ;
    }
    let resultData = await response.json();
    
    if (!resultData) {
        console.log('NO DATA');
        return;
    }
    return resultData;
}

const authUser = {
    async logInUser(userInfo) {
        const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        const userData = await request(signInUrl, 'POST', userInfo);
        return userData;
    },
    async addUser(userInfo) {
        const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        const userData = await request(signUpUrl, 'POST', userInfo);
        return userData;
    }
}

const shoes = {
    async getAll() {
        let getAllUrl = `${dbUrl}.json`;
        let shoes = await request(getAllUrl, 'GET');
        if (shoes) {
            let shoesArr = [];
            Object.entries(shoes)
                .map(([id, info]) => {
                    shoesArr.push(Object.assign(info, { id }));
                });
            return shoesArr;
        }
    },
    async getOne(id) {
        let getOneUrl = `${dbUrl}${id}.json`
        let resultData = await request(getOneUrl, 'GET');
        return resultData;
    },
    async addOffer(obj) {
        let addOfferUrl = `${dbUrl}.json`
        let resultData = await request(addOfferUrl, 'POST', obj);
        return resultData;
    },
    async deleteOffer(id) {
        let getOneUrl = `${dbUrl}${id}.json`
        let resultData = await request(getOneUrl, 'DELETE');
        return resultData;
    },
    async editOffer(id, obj) {
        let getOneUrl = `${dbUrl}${id}.json`
        let resultData = await request(getOneUrl, 'PATCH', obj);
        return resultData;
    },
    async addBuyer(id, buyer) {
        let addBuyerUrl = `${dbUrl}${id}/buyers.json`
        let resultData = await request(addBuyerUrl, 'PATCH', buyer);
        return resultData;
    },
}
