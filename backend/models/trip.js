const reservationSchema = require('./reservation')
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "seats must be an integer.",
    },
    min: 0,
  },
  title: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  reservations: {
    type: [reservationSchema],
    required: false,
  }
});

tripSchema.pre('save', function(next) {
  console.log(this);
  const x = this.reservations.filter(x => x.state != 'Cancelled').map(x => x.tickets).reduce((a, b) => a + b, 0)
  console.log("w validacie: ", x, this.seats)
  if(this.seats < x){
    next(new Error('Brak wolnych miejsc'))
  }
  else
    next()
})

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;