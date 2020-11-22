const apiKey = firebaseConfig.apiKey;
const dbUrl = `https://shoe-shelf-921e0.firebaseio.com/`;


const authUser = {
    login() {

    },
    logout(e) {
        e.preventDefault();
        
        navigate(url.pathname.slice(1));

        clearUser();
    },

    async onLoginSubmit(e) {
        e.preventDefault();
        const formData = new FormData(document.forms['login-form']);

        const email = formData.get('email');
        const password = formData.get('pass');

        console.log(email, password);
        
        if (!email || password.length < 6) {
            console.log('err');
            return;
        }

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.status != 200) {
            console.log('!=200');
            return;
        }
        
        let userData = await response.json();
        console.log(userData);
        
        if (!userData) {
            return;
        }
        
        saveUser(userData.email, userData.localId);
        navigate('home');

    },

    async onRegisterSubmit(e) {
        e.preventDefault();
        const formData = new FormData(document.forms['register-form']);

        const email = formData.get('email');
        const password = formData.get('pass');
        const rePass = formData.get('rePass');

        if (!email || password.length < 6 || password !== rePass) {
            console.log('err');
            return
        }

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.status != 200) {
            console.log('!=200');
            return;
        }
        let userData = await response.json();
        console.log(userData);
        
        if (!userData) {
            return;
        }
        
        saveUser(userData.email, userData.localId);
        navigate('home');

    }


}

