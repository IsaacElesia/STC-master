const DBservices = {
	async AddArrayToDB(items = [], buildItem, DBcollection) {
		items.forEach(async (item) => {
			const itemFields = await buildItem(item);
			try {
				const newItem = new DBcollection(itemFields);
				await newItem.save();
			} catch (err) {
				console.log(err);
			}
		});
	},

	async AddToDB(buildItem, DBcollection) {
		try {
			const newItem = await new DBcollection(buildItem);
			await newItem.save();
		} catch (err) {
			console.log(err);
		}
	},

	async isDbNotEmpty(DBcollection) {
		try {
			const collection = await DBcollection.find();
			if (collection.length !== 0) return collection;
			return false;
		} catch (err) {
			console.log(err);
		}
	},

	async GetCollection(DBcollection) {
		try {
			return await DBcollection.find();
		} catch (err) {
			console.log(err);
		}
	},

	async GetItemById(DBcollection, id) {
		try {
			return await DBcollection.findById(id);
		} catch (err) {
			console.log(err);
		}
	},

	async GetItem(DBcollection, conditions = {}) {
		try {
			return await DBcollection.findOne(conditions);
		} catch (err) {
			console.log(err);
		}
	},

	async findAndUpdateOrCreate(DBcollection, update = {}, conditions = {}) {
		try {
			return await DBcollection.findOneAndUpdate(
				conditions,
				{ $set: { items: [{ handlers: update }] } },
				{ new: true, upsert: true }
			);
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = DBservices;
