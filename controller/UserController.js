const User = require("../models/index").user
const { hashPassword, comparePassword } = require("../helper/bcrypt")
const {response, resError, invalidRequestRespon} = require("../helper/response")
const { generateToken } = require("../helper/authentication");

const registerUser = async(req, res) => {
    let {nama,username, password, status, role, telepon} = req.body

    const hash = hashPassword(password);

    await User.create({
        nama,username, password: hash, status, role, telepon
    }).then((dafpes) => {
        response(201, "Succes Create Data User", dafpes, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getDataUser = async(req, res) => {
    await User.findAll().then(u => {
        const dta = {
            id: u[0].id,
            nama: u[0].nama,
            username: u[0].username,
            status: u[0].status,
            role: u[0].role,
            telepon: u[0].telepon,
            createdAt: u[0].createdAt
        }
        
        response(201, "Success", dta, res)

    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getUserByID = async(req, res) => {
    const id = req.params.id
    await User.findOne({where: {id}}).then(u => {
        response(201, "Succes Create Data User", u, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const userLogin = async(req, res) => {
    const { username,  password } = req.body

    await User.findOne({ where: { username } }).then(user => {
        if (!user) {
            const msg = "username tidak terdaftar!"
            const status = "user not available"
            return invalidRequestRespon(401, msg, status, res )
        }

        const passwordValid = comparePassword(password, user.password)
        if (!passwordValid){
            const msg = "Password salah!"
            return invalidRequestRespon(401, msg, null, res)
        }

        const data = {
            id: user.id,
            nama: user.nama,
            username: user.username,
            role: user.role
        }

        const token = generateToken(data)
        const msg = "Login Success"
        const sendData = {
            token,
            status: "sukses",
            scantimestamp: new Date()
        }
        return response(200, msg, sendData, res )
    }).catch(error => {
        console.log(error)
        return resError(500, "INTERNAL SERVER ERROR", error, res )
    })
}


module.exports = {
    registerUser,
    getDataUser,
    getUserByID,
    userLogin
}