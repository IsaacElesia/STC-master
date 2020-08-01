const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		shopifyOrderId: {
			type: String,
			index: true,
			unique: true,
		},
		orderNumber: {
			type: Number,
			required: true,
		},
		items: [
			{
				shopifyItemId: {
					type: String,
					required: true,
				},
				variantId: {
					type: String,
				},
				variantTitle: {
					type: String,
				},
				customProperties: [
					{
						name: {
							type: String,
						},
						value: {
							type: String,
						},
					},
				],
				controlProperties: [
					{
						name: {
							type: String,
						},
						value: {
							type: String,
						},
					},
				],
				handlers: [
					{
						handler: {
							type: mongoose.Schema.Types.ObjectId,
							ref: 'handler',
						},
						givenAt: {
							type: Date,
						},
						complatedAt: {
							type: Date,
						},
						cancel: {
							cancelleditem: {
								type: Boolean,
								default: false,
							},
							reason: {
								type: String,
							},
							at: {
								type: Date,
							},
						},
					},
				],
				cancelItem: {
					item: {
						type: Boolean,
						default: false,
					},
					reason: {
						type: String,
					},
					at: {
						type: Date,
					},
				},
				quantity: {
					type: Number,
				},
			},
		],
		customer: {
			id: {
				type: String,
			},
			name: {
				type: String,
			},
			email: {
				type: String,
			},
			phone: {
				type: String,
			},
		},
		shippingAddress: {
			name: {
				type: String,
			},
			address1: {
				type: String,
			},
			address2: {
				type: String,
			},
			city: {
				type: String,
			},
			company: {
				type: String,
			},
			zip: {
				type: String,
			},
			state: {
				type: String,
			},
			stateCode: {
				type: String,
			},
			country: {
				type: String,
			},
			phone: {
				type: String,
			},
		},
		cancel: {
			cancelledOrder: {
				type: Boolean,
				default: false,
			},
			reason: {
				type: String,
			},
			at: {
				type: Date,
			},
		},
		fulfillmentStatus: {
			type: String,
			default: null,
		},
		createdAt: {
			type: Date,
		},
	},
	{ toJSON: { virtuals: true } }
);

OrderSchema.virtual('itemConnect', {
	ref: 'item', // The model to use
	localField: 'items.shopifyItemId', // Find people where `localField`
	foreignField: 'shopifyItemId', // is equal to `foreignField`
	// If `justOne` is true, 'members' will be a single doc as opposed to
	// an array. `justOne` is false by default.
	justOne: false,
});

module.exports = mongoose.model('order', OrderSchema);
