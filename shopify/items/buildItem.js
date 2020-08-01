const Items = {
	BuildItem(item) {
		const {
			id,
			images,
			options,
			product_type,
			title,
			created_at,
			updated_at,
			variants,
		} = item;
		const itemFields = {};

		if (id) itemFields.shopifyItemId = id;
		if (product_type) itemFields.category = product_type;
		if (title) itemFields.name = title;
		if (created_at) itemFields.createdAt = created_at;
		if (updated_at) itemFields.updatedAt = updated_at;

		//Build item images
		if (images) {
			itemFields.images = images.map((image) => Items.BuildImage(image));
		}

		//Buid item options
		if (options) {
			itemFields.options = options.map((option) => {
				const optionFeilds = {};
				optionFeilds.name = option.name;
				return optionFeilds;
			});
		}

		//Buid item variants
		if (variants) {
			itemFields.variants = variants.map((variant) =>
				Items.BuildVariants(variant)
			);
		}

		return itemFields;
	},

	BuildImage(image) {
		const {
			id,
			product_id,
			position,
			created_at,
			updated_at,
			width,
			height,
			src,
		} = image;
		const imageFields = {};

		if (id) imageFields.id = id;
		if (product_id) imageFields.itemId = product_id;
		if (position) imageFields.position = position;
		if (created_at) imageFields.createdAt = created_at;
		if (updated_at) imageFields.updatedAt = updated_at;
		if (width) imageFields.width = width;
		if (height) imageFields.height = height;
		if (src) imageFields.src = src;

		return imageFields;
	},

	BuildVariants(variants) {
		const {
			id,
			product_id,
			title,
			created_at,
			updated_at,
			position,
		} = variants;
		const variantFeilds = {};

		if (id) variantFeilds.id = id;
		if (product_id) variantFeilds.itemId = product_id;
		if (title) variantFeilds.name = title;
		if (created_at) variantFeilds.createdAt = created_at;
		if (updated_at) variantFeilds.updatedAt = updated_at;
		if (position) variantFeilds.position = position;

		return variantFeilds;
	},
};

module.exports = Items;
