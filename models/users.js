import users from './users.json' assert { type: 'json' }

// TODO:
//
// Replace this stub with a properly implemented User Management service.

function findUserByEmail(email) {
    return users.find(u => u.email === email)
}

function findUserByPhone(phone) {
    return users.find(u => u.phone === phone)
}

function updatePassword(user_id, password) {
    users.find(u => u.user_id === user_id).password = password
}

export default {
    findUserByEmail,
    findUserByPhone,
    updatePassword
}