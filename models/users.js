import { kv } from '@vercel/kv'
import { createHash } from 'node:crypto'

// TODO:
//
// Replace this stub with a proper User Management backed by a service or DB. 

async function createUser({ password, name, email, phone, preference }) {
    // create unique ID for user
    const id = createHash('sha3-256').update(phone ? phone : email).digest('hex')
    const key = `users:${ id }:${ email }:${ phone }`
    const ex = 5 * 60 // expire this record in 5 minutes
    // hash the password
    const hashed_password = createHash('sha3-256').update(password).digest('hex')
    await kv.set(key, { user_id: key, hashed_password, name, email, phone, preference }, { ex })
    return key
}

async function findUserById(user_id) {
    const keys = await kv.keys('users:*')
    const key = keys.find(k => k.indexOf(user_id) >= 0)
    return key ? await kv.get(key) : null
}

async function findUserByEmail(email) {
    const keys = await kv.keys('users:*')
    const key = keys.find(k => k.indexOf(email) >= 0)
    return key ? await kv.get(key) : null
}

async function findUserByPhone(phone) {
    const keys = await kv.keys('users:*')
    const key = keys.find(k => k.indexOf(phone) >= 0)
    return key ? await kv.get(key) : null
}

async function updatePassword(key, password) {
    const user = await kv.get(key)
    const ex = 5 * 60 // expire this record in 5 minutes
    // hash the password
    const hashed_password = createHash('sha3-256').update(password).digest('hex')
    await kv.set(key, { ...user, hashed_password }, { ex })
}

export {
    createUser,
    findUserById,
    findUserByEmail,
    findUserByPhone,
    updatePassword
}