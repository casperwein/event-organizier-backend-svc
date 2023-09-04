const fs = require('fs');
const qr = require('qrcode');
const crypto = require("crypto");

const QRCode = require("../models/index").qrcode
const {response, resError, invalidRequestRespon} = require("../helper/response")
const {setLog} = require("./../helper/response");
const {sentEmail} = require("./EmailController")

const uuid = crypto.randomUUID()

const generateQRCode = async (data) => {
    const value = data.nama + " with id " + data.id
    // const va = 'https://ell-shadday-backend-svc-production.up.railway.app/produk'
    
    try {    
        const qrData = await qr.toDataURL(value, { width: 1000, height: 1000 });
    
        const fileName = 'public/qrcode/' +  uuid + ".png"
        await fs.writeFileSync(fileName, qrData.split(',')[1], 'base64');
        
        const dtSave = {
          peserta_id: data.id,
          event_id: data.event_id,
          status: "Open",
          qrcode_path: fileName
        }
        
        addQRCode(dtSave)

        console.log('QR Code telah dibuat dan disimpan di ' + fileName);
        const lg = {
          data, fileName
        }
        setLog("generate QR Code Berhasil!", lg)

        const dataEmail = {
          pathFile: fileName,
          nama: data.nama,
          email: data.email
        }

        sentEmail(dataEmail)

      } catch (err) {
        console.error('Terjadi kesalahan: ' + err.message);
        setLog("generate QR Code Gagal!", err.message)
      }
}


const addQRCode = async(data) => {
    await QRCode.create(data).then(
      setLog("insert data  qr code into db succesfully", data)
    ).catch(e => {
      setLog("insert data qr code failed!", e)
    })
}


const getDataQRCode = async(req, res) => {
    await QRCode.findAll().then(q => {
        response(200, "Success", q, res)
    }).catch(error => {
        console.log(error)
        resError(500, process.env.ISE, error, res)
    })
}

const getDataQRCodeByEventId = async(req, res) => {
  const event_id = req.params.event_id

  await QRCode.findAll({where: {event_id}}).then(q => {
      response(200, "Success", q, res)
  }).catch(error => {
      console.log(error)
      resError(500, process.env.ISE, error, res)
  })
}

const updateStatus = async(req, res) => {
  const event_id = req.params.event_id
  const peserta_id = req.params.peserta_id

  await QRCode.findOne({where: {event_id, peserta_id}}).then(q => {
      if(!q){
        response(400, "Data Not Found", [], res)
      }

      if(q.status == "Open"){
        q.status = "Close"
        q.save()
        setLog("update status CLOSE", q)
        response(200, "Success", q, res)
      } else {
        setLog("FAILED SCAN, QR CODE telah digunakan", q)
        response(400, "QR CODE TELAH DIGUNAKAN", "FAILED", res)
      }
  }).catch(error => {
      console.log(error)
      resError(500, process.env.ISE, error, res)
  })
}

// generateQRCode("https://ell-shadday-backend-svc-production.up.railway.app/produk")

module.exports = {
    generateQRCode,
    getDataQRCode,
    getDataQRCodeByEventId,
    updateStatus
}