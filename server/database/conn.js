const mongoose = require("mongoose");
const db = process.env.DATABASE;


mongoose.connect(db, {
    // useNewUrlParser: true, // Use the new parser
    // useUnifiedTopology: true, // Use the new topology engine
    // useCreateIndex: true, // Ensure that indexes are created in a backwards-compatible way
    // useFindAndModify: false // Use the MongoDB driver's findOneAndUpdate() instead of findAndModify()
}).then(()=>{
    console.log("Success");
}).catch(()=>{
    console.log("Not Connect");
})