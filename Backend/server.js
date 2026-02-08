// server ko start krna
// database se connect krna

require('dotenv').config()

const app = require('./src/app')
const connectTODb = require('./src/config/database')
app.listen(3000, () => {
    console.log("server is running on port 3000");
    
})