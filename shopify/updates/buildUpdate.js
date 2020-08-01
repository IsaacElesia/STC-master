const BuildUpdateTime = (updatedAt = {}) => {
	const { itemLastUpdate, orderLastUpdate } = updatedAt;
	const updateFeilds = {};

	if (itemLastUpdate) updateFeilds.itemLastUpdate = itemLastUpdate;
	if (orderLastUpdate) updateFeilds.orderLastUpdate = orderLastUpdate;

	return updateFeilds;
};

module.exports = BuildUpdateTime;
