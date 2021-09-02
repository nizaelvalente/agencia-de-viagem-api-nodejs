const { validation } = require('../validation')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User') // pra que server esse 'User' ????
const { ObjectId } = mongoose.Types
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    async create(newUserData) { // newUserData - dados para criação de novo usuário
        try {
            delete newUserData._id
            const userData = await validation(newUserData) 
            if (userData.status == 400) {
                return userData
            }
            const usuarioCriado = await UserModel.create(userData)
            return { status: 200, data: usuarioCriado }

        } catch (error) {
            if(error.message.includes('E11000')){
                return { status: 400, data: { erro: 'email já cadastrdo.' } }
            }
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

            const token = generateToken({ id: user._id.toString() })

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

    async update(id, data, user) {
        
        // console.log(user._id.toString(), id)
        console.log(user)
        // validar atualização de objeto endereço
        try {
            if(user._id.toString() !== id){
            return { status: 400, data: { erro: 'Sem autorização' } }
            }
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
    const token = jwt.sign(params, process.env.SECRET, { expiresIn: 86400 })
    return `Bearer ${token}`
}