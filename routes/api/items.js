const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Item = require('../../models/Item');

// @route    POST api/item
// @desc     create item
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('category', 'Category is required')
        .not()
        .isEmpty(),
      check('style', 'Style is required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      cancel,
      category,
      style,
      description,
      quantity,
      roundShoulder,
      upperBustCircumference,
      bustCircumference,
      roundUnderBustCircumference,
      bustDistance,
      bustLength,
      underBust,
      halfLength,
      hipLength,
      kneeLength,
      wrist,
      gownLength,
      hip,
      waist,
      thigh,
      knee,
      shortSkirtLength,
      pantLength,
      neck,
      shoulder,
      chest,
      stomach,
      shortSleeve,
      longSleeve,
      forearm,
      bicep,
      regularShirtLength,
      senatorShirtLength,
      thighOrLaps,
      calf,
      ankle,
      inseam,
      length
    } = req.body;

    // Build item object
    const itemFields = {};
    itemFields.handlers = req.handler.id;
    if (category) itemFields.category = category;
    if (cancel) itemFields.cancel = cancel;
    if (style) itemFields.style = style;
    if (quantity) itemFields.quantity = quantity;
    if (description) itemFields.description = description;

    // Build handlers object
    itemFields.handlers = [];
    const newHandler = {
      handler: req.handler.id
    };
    itemFields.handlers.unshift(newHandler);

    // Build Measurements object

    if (category === 'menTop') {
      itemFields.measurementsMenTop = {};

      if (neck) itemFields.measurementsMenTop.neck = neck;
      if (shoulder) itemFields.measurementsMenTop.shoulder = shoulder;
      if (chest) itemFields.measurementsMenTop.chest = chest;
      if (stomach) itemFields.measurementsMenTop.stomach = stomach;
      if (waist) itemFields.measurementsMenTop.waist = waist;
      if (hip) itemFields.measurementsMenTop.hip = hip;
      if (shortSleeve) itemFields.measurementsMenTop.shortSleeve = shortSleeve;
      if (longSleeve) itemFields.measurementsMenTop.longSleeve = longSleeve;
      if (forearm) itemFields.measurementsMenTop.forearm = forearm;
      if (wrist) itemFields.measurementsMenTop.wrist = wrist;
      if (bicep) itemFields.measurementsMenTop.bicep = bicep;
      if (regularShirtLength)
        itemFields.measurementsMenTop.regularShirtLength = regularShirtLength;
      if (senatorShirtLength)
        itemFields.measurementsMenTop.senatorShirtLength = senatorShirtLength;
    } else if (category === 'menBottom') {
      itemFields.measurementsMenBottom = {};

      if (hip) itemFields.measurementsMenBottom.hip = hip;
      if (thighOrLaps)
        itemFields.measurementsMenBottom.thighOrLaps = thighOrLaps;
      if (knee) itemFields.measurementsMenBottom.knee = knee;
      if (calf) itemFields.measurementsMenBottom.calf = calf;
      if (ankle) itemFields.measurementsMenBottom.ankle = ankle;
      if (inseam) itemFields.measurementsMenBottom.inseam = inseam;
      if (length) itemFields.measurementsMenBottom.length = length;
    } else if (category === 'womenTop') {
      itemFields.measurementsWomenTop = {};

      if (neck) itemFields.measurementsWomenTop.neck = neck;
      if (shoulder) itemFields.measurementsWomenTop.shoulder = shoulder;
      if (roundShoulder)
        itemFields.measurementsWomenTop.roundShoulder = roundShoulder;
      if (upperBustCircumference)
        itemFields.measurementsWomenTop.upperBustCircumference = upperBustCircumference;
      if (bustCircumference)
        itemFields.measurementsWomenTop.bustCircumference = bustCircumference;
      if (roundUnderBustCircumference)
        itemFields.measurementsWomenTop.roundUnderBustCircumference = roundUnderBustCircumference;
      if (waist) itemFields.measurementsWomenTop.waist = waist;
      if (bustDistance)
        itemFields.measurementsWomenTop.bustDistance = bustDistance;
      if (bustLength) itemFields.measurementsWomenTop.bustLength = bustLength;
      if (underBust) itemFields.measurementsWomenTop.underBust = underBust;
      if (halfLength) itemFields.measurementsWomenTop.halfLength = halfLength;
      if (hipLength) itemFields.measurementsWomenTop.hipLength = hipLength;
      if (kneeLength) itemFields.measurementsWomenTop.kneeLength = kneeLength;
      if (hip) itemFields.measurementsWomenTop.hip = hip;
      if (shortSleeve)
        itemFields.measurementsWomenTop.shortSleeve = shortSleeve;
      if (longSleeve) itemFields.measurementsWomenTop.longSleeve = longSleeve;
      if (bicep) itemFields.measurementsWomenTop.bicep = bicep;
      if (forearm) itemFields.measurementsWomenTop.forearm = forearm;
      if (wrist) itemFields.measurementsWomenTop.wrist = wrist;
      if (gownLength) itemFields.measurementsWomenTop.gownLength = gownLength;
    } else if (category === 'womenBottom') {
      itemFields.measurementsWomenBottom = {};

      if (hip) itemFields.measurementsWomenBottom.hip = hip;
      if (waist) itemFields.measurementsWomenBottom.waist = waist;
      if (thigh) itemFields.measurementsWomenBottom.thigh = thigh;
      if (knee) itemFields.measurementsWomenBottom.knee = knee;
      if (shortSkirtLength)
        itemFields.measurementsWomenBottom.shortSkirtLength = shortSkirtLength;
      if (calf) itemFields.measurementsWomenBottom.calf = calf;
      if (ankle) itemFields.measurementsWomenBottom.ankle = ankle;
      if (inseam) itemFields.measurementsWomenBottom.inseam = inseam;
      if (pantLength)
        itemFields.measurementsWomenBottom.pantLength = pantLength;
    } else if (category === 'controlMenTop') {
      itemFields.controlMeasurementsMenTop = {};

      if (neck) itemFields.controlMeasurementsMenTop.neck = neck;
      if (shoulder) itemFields.controlMeasurementsMenTop.shoulder = shoulder;
      if (chest) itemFields.controlMeasurementsMenTop.chest = chest;
      if (stomach) itemFields.controlMeasurementsMenTop.stomach = stomach;
      if (waist) itemFields.controlMeasurementsMenTop.waist = waist;
      if (hip) itemFields.controlMeasurementsMenTop.hip = hip;
      if (shortSleeve)
        itemFields.controlMeasurementsMenTop.shortSleeve = shortSleeve;
      if (longSleeve)
        itemFields.controlMeasurementsMenTop.longSleeve = longSleeve;
      if (forearm) itemFields.controlMeasurementsMenTop.forearm = forearm;
      if (wrist) itemFields.controlMeasurementsMenTop.wrist = wrist;
      if (bicep) itemFields.controlMeasurementsMenTop.bicep = bicep;
      if (regularShirtLength)
        itemFields.controlMeasurementsMenTop.regularShirtLength = regularShirtLength;
      if (senatorShirtLength)
        itemFields.controlMeasurementsMenTop.senatorShirtLength = senatorShirtLength;
    } else if (category === 'controlMenBottom') {
      itemFields.controlMeasurementsMenBottom = {};

      if (hip) itemFields.controlMeasurementsMenBottom.hip = hip;
      if (thighOrLaps)
        itemFields.controlMeasurementsMenBottom.thighOrLaps = thighOrLaps;
      if (knee) itemFields.controlMeasurementsMenBottom.knee = knee;
      if (calf) itemFields.controlMeasurementsMenBottom.calf = calf;
      if (ankle) itemFields.controlMeasurementsMenBottom.ankle = ankle;
      if (inseam) itemFields.controlMeasurementsMenBottom.inseam = inseam;
      if (length) itemFields.controlMeasurementsMenBottom.length = length;
    } else if (category === 'controlWomenTop') {
      itemFields.controlMeasurementsWomenTop = {};

      if (neck) itemFields.controlMeasurementsWomenTop.neck = neck;
      if (shoulder) itemFields.controlMeasurementsWomenTop.shoulder = shoulder;
      if (roundShoulder)
        itemFields.controlMeasurementsWomenTop.roundShoulder = roundShoulder;
      if (upperBustCircumference)
        itemFields.controlMeasurementsWomenTop.upperBustCircumference = upperBustCircumference;
      if (roundUnderBustCircumference)
        itemFields.controlMeasurementsWomenTop.roundUnderBustCircumference = roundUnderBustCircumference;
      if (waist) itemFields.controlMeasurementsWomenTop.waist = waist;
      if (bustDistance)
        itemFields.controlMeasurementsWomenTop.bustDistance = bustDistance;
      if (bustLength)
        itemFields.controlMeasurementsWomenTop.bustLength = bustLength;
      if (underBust)
        itemFields.controlMeasurementsWomenTop.underBust = underBust;
      if (halfLength)
        itemFields.controlMeasurementsWomenTop.halfLength = halfLength;
      if (hipLength)
        itemFields.controlMeasurementsWomenTop.hipLength = hipLength;
      if (kneeLength)
        itemFields.controlMeasurementsWomenTop.kneeLength = kneeLength;
      if (hip) itemFields.controlMeasurementsWomenTop.hip = hip;
      if (shortSleeve)
        itemFields.controlMeasurementsWomenTop.shortSleeve = shortSleeve;
      if (longSleeve)
        itemFields.controlMeasurementsWomenTop.longSleeve = longSleeve;
      if (bicep) itemFields.controlMeasurementsWomenTop.bicep = bicep;
      if (forearm) itemFields.controlMeasurementsWomenTop.forearm = forearm;
      if (wrist) itemFields.controlMeasurementsWomenTop.wrist = wrist;
      if (gownLength)
        itemFields.controlMeasurementsWomenTop.gownLength = gownLength;
    } else if (category === 'controlWomenBottom') {
      itemFields.controlMeasurementsWomenBottom = {};

      if (hip) itemFields.controlMeasurementsWomenBottom.hip = hip;
      if (waist) itemFields.controlMeasurementsWomenBottom.waist = waist;
      if (thigh) itemFields.controlMeasurementsWomenBottom.thigh = thigh;
      if (knee) itemFields.controlMeasurementsWomenBottom.knee = knee;
      if (shortSkirtLength)
        itemFields.controlMeasurementsWomenBottom.shortSkirtLength = shortSkirtLength;
      if (calf) itemFields.controlMeasurementsWomenBottom.calf = calf;
      if (ankle) itemFields.controlMeasurementsWomenBottom.ankle = ankle;
      if (inseam) itemFields.controlMeasurementsWomenBottom.inseam = inseam;
      if (pantLength)
        itemFields.controlMeasurementsWomenBottom.pantLength = pantLength;
    }

    try {
      // Create
      let item = new Item(itemFields);

      await item.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/item/item_id
// @desc     update item
// @access   Private
router.put(
  '/:item_id',
  [
    auth,
    [
      check('category', 'Category is required')
        .not()
        .isEmpty(),
      check('style', 'Style is required')
        .not()
        .isEmpty(),
      check('quantity', 'Quantity is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      cancel,
      category,
      style,
      description,
      quantity,
      roundShoulder,
      upperBustCircumference,
      bustCircumference,
      roundUnderBustCircumference,
      bustDistance,
      bustLength,
      underBust,
      halfLength,
      hipLength,
      kneeLength,
      wrist,
      gownLength,
      hip,
      waist,
      thigh,
      knee,
      shortSkirtLength,
      pantLength,
      neck,
      shoulder,
      chest,
      stomach,
      shortSleeve,
      longSleeve,
      forearm,
      bicep,
      regularShirtLength,
      senatorShirtLength,
      thighOrLaps,
      calf,
      ankle,
      inseam,
      length
    } = req.body;
    const itemId = req.params.item_id;

    // Build item object
    const itemFields = {};
    if (cancel) itemFields.cancel = cancel;
    if (category) itemFields.category = category;
    if (style) itemFields.style = style;
    if (quantity) itemFields.quantity = quantity;
    if (description) itemFields.description = description;

    // Build Measurements object
    if (category === 'menTop') {
      itemFields.measurementsMenTop = {};

      if (neck) itemFields.measurementsMenTop.neck = neck;
      if (shoulder) itemFields.measurementsMenTop.shoulder = shoulder;
      if (chest) itemFields.measurementsMenTop.chest = chest;
      if (stomach) itemFields.measurementsMenTop.stomach = stomach;
      if (waist) itemFields.measurementsMenTop.waist = waist;
      if (hip) itemFields.measurementsMenTop.hip = hip;
      if (shortSleeve) itemFields.measurementsMenTop.shortSleeve = shortSleeve;
      if (longSleeve) itemFields.measurementsMenTop.longSleeve = longSleeve;
      if (forearm) itemFields.measurementsMenTop.forearm = forearm;
      if (wrist) itemFields.measurementsMenTop.wrist = wrist;
      if (bicep) itemFields.measurementsMenTop.bicep = bicep;
      if (regularShirtLength)
        itemFields.measurementsMenTop.regularShirtLength = regularShirtLength;
      if (senatorShirtLength)
        itemFields.measurementsMenTop.senatorShirtLength = senatorShirtLength;
    } else if (category === 'menBottom') {
      itemFields.measurementsMenBottom = {};

      if (hip) itemFields.measurementsMenBottom.hip = hip;
      if (thighOrLaps)
        itemFields.measurementsMenBottom.thighOrLaps = thighOrLaps;
      if (knee) itemFields.measurementsMenBottom.knee = knee;
      if (calf) itemFields.measurementsMenBottom.calf = calf;
      if (ankle) itemFields.measurementsMenBottom.ankle = ankle;
      if (inseam) itemFields.measurementsMenBottom.inseam = inseam;
      if (length) itemFields.measurementsMenBottom.length = length;
    } else if (category === 'womenTop') {
      itemFields.measurementsWomenTop = {};

      if (neck) itemFields.measurementsWomenTop.neck = neck;
      if (shoulder) itemFields.measurementsWomenTop.shoulder = shoulder;
      if (roundShoulder)
        itemFields.measurementsWomenTop.roundShoulder = roundShoulder;
      if (upperBustCircumference)
        itemFields.measurementsWomenTop.upperBustCircumference = upperBustCircumference;
      if (bustCircumference)
        itemFields.measurementsWomenTop.bustCircumference = bustCircumference;
      if (roundUnderBustCircumference)
        itemFields.measurementsWomenTop.roundUnderBustCircumference = roundUnderBustCircumference;
      if (waist) itemFields.measurementsWomenTop.waist = waist;
      if (bustDistance)
        itemFields.measurementsWomenTop.bustDistance = bustDistance;
      if (bustLength) itemFields.measurementsWomenTop.bustLength = bustLength;
      if (underBust) itemFields.measurementsWomenTop.underBust = underBust;
      if (halfLength) itemFields.measurementsWomenTop.halfLength = halfLength;
      if (hipLength) itemFields.measurementsWomenTop.hipLength = hipLength;
      if (kneeLength) itemFields.measurementsWomenTop.kneeLength = kneeLength;
      if (hip) itemFields.measurementsWomenTop.hip = hip;
      if (shortSleeve)
        itemFields.measurementsWomenTop.shortSleeve = shortSleeve;
      if (longSleeve) itemFields.measurementsWomenTop.longSleeve = longSleeve;
      if (bicep) itemFields.measurementsWomenTop.bicep = bicep;
      if (forearm) itemFields.measurementsWomenTop.forearm = forearm;
      if (wrist) itemFields.measurementsWomenTop.wrist = wrist;
      if (gownLength) itemFields.measurementsWomenTop.gownLength = gownLength;
    } else if (category === 'womenBottom') {
      itemFields.measurementsWomenBottom = {};

      if (hip) itemFields.measurementsWomenBottom.hip = hip;
      if (waist) itemFields.measurementsWomenBottom.waist = waist;
      if (thigh) itemFields.measurementsWomenBottom.thigh = thigh;
      if (knee) itemFields.measurementsWomenBottom.knee = knee;
      if (shortSkirtLength)
        itemFields.measurementsWomenBottom.shortSkirtLength = shortSkirtLength;
      if (calf) itemFields.measurementsWomenBottom.calf = calf;
      if (ankle) itemFields.measurementsWomenBottom.ankle = ankle;
      if (inseam) itemFields.measurementsWomenBottom.inseam = inseam;
      if (pantLength)
        itemFields.measurementsWomenBottom.pantLength = pantLength;
    } else if (category === 'controlMenTop') {
      itemFields.controlMeasurementsMenTop = {};

      if (neck) itemFields.controlMeasurementsMenTop.neck = neck;
      if (shoulder) itemFields.controlMeasurementsMenTop.shoulder = shoulder;
      if (chest) itemFields.controlMeasurementsMenTop.chest = chest;
      if (stomach) itemFields.controlMeasurementsMenTop.stomach = stomach;
      if (waist) itemFields.controlMeasurementsMenTop.waist = waist;
      if (hip) itemFields.controlMeasurementsMenTop.hip = hip;
      if (shortSleeve)
        itemFields.controlMeasurementsMenTop.shortSleeve = shortSleeve;
      if (longSleeve)
        itemFields.controlMeasurementsMenTop.longSleeve = longSleeve;
      if (forearm) itemFields.controlMeasurementsMenTop.forearm = forearm;
      if (wrist) itemFields.controlMeasurementsMenTop.wrist = wrist;
      if (bicep) itemFields.controlMeasurementsMenTop.bicep = bicep;
      if (regularShirtLength)
        itemFields.controlMeasurementsMenTop.regularShirtLength = regularShirtLength;
      if (senatorShirtLength)
        itemFields.controlMeasurementsMenTop.senatorShirtLength = senatorShirtLength;
    } else if (category === 'controlMenBottom') {
      itemFields.controlMeasurementsMenBottom = {};

      if (hip) itemFields.controlMeasurementsMenBottom.hip = hip;
      if (thighOrLaps)
        itemFields.controlMeasurementsMenBottom.thighOrLaps = thighOrLaps;
      if (knee) itemFields.controlMeasurementsMenBottom.knee = knee;
      if (calf) itemFields.controlMeasurementsMenBottom.calf = calf;
      if (ankle) itemFields.controlMeasurementsMenBottom.ankle = ankle;
      if (inseam) itemFields.controlMeasurementsMenBottom.inseam = inseam;
      if (length) itemFields.controlMeasurementsMenBottom.length = length;
    } else if (category === 'controlWomenTop') {
      itemFields.controlMeasurementsWomenTop = {};

      if (neck) itemFields.controlMeasurementsWomenTop.neck = neck;
      if (shoulder) itemFields.controlMeasurementsWomenTop.shoulder = shoulder;
      if (roundShoulder)
        itemFields.controlMeasurementsWomenTop.roundShoulder = roundShoulder;
      if (upperBustCircumference)
        itemFields.controlMeasurementsWomenTop.upperBustCircumference = upperBustCircumference;
      if (roundUnderBustCircumference)
        itemFields.controlMeasurementsWomenTop.roundUnderBustCircumference = roundUnderBustCircumference;
      if (waist) itemFields.controlMeasurementsWomenTop.waist = waist;
      if (bustDistance)
        itemFields.controlMeasurementsWomenTop.bustDistance = bustDistance;
      if (bustLength)
        itemFields.controlMeasurementsWomenTop.bustLength = bustLength;
      if (underBust)
        itemFields.controlMeasurementsWomenTop.underBust = underBust;
      if (halfLength)
        itemFields.controlMeasurementsWomenTop.halfLength = halfLength;
      if (hipLength)
        itemFields.controlMeasurementsWomenTop.hipLength = hipLength;
      if (kneeLength)
        itemFields.controlMeasurementsWomenTop.kneeLength = kneeLength;
      if (hip) itemFields.controlMeasurementsWomenTop.hip = hip;
      if (shortSleeve)
        itemFields.controlMeasurementsWomenTop.shortSleeve = shortSleeve;
      if (longSleeve)
        itemFields.controlMeasurementsWomenTop.longSleeve = longSleeve;
      if (bicep) itemFields.controlMeasurementsWomenTop.bicep = bicep;
      if (forearm) itemFields.controlMeasurementsWomenTop.forearm = forearm;
      if (wrist) itemFields.controlMeasurementsWomenTop.wrist = wrist;
      if (gownLength)
        itemFields.controlMeasurementsWomenTop.gownLength = gownLength;
    } else if (category === 'controlWomenBottom') {
      itemFields.controlMeasurementsWomenBottom = {};

      if (hip) itemFields.controlMeasurementsWomenBottom.hip = hip;
      if (waist) itemFields.controlMeasurementsWomenBottom.waist = waist;
      if (thigh) itemFields.controlMeasurementsWomenBottom.thigh = thigh;
      if (knee) itemFields.controlMeasurementsWomenBottom.knee = knee;
      if (shortSkirtLength)
        itemFields.controlMeasurementsWomenBottom.shortSkirtLength = shortSkirtLength;
      if (calf) itemFields.controlMeasurementsWomenBottom.calf = calf;
      if (ankle) itemFields.controlMeasurementsWomenBottom.ankle = ankle;
      if (inseam) itemFields.controlMeasurementsWomenBottom.inseam = inseam;
      if (pantLength)
        itemFields.controlMeasurementsWomenBottom.pantLength = pantLength;
    }

    try {
      //See if item exist
      let item = await Item.findOne({ _id: itemId });

      if (!item) return res.status(400).json({ msg: 'Item not found' });

      if (item) {
        // Update
        item = await Item.findOneAndUpdate(
          { _id: itemId },
          { $set: itemFields },
          { new: true }
        );
        // Build handlers object
        const newHandler = {
          handler: req.handler.id
        };
        item.handlers.unshift(newHandler);
        await item.save();
        return res.json(item);
      }
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Item not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/item
// @desc     Get all items
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find().populate('handlers.handler', [
      'name',
      'email',
      'phone',
      'address'
    ]);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/item/:item_id
// @desc     Get profile by item ID
// @access   Private
router.get('/:item_id', auth, async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.item_id
    }).populate('handlers.handler', ['name', 'email', 'phone', 'address']);

    if (!item) return res.status(400).json({ msg: 'Item not found' });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/item/:item_id
// @desc     Delete item & posts by id
// @access   Private
router.delete('/:item_id', auth, async (req, res) => {
  try {
    // Remove posts related to item
    await Post.deleteMany({ item: req.params.item_id });

    // Remove item
    await Item.findOneAndRemove({ _id: req.params.item_id });

    res.json({ msg: 'Item deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
