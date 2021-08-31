const { validation } = require('../validation')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User') // pra que server esse 'User' ????
const { ObjectId } = mongoose.Types
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(newUserData) { // newUserData - dados para criação de novo usuário
        try {
            const userData = await validation(newUserData) // va
            if (userData.status == 400) {
                return userData
            }
            const usuarioCriado = await UserModel.create(userData)
            return { status: 200, data: usuarioCriado }

        } catch (error) {
            return { status: 400, data: { erro: error.message } }
        }
    },

    async auth(data) {
        try {
            const { email, password } = data

            if (!email || !password) {
                return { status: 400, data: { erro: 'Todos os campos são obrigatórios' } }
            }

            const user = await UserModel.findOne({ email }).select('+password')

            if (!user) {
                return { status: 400, data: { erro: 'Usuário não encontrado.' } }
            }

            const compare = await bcrypt.compare(password, user.password)
            if (!compare) {
                return { status: 400, data: { erro: 'Senha inválida' } }
            }

            const token = generateToken({ id: user.id })

            return { status: 200, data: {token, user} }

        } catch (error) {

            return { status: 400, data: { erro: error.message } }
        }
    },

    async getById(id) {
        try {
            const [usuario] = await UserModel.find({
                _id: ObjectId(id),
                deleted: false
            })

            if (!usuario) {
                return { status: 400, data: { erro: 'Usuario não encontrado' } }
                // throw new Error ( 'Usuario não encontrado')
            }
            return { status: 200, data: usuario }

        } catch (error) {
            return { status: 400, data: { erro: error.message } }
        }
    },

    async get(query) {
        try {
            query.deleted = false
            const usuarios = await UserModel.find(query)
            return { status: 200, data: usuarios }

        } catch (error) {
            return { status: 400, data: { erro: error.message } }
        }
    },


    async update(id, data) {
        // validar atualização de objeto endereço
        try {
            const usuario = await UserModel.findByIdAndUpdate(id, data, { new: true }) // 
            return { status: 200, data: usuario }

        } catch (error) {
            return { status: 400, data: { erro: error.message } }
        }
    },

    async delete(id) {
        try {
            await UserModel.findByIdAndUpdate(id, { deleted: true })
            return { status: 200, data: "usuario deletado com sucesso" }

        } catch (error) {
            return { status: 400, data: { erro: error.message } }
        }

    }
}

function generateToken(params = {}) {
    const token = jwt.sign(params, 'valente', { expiresIn: 86400 })
    return `Bearer ${token}`
}