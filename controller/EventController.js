const Event = require("../models/index").event 
const Peserta = require("../models/index").peserta 
const QRCode = require("../models/index").qrcode

const {response, resError, invalidRequestRespon} = require("../helper/response")


const createEvent = async(req, res) => {
    const eventpathfiledesc = req.file.path

    let  {nama, tempat, start_date, kapasitas,  end_date, keterangan} = req.body;
    console.log(eventpathfiledesc)
    await Event.create({nama, tempat, start_date, kapasitas, end_date, keterangan, eventpathfiledesc})
    .then((event) => {
        // console.log(event)
        response(201, "Succes Create Data User", event, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })  
}

const getAllEvent = async(req, res) => {
    await Event.findAll().then(e => {
        response(200, "Succes", e, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getEventById = async(req, res) => {
    const id = req.params.id
    
    await Event.findOne({where: {id}}).then(e => {
        response(200, "Succes", e, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const updateEvent = async(req, res) => {
    const id = req.params.id
    let data=  {nama, tanggal, eventpathfiledesc} = req.body;
    console.log(data)

    await Event.update(data, {where: {id}, returning: true})
    .then(e => {
        response(200, "Succes", e, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const deleteEvent = async(req, res) => {
    const id = req.params.id

    await Event.destroy({where: {id}}).then(e => {
        response(200, "Data deleted Succesfully", [], res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const detailEvent = async(req, res) => {
    const eventId = req.params.eventId

    const kapasitas = await Event.findOne({where: {id: eventId}, attributes: ["kapasitas"]})
    const totalPeserta = await Peserta.count({where: {event_id: eventId}})
    const qrScanned = await QRCode.count({where: {event_id: eventId, status: "Close"}})
    const qrNotYet = await QRCode.count({where: {event_id: eventId, status: "Open"}})

    const data = {
        kapasitas: kapasitas.kapasitas, totalPeserta, qrScanned, qrNotYet
    }

    response(200, "Data deleted Succesfully", data, res)
}

module.exports = {
    createEvent,
    getAllEvent,
    getEventById,
    updateEvent,
    deleteEvent,
    detailEvent
}
