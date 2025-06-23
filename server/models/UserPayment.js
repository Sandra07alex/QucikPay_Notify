const mongoose =require('mongoose');
const userpaymentSchema = new mongoose.Schema(

    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        phone:{type:String,required:true},
        amount:{type:Number,required:true},
        status:{type:String,default:'pending'},
        createdAt:{type:Date,default:Date.now},
    }
)

const UserPayment = mongoose.model('UserPayment',userpaymentSchema);
module.exports = UserPayment;