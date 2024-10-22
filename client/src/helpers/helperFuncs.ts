export function getUserSession() {
    let session = document.cookie;
    return session;
}

module.exports = {
    getUserSession
}