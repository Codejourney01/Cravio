const mongoose= require("mongoose");

const restuarantschema= new mongoose.Schema({

    Rname:{
        type:String,
        required:true,
        trim:true
    },
    Rdescription:{
        type:String,
        required:true,
        trim:true
    }
    ,
    Rimage:{
        type:String,
        required:true
    },
    Rbanner:{
          type: String,
         required: true,
    },
    rating:{
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
      deliveryTime: {
      type: String,
      required: true,
    },

    priceForTwo: {
      type: Number,
      required: true,
    },

    cuisines: [
      {
        type: String,
      },
    ],
    location: {
      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
    },

    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
})
const Restaurant = mongoose.model("Restaurant", restuarantschema);

module.exports = Restaurant;
