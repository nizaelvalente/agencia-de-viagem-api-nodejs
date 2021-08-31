module.exports = {

    async validation(newUserData) {
        // Desistruturando dados
        const { name,  gender, age, email, password} = newUserData // dados pessoais
        const {logradouro, localidade, numero, bairro, uf} = newUserData.address // endereço

        //validação de campos vazios
        if (!name ||  !gender || !age ||  !email ||  !password 
            || !logradouro ||  !localidade || !numero || !bairro || !uf) {
            return { status: 400, data: 'Todos os campos são obrigatóriosd' }
        }

        // validação no nome
        if (name.length < 3 || name.length > 30 || regex.name(name)) {
            return { status: 400, data: 'Nome inválido' }
        }
        // validação de senha
        if (password.length < 8 || password.length > 16 || regex.password(password)) {
            return { status: 400, data: 'Senha inválido' }
        }

        //validação de idade
        if (age < 18) {
            return { status: 400, data: 'Idade inválido' }
        }
        //validação de email

        if (!email.includes('@')) {
            return { status: 400, data: 'Email inválido' }
        }

        // validação de sexo
        if (gender.toUpperCase() != 'M' && gender.toUpperCase() != 'F') {
            return { status: 400, data: 'Sexo inválido' }
        }
        return newUserData
    }
}

// validação de nome e senha
const regex = {

    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    number: /[0-9]/,
    specialCharacter: /[@#$%¨&*",.;`:?ºª+=§\-_|)(\][}{]/,
    name: name => {
        if (regex.specialCharacter.test(name) || regex.number.test(name)) {
            return true
        }
        return false
    },
    password: password => {
        if (!regex.specialCharacter.test(password) 
        || !regex.number.test(password) 
        || !regex.upperCase.test(password) 
        || !regex.lowerCase.test(password)) {
            return true
        }
        return false
    },

}