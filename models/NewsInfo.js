const mongoose = require('mongoose');

// Schema of NewsInfo Table
const NewsInfoSchema = new mongoose.Schema({
    newsHeading: {
        type: String,
        required: true,
        trim: true
    },
    subHeading: {
        type: String,
        trim: true
    },
    newsLink: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },
    publishedDate: {
        type: String,
        required: true,
    },
    /*vote: {
        type: String,
        required: true,
        validate(value){
            lower = value.toLowerCase()
            if(lower.localeCompare('up') == 0 || lower.localeCompare('down') == 0 ){
                
            } else {
                throw new Error("You have to vote with 'up' or 'down'")
            }
        }
    },*/
    upVote: {
        type: Number
    },
    downVote: {
        type: Number
    },
    comment: {
        type: String,
        trim: true
    },
    keyword: [{
        type: String
    }]
})

const NewsInfo = mongoose.model('News_Info', NewsInfoSchema);
module.exports = NewsInfo