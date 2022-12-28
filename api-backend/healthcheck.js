const mongoose = require('mongoose')

const healthcheck = (db) => {
    result = {}
    switch (db.readyState) {
        case 1:
            return { "status": "OK", "dbconnection": "MongoDB database connected" }
        case 2:
            return { "status": "failed", "dbconnection": "MongoDB database connecting" }
        case 3:
            return { "status": "failed", "dbconnection": "MongoDB database disconnecting" }
        default:
            return { "status": "failed", "dbconnection": "MongoDB database disconnected" }

    }
    return result
}


module.exports = healthcheck