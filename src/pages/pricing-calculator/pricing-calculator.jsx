import './pricing-calculator.scss';
import { useState } from 'react';
import Header from '@/components/molecules/header/header';
import Body from '@/components/molecules/body/body';
import CardCollection from './card-collection/card-collection';
import Cover from './card-collection/cover/cover';

const PricingCalculator = ({
	download = false,
	setDownload = () => { }
}) => {
	const [priceEstimation, setPriceEstimation] = useState({
		annualHires: {
			totalYearlyHiringLimit: 200,
			profilesProcessedPerHire: 100,
			costPerProfile: 20
		},
		voiceCalling: {
			activeAddOn: true,
			totalCallDurationLimit: 7000,
			costPerMinute: 5
		},
		aiInterview: {
			activeAddOn: true,
			totalCallDurationLimit: 2000,
			costPerMinute: 14
		},
		sourcingOutreach: {
			activeAddOn: true,
			creditLimit: 1000,
			costPerCredit: 8
		},
		adsBasedSourcing: {
			activeAddOn: true,
			walletAmount: 20000
		},
		salesDiscount: {
			discountPercent: 10
		},
		companyName: "",
		timing: [
			{ label: `Annual Pricing`, value: false, coverLabel: `Annual`, divideBy: 1, perLabel: `annual` },
			{ label: `Half Yearly`, value: false, coverLabel: `Semi-Annual`, divideBy: 2, perLabel: `half-yearly` },
			{ label: `Quarterly`, value: false, coverLabel: `Quarterly`, divideBy: 4, perLabel: `quarter` },
			{ label: `Monthly`, value: false, coverLabel: `Monthly`, divideBy: 12, perLabel: `month` },
		],
	});

	return (
		<>
			{
				download
					? (
						<Cover
							estimation={priceEstimation}
							download={download}
						/>
					) : (
						<div className={`pricing-calculator-wrapper`}>
							<Header />

							<Body>
								<CardCollection
									estimation={priceEstimation}
									setEstimation={setPriceEstimation}
									setDownload={setDownload}
								/>
							</Body>
						</div>
					)
			}
		</>
	);
};

export default PricingCalculator;