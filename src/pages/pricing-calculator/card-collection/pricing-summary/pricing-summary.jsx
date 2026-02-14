import './pricing-summary.scss';
import { multiplication } from '@/utils/functions';

const SummaryCard = ({
	label = '',
	summaryLabel = ``,
	value = 0
}) => {
	return (
		<div className={`summary`}>
			<div className={`left-section`}>
				<div className={`label`}>{label}</div>

				<div className={`value-label`}>{summaryLabel}</div>
			</div>

			<div className={`right-section`}>
				₹{Math.round(value).toLocaleString('en-IN')}
			</div>
		</div>
	)
};

const PricingSummary = ({
	estimation = {}
}) => {

	const pricingCalculationSummary = (returnType, data) => {
		let totalCost = 0;

		// 1. Mandatory annual hires cost
		const annualCost = data.annualHires.totalYearlyHiringLimit * data.annualHires.profilesProcessedPerHire * data.annualHires.costPerProfile;

		totalCost += annualCost;

		// 2. Optional add-ons
		if (data.voiceCalling?.activeAddOn) {
			totalCost += data.voiceCalling.totalCallDurationLimit * data.voiceCalling.costPerMinute;
		}

		if (data.aiInterview?.activeAddOn) {
			totalCost += data.aiInterview.totalCallDurationLimit * data.aiInterview.costPerMinute;
		}

		if (data.sourcingOutreach?.activeAddOn) {
			totalCost += data.sourcingOutreach.creditLimit * data.sourcingOutreach.costPerCredit;
		}

		if (data.adsBasedSourcing?.activeAddOn) {
			totalCost += data.adsBasedSourcing.walletAmount;
		}

		// 3. Discount calculation
		const discountPercent = data.salesDiscount.discountPercent || 0;
		const discountAmount = (totalCost * discountPercent) / 100;

		return returnType === 'DISCOUNT'
			? discountAmount
			: Math.round(totalCost - discountAmount).toLocaleString('en-IN');

		// Math.round().toLocaleString('en-IN');

	};

	return (
		<div className={`pricing-summary-wrapper`}>
			<div className={`pricing-summary-wrapper__label-container`}>
				<div className={`pricing-summary-wrapper__label-container__label`}>Pricing Summary</div>

				<div className={`pricing-summary-wrapper__label-container__value`}>{estimation.annualHires.totalYearlyHiringLimit} hires/year</div>
			</div>

			<div className={`pricing-summary-wrapper__pricing-cards`}>
				<SummaryCard
					label={`Base Plan`}
					summaryLabel={`₹${Boolean(estimation.annualHires.costPerProfile) ? estimation.annualHires.costPerProfile : 0}/Profile × ${multiplication(estimation.annualHires.profilesProcessedPerHire, estimation.annualHires.totalYearlyHiringLimit)} Profiles`}
					value={
						(Boolean(estimation.annualHires.costPerProfile) ? estimation.annualHires.costPerProfile : 0) * estimation.annualHires.profilesProcessedPerHire * estimation.annualHires.totalYearlyHiringLimit
					}
				/>

				{
					estimation.voiceCalling.activeAddOn
						? (
							<SummaryCard
								label={`Voice Calling`}
								summaryLabel={`₹${Boolean(estimation.voiceCalling.costPerMinute) ? estimation.voiceCalling.costPerMinute : 0}/min × ${Math.round(estimation.voiceCalling.totalCallDurationLimit)} mins`}
								value={multiplication(estimation.voiceCalling.costPerMinute, estimation.voiceCalling.totalCallDurationLimit)}
							/>
						) : (<></>)
				}

				{
					estimation.aiInterview.activeAddOn
						? (
							<SummaryCard
								label={`AI Interview`}
								summaryLabel={`₹${Boolean(estimation.aiInterview.costPerMinute) ? estimation.aiInterview.costPerMinute : 0}/min × ${estimation.aiInterview.totalCallDurationLimit} mins`}
								value={multiplication(estimation.aiInterview.costPerMinute, estimation.aiInterview.totalCallDurationLimit)}
							/>
						) : (<></>)
				}

				{
					estimation.sourcingOutreach.activeAddOn
						? (
							<SummaryCard
								label={`Sourcing Outreach`}
								summaryLabel={`₹${Boolean(estimation.sourcingOutreach.costPerCredit) ? estimation.sourcingOutreach.costPerCredit : 0}/min × ${estimation.sourcingOutreach.creditLimit} mins`}
								value={multiplication(estimation.sourcingOutreach.creditLimit, estimation.sourcingOutreach.costPerCredit)}
							/>
						) : (<></>)
				}

				{
					estimation.adsBasedSourcing.activeAddOn
						? (
							<SummaryCard
								label={`Ads-Based Sourcing`}
								summaryLabel={``}
								value={estimation.adsBasedSourcing.walletAmount}
							/>
						) : (<></>)
				}

				<SummaryCard
					label={`Custom Discount`}
					summaryLabel={`Applies after all tier discounts`}
					value={pricingCalculationSummary('DISCOUNT', estimation)}
				/>
			</div>

			<div className={`pricing-summary-wrapper__total-container`}>
				<div className={`pricing-summary-wrapper__total-container__label`}>TOTAL</div>

				<div className={`pricing-summary-wrapper__total-container__label`}>₹{pricingCalculationSummary('', estimation)}</div>
			</div>
		</div>
	);
};

export default PricingSummary;