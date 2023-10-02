const { Op } = require("sequelize");

const Peserta = require("../models/index").peserta 
const {response, resError, invalidRequestRespon} = require("../helper/response")
const {generateQRCode} = require("./QrCodeController")

const createPeserta = async(req, res) => {
    const data = {nama, telepon, email, alamat, los, event_id} = req.body;

    await Peserta.create(data).then(p => {
        generateQRCode(p)
        response(201, "Success", p, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getAllPeserta = async(req, res) => {
    await Peserta.findAll().then(p => {
        response(200, "Success", p, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getPesertaByEventId = async(req, res) => {
    const event_id = req.params.event_id

    await Peserta.findAll({where: {event_id}}).then(p => {
        response(200, "Success", p, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getPesertaByName = async(req, res) => {
    const nama = req.params.nama
    const id = req.params.id

    await Peserta.findAll({
        where: {
            nama:{
                [Op.like]: `%${nama}%`
            }
        }
    }).then(p => {
        console.log(p)
        response(200, "Success", p, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}


module.exports = {
    createPeserta,
    getAllPeserta,
    getPesertaByEventId,
    getPesertaByName
}