// TODO:
//
// Replace this with a proper implementation of a session provider for your app, such as https://github.com/vvo/iron-session .

function getSession(req, attr) {
    const cookie = req.cookies.get(attr)
    return (cookie ? cookie.value : undefined)
}

function setSession(res, attr, value) {
    res.cookies.set(attr, value)
}

export {
    getSession,
    setSession
}