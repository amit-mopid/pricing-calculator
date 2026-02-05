import "./sales-discount.scss";
import Card from '@/components/templates/cards/card';
import DurationSlider from '@/components/atoms/duration-slider/duration-slider';

const SalesDiscount = ({
	estimation = {},
	setEstimation = () => { }
}) => {
	const handleSalesDiscount = (durationValue) => {
		setEstimation(
			(prevState) => ({
				...prevState,
				['salesDiscount']: {
					...prevState['salesDiscount'],
					discountPercent: durationValue
				}
			})
		);
	};

	return (
		<Card>
			<div className={`sales-discount-wrapper`}>
				<div className={`sales-discount-wrapper__label-container`}>
					<div className={`left-section`}>
						<div className={`label-1`}>Sales Discount (%)</div>

						<div className={`label-2`}>Applies after all tier discounts</div>
					</div>

					<div className={`right-section`}>
						<input
							className="right-section__input"
							type="number"
							min={0}
							max={99}
							value={estimation.salesDiscount.discountPercent}
							onChange={(e) => {
								const value = e.target.value;

								// allow empty input while typing
								if (value === '') {
									setEstimation((prev) => ({
										...prev,
										salesDiscount: {
											...prev.salesDiscount,
											discountPercent: ''
										}
									}));
									return;
								}

								const num = Number(value);

								// block values outside 0–30
								if (num < 0 || num > 99) return;

								setEstimation((prev) => ({
									...prev,
									salesDiscount: {
										...prev.salesDiscount,
										discountPercent: num
									}
								}));
							}}
						/>

						%
					</div>
				</div>

				<DurationSlider
					durationRange={[
						{ label: '0', value: 0 },
						{ label: '5', value: 5 },
						{ label: '10', value: 10 },
						{ label: '15', value: 15 },
						{ label: '20', value: 20 },
						{ label: '25', value: 25 },
						{ label: '30', value: 30 }
					]}
					onChange={handleSalesDiscount}
				/>
			</div>
		</Card>
	);
};

export default SalesDiscount;