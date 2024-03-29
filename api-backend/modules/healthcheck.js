const mongoose = require('mongoose')


// Confirm db connectivity
const healthcheck = (db) => {
    // Check db readyState per mongoDB documentation
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