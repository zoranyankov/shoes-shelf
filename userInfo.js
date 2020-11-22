function saveUser(email, id) {
    const userInfo = {email, id};
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}
function getUser() {
    const user = localStorage.getItem('userInfo');
    return user ? JSON.parse(user) : null;
}
function clearUser() {
    localStorage.removeItem('userInfo');
}