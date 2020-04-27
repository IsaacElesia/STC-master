import React from 'react';

const Orders = () => {
	return (
		<section class='orders show-section scrollbar'>
			<h2 class='header-2'>Orders</h2>

			<div class='card'>
				<a href='#' class='card-order'>
					<div class='status runing-late'>
						<p>runing late</p>
					</div>
					<div class='card-details'>
						<dl>
							<dt>Cutomer</dt>
							<dd>Celabe Mckintouch</dd>
							<dt>Order id</dt>
							<dd>sdhu278902-8789367gh</dd>
							<dt>Date Orderd</dt>
							<dd>20th Spet, 2019</dd>
						</dl>
					</div>
				</a>
			</div>

			<div class='card'>
				<a href='#' class='card-order'>
					<div class='status past-due'>
						<p>Past due date</p>
					</div>
					<div class='card-details'>
						<dl>
							<dt>Cutomer</dt>
							<dd>Ikechukwu Eze</dd>
							<dt>Order id</dt>
							<dd>W$556-FGtuu677836</dd>
							<dt>Date Orderd</dt>
							<dd>20th Spet, 2019</dd>
						</dl>
					</div>
				</a>
			</div>

			<div class='card'>
				<a href='#' class='card-order'>
					<div class='status on-time'>
						<p>On time</p>
					</div>
					<div class='card-details'>
						<dl>
							<dt>Cutomer</dt>
							<dd>Lucy May</dd>
							<dt>Order id</dt>
							<dd>578fgyu9930-8789367gh</dd>
							<dt>Date Orderd</dt>
							<dd>20th Dec, 2019</dd>
						</dl>
					</div>
				</a>
			</div>

			<div class='card'>
				<a href='#' class='card-order'>
					<div class='status delivered'>
						<p>delivered</p>
					</div>
					<div class='card-details'>
						<dl>
							<dt>Cutomer</dt>
							<dd>Alee Jackson</dd>
							<dt>Order id</dt>
							<dd>sdhu278902-yt7890367</dd>
							<dt>Date Orderd</dt>
							<dd>20th Spet, 2019</dd>
						</dl>
					</div>
				</a>
			</div>
		</section>
	);
};

export default Orders;
