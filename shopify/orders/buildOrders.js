const Oders = {
	BuildOrder(order) {
		const {
			id,
			order_number,
			line_items,
			customer,
			shipping_address,
			cancel_reason,
			cancelled_at,
			fulfillment_status,
			created_at,
		} = order;

		const orderFields = {};

		if (id) orderFields.shopifyOrderId = id;
		if (order_number) orderFields.orderNumber = order_number;
		if (fulfillment_status) orderFields.fulfillmentStatus = fulfillment_status;
		if (created_at) orderFields.createdAt = created_at;

		//Build items in an order
		if (line_items) {
			orderFields.items = line_items.map((line_item) =>
				Oders.BuildOrderedItem(line_item)
			);
		}

		//Build order cancel property
		orderFields.cancel = {};
		if (cancel_reason) orderFields.cancel.resean = cancel_reason;
		if (cancelled_at) orderFields.cancel.at = cancelled_at;

		//Build order customer property
		if (customer) {
			orderFields.customer = {};
			if (customer.id) orderFields.customer.id = customer.id;
			if (customer.name)
				orderFields.customer.name = ` ${customer.first_nam} ${customer.last_nam} `;
			if (customer.email) orderFields.customer.email = customer.email;
			if (customer.phone) orderFields.customer.phone = customer.phone;
		}

		//Build order shipping address
		if (shipping_address) {
			orderFields.shippingAddress = {};
			if (shipping_address.name)
				orderFields.shippingAddress.name = shipping_address.name;
			if (shipping_address.address1)
				orderFields.shippingAddress.address1 = shipping_address.address1;
			if (shipping_address.address2)
				orderFields.shippingAddress.address2 = shipping_address.address2;
			if (shipping_address.city)
				orderFields.shippingAddress.city = shipping_address.city;
			if (shipping_address.company)
				orderFields.shippingAddress.company = shipping_address.company;
			if (shipping_address.zip)
				orderFields.shippingAddress.zip = shipping_address.zip;
			if (shipping_address.province)
				orderFields.shippingAddress.state = shipping_address.province;
			if (shipping_address.province_code)
				orderFields.shippingAddress.stateCode = shipping_address.province_code;
			if (shipping_address.country)
				orderFields.shippingAddress.country = shipping_address.country;
			if (shipping_address.phone)
				orderFields.shippingAddress.phone = shipping_address.phone;
		}

		return orderFields;
	},

	BuildOrderedItem(item) {
		const {
			product_id,
			variant_id,
			variant_title,
			quantity,
			properties,
		} = item;

		const itemsFields = {};

		if (product_id) itemsFields.shopifyItemId = product_id;
		if (variant_id) itemsFields.variantId = variant_id;
		if (variant_title) itemsFields.variantTitle = variant_title;
		if (quantity) itemsFields.quantity = quantity;

		if (properties) {
			itemsFields.customProperties = properties.map((property) => {
				const propertyFields = {};
				propertyFields.name = property.name;
				propertyFields.value = property.value;
				return propertyFields;
			});
		}

		return itemsFields;
	},

	BuildOrderItemHandler(handlerInfo) {
		const {
			handler,
			givenAt,
			complatedAt,
			cancelleditem,
			reason,
			at,
		} = handlerInfo;

		const handlerFields = {};

		if (handler) handlerFields.handler = handler;
		if (givenAt) handlerFields.givenAt = givenAt;
		if (complatedAt) handlerFields.complatedAt = complatedAt;

		if (cancelleditem || reason || at) {
			handlerFields.cancel = {};
			if (cancelleditem) handlerFields.cancel.cancelleditem = cancelleditem;
			if (reason) handlerFields.cancel.reason = reason;
			if (at) handlerFields.cancel.at = at;
		}

		return handlerFields;
	},
};

module.exports = Oders;
