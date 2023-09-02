const Event = require("../models/index").event 
const {response, resError, invalidRequestRespon} = require("../helper/response")


const createEvent = async(req, res) => {
    let {nama, tanggal, eventpathfiledesc} = req.body;

    await Event.create({nama, tanggal, eventpathfiledesc})
    .then((event) => {
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

module.exports = {
    createEvent,
    getAllEvent,
    getEventById,
    updateEvent,
    deleteEvent
}
