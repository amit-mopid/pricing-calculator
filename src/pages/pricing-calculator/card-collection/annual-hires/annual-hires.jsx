import './annual-hires.scss';
import Card from '@/components/templates/cards/card';
import DurationSlider from '@/components/atoms/duration-slider/duration-slider';
import { multiplication } from '@/utils/functions';

const AnnualHires = ({
	estimation = {},
	setEstimation = () => { }
}) => {

	const handleTotalYearlyHiringLimitUsingDurationSlider = (durationValue) => {
		setEstimation(
			(prevState) => ({
				...prevState,
				['annualHires']: {
					...prevState['annualHires'],
					totalYearlyHiringLimit: durationValue
				},
				['voiceCalling']: {
					...prevState['voiceCalling'],
					totalCallDurationLimit: multiplication(
						multiplication(
							durationValue,
							prevState['annualHires']['profilesProcessedPerHire']
						), 0.35
					)
				},
				['aiInterview']: {
					...prevState['aiInterview'],
					totalCallDurationLimit: multiplication(
						multiplication(
							durationValue,
							prevState['annualHires']['profilesProcessedPerHire']
						), 0.1
					)
				}
			})
		);
	};

	return (
		<Card cardName={`Annual Hires`}>
			<div className={`body-container`}>
				<div className={`body-container__top-section`}>
					<div className={`body-container__top-section__label`}>Total yealrly hiring limit</div>

					<div className={`body-container__top-section__value-container`}>
						<DurationSlider
							durationRange={[
								{ label: '0', value: 0 },
								{ label: '100', value: 100 },
								{ label: '200', value: 200 },
								{ label: '300', value: 300 },
								{ label: '400', value: 400 },
								{ label: '500', value: 500 },
								{ label: '600', value: 600 },
								{ label: '700', value: 700 },
								{ label: '800', value: 800 },
								{ label: '900', value: 900 },
								{ label: '1000', value: 1000 },
								{ label: '1000+', value: 1001 },
							]}
							onChange={handleTotalYearlyHiringLimitUsingDurationSlider}
						/>

						<input
							className={`duration-input`}
							type='number'
							min={0}
							value={estimation.annualHires.totalYearlyHiringLimit}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['annualHires']: {
												...prevState['annualHires'],
												totalYearlyHiringLimit: e.target.value,
											},
											['voiceCalling']: {
												...prevState['voiceCalling'],
												totalCallDurationLimit: multiplication(
													multiplication(
													   e.target.value,
													   prevState['annualHires']['profilesProcessedPerHire']
												   ), 0.35
												)
											},
											['aiInterview'] : {
												...prevState['aiInterview'],
												totalCallDurationLimit: multiplication(
													multiplication(
														e.target.value,
														prevState['annualHires']['profilesProcessedPerHire']
													), 0.1
												)
											}
										})
									);
								}
							}
						/>
					</div>
				</div>

				<div className={`body-container__bottom-section`}>
					<div className={`input-container`}>
						<div className={`input-container__label`}>Profiles Processed per Hire</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.annualHires.profilesProcessedPerHire}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['annualHires']: {
												...prevState['annualHires'],
												profilesProcessedPerHire: e.target.value
											},
											['voiceCalling']: {
												...prevState['voiceCalling'],
												totalCallDurationLimit: multiplication(
													multiplication(
														e.target.value,
														prevState['annualHires']['totalYearlyHiringLimit']
													), 0.35
												)
											},
											['aiInterview']: {
												...prevState['aiInterview'],
												totalCallDurationLimit: multiplication(
													multiplication(
														e.target.value,
														prevState['annualHires']['totalYearlyHiringLimit']
													), 0.1
												)
											}
										})
									);
								}
							}
						/>

						<div className={`input-container__information`}>Default: 1 hire = 100 profiles processed</div>
					</div>

					<div className={`input-container`}>
						<div className={`input-container__label`}>Cost Per Profile (₹)</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.annualHires.costPerProfile}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['annualHires']: {
												...prevState['annualHires'],
												costPerProfile: e.target.value
											}
										})
									);
								}
							}
						/>

						<div className={`input-container__information`}>Tier Discount: 10%</div>
					</div>
				</div>
			</div>

			<div className={`summary-container`}>
				<div className={`summary-container__label`}>
					Pricing for {multiplication(estimation.annualHires.totalYearlyHiringLimit, estimation.annualHires.profilesProcessedPerHire)} profiles
				</div>

				<div className={`summary-container__value`}>
					₹{Boolean(estimation.annualHires.costPerProfile) ? estimation.annualHires.costPerProfile : 0}/profile × {
						multiplication(
							estimation.annualHires.totalYearlyHiringLimit,
							estimation.annualHires.profilesProcessedPerHire
						)
					} Profiles = <span
						className={`summary-container__value__result`}
					>
						₹{multiplication(estimation.annualHires.costPerProfile, multiplication(estimation.annualHires.totalYearlyHiringLimit, estimation.annualHires.profilesProcessedPerHire)).toLocaleString('en-IN')}
					</span>
				</div>
			</div>
		</Card >
	);
};

export default AnnualHires;