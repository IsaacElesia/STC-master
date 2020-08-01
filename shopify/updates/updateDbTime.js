const moment = require('moment');
const DBservices = require('../../services/DBservices');
const UpdatedAt = require('../../models/UpdatedAt');
const BuildUpdateTime = require('../updates/buildUpdate');

const UpdateDbTime = async (timeLastUpdate) => {
	const time = { [timeLastUpdate]: moment().format('YYYY-MM-DDTHH:mm:ssZ') };
	try {
		const dbTime = await DBservices.isDbNotEmpty(UpdatedAt);

		dbTime
			? await DBservices.findAndUpdateOrCreate(
					UpdatedAt,
					BuildUpdateTime(time),
					{ _id: dbTime[0]['_id'] }
			  )
			: await DBservices.AddToDB(BuildUpdateTime(time), UpdatedAt);
	} catch (err) {
		console.log(err);
	}
};

module.exports = UpdateDbTime;
