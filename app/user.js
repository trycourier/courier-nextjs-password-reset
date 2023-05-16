const users = [{
        user_id: 'user-1',
        email: 'foo@test.com'
    }, {
        user_id: 'user-2',
        phone: '+12065551212'
    }
]

function findUserByEmail(email) {
    return users.find(u => u.email === email)
}

function findUserByPhone(phone) {
    return users.find(u => u.phone === phone)
}


export default {
    findUserByEmail,
    findUserByPhone
}