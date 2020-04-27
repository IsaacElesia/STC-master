const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order'
  },
  handlers: [
    {
      handler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'handler'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  measurementsMenTop: {
    neck: {
      type: String
    },
    shoulder: {
      type: String
    },
    chest: {
      type: String
    },
    stomach: {
      type: String
    },
    waist: {
      type: String
    },
    hip: {
      type: String
    },
    shortSleeve: {
      type: String
    },
    longSleeve: {
      type: String
    },
    forearm: {
      type: String
    },
    wrist: {
      type: String
    },
    bicep: {
      type: String
    },
    regularShirtLength: {
      type: String
    },
    senatorShirtLength: {
      type: String
    }
  },
  measurementsMenBottom: {
    hips: {
      type: String
    },
    thighOrLaps: {
      type: String
    },
    knee: {
      type: String
    },
    calf: {
      type: String
    },
    ankle: {
      type: String
    },
    inseam: {
      type: String
    },
    length: {
      type: String
    }
  },
  measurementsWomenTop: {
    neck: {
      type: String
    },
    shoulder: {
      type: String
    },
    roundShoulder: {
      type: String
    },
    upperBustCircumference: {
      type: String
    },
    bustCircumference: {
      type: String
    },
    roundUnderBustCircumference: {
      type: String
    },
    waist: {
      type: String
    },
    bustDistance: {
      type: String
    },
    bustLength: {
      type: String
    },
    underBust: {
      type: String
    },
    halfLength: {
      type: String
    },
    hipLength: {
      type: String
    },
    kneeLength: {
      type: String
    },
    hip: {
      type: String
    },
    shortSleeve: {
      type: String
    },
    longSleeve: {
      type: String
    },
    bicep: {
      type: String
    },
    forearm: {
      type: String
    },
    wrist: {
      type: String
    },
    gownLength: {
      type: String
    }
  },
  measurementsWomenBottom: {
    hip: {
      type: String
    },
    waist: {
      type: String
    },
    thigh: {
      type: String
    },
    knee: {
      type: String
    },
    shortSkirtLength: {
      type: String
    },
    calf: {
      type: String
    },
    ankle: {
      type: String
    },
    inseam: {
      type: String
    },
    pantLength: {
      type: String
    }
  },
  controlMeasurementsMenTop: {
    neck: {
      type: String
    },
    shoulder: {
      type: String
    },
    chest: {
      type: String
    },
    stomach: {
      type: String
    },
    waist: {
      type: String
    },
    hip: {
      type: String
    },
    shortSleeve: {
      type: String
    },
    longSleeve: {
      type: String
    },
    forearm: {
      type: String
    },
    wrist: {
      type: String
    },
    bicep: {
      type: String
    },
    regularShirtLength: {
      type: String
    },
    senatorShirtLength: {
      type: String
    }
  },
  controlMeasurementsMenBottom: {
    hips: {
      type: String
    },
    thighOrLaps: {
      type: String
    },
    knee: {
      type: String
    },
    calf: {
      type: String
    },
    ankle: {
      type: String
    },
    inseam: {
      type: String
    },
    length: {
      type: String
    }
  },
  controlMeasurementsWomenTop: {
    neck: {
      type: String
    },
    shoulder: {
      type: String
    },
    roundShoulder: {
      type: String
    },
    upperBustCircumference: {
      type: String
    },
    bustCircumference: {
      type: String
    },
    roundUnderBustCircumference: {
      type: String
    },
    waist: {
      type: String
    },
    bustDistance: {
      type: String
    },
    bustLength: {
      type: String
    },
    underBust: {
      type: String
    },
    halfLength: {
      type: String
    },
    hipLength: {
      type: String
    },
    kneeLength: {
      type: String
    },
    hip: {
      type: String
    },
    shortSleeve: {
      type: String
    },
    longSleeve: {
      type: String
    },
    bicep: {
      type: String
    },
    forearm: {
      type: String
    },
    wrist: {
      type: String
    },
    gownLength: {
      type: String
    }
  },
  controlMeasurementsWomenBottom: {
    hip: {
      type: String
    },
    waist: {
      type: String
    },
    thigh: {
      type: String
    },
    knee: {
      type: String
    },
    shortSkirtLength: {
      type: String
    },
    calf: {
      type: String
    },
    ankle: {
      type: String
    },
    inseam: {
      type: String
    },
    pantLength: {
      type: String
    }
  },
  itemId: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  cancel: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
