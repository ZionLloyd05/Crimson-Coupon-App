const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    //defin schema here
        firstName: String,
        lastName: String,
        address: String,
        classYear: Number,
        email: String,
        phone: String,
        phoneProvider: String,
        venmo: String,
        isAdmin: Boolean,
        isSuperAdmin: Boolean,
        hash: String,
        companyName: String,
        interests: [String],
        timeSpent: Number
    },
    {
        toObject: { getters: true },
        //change name of mongoose default timstamps
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        }
    }
);

//hooks: a function that happens b4 another happens
userSchema.pre('save', function(callback){
    //run hook code
    if(this.isAdmin){
        if (!this.hash && !this.password){
            throw new Error("No Hash");
        }
        this.hash = this.hash || this.password;

        // TODO: hash password

    }
    //for non-admins
    else {
        if(!this.phone)
            throw new Error("Missing Phone");
        
        //TODO: ensure the phone number is legit

        if(!this.phoneProvider)
            throw new Error("Missing provider");
    }
    callback();
});

//create custom methods
userSchema.methods.greet = function(){
    console.log("hi, " + this.firstName);
};

// method to check password against hashed password
userSchema.methods.checkPassword = function(pw){
    return (this.hash === pw)
}

var User = mongoose.model('User', userSchema);

module.exports = User;