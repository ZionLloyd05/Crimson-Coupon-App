const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var couponSchema = new Schema({
    //define schema here
        name: {type: String, required: true},
        url: {type: String, required: true},
        companyName: {type: String, required: true},
        startDate: Date,
        endDate: Date,
        tags: [String],
        clicks: [Date],
        views: [Date],
        redeems: [Date],
        postedBy: {type: Schema.OjectId, required: true},
        approvedDate: Date
    },
    {
        toObject: {getters: true},
        //change name of default timestamps
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        }
    }
);

couponSchema.pre('save', function(callback){
    //run hook code
    if(!this.startDate)
        this.startDate = new Date();
    callback();
});

var Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;