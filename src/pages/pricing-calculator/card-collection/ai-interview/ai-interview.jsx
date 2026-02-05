import './ai-interview.scss';
import Card from '@/components/templates/cards/card';
import { multiplication } from '@/utils/functions';

const AitInterview = ({
	estimation = {},
	setEstimation = () => { }
}) => {
	return (
		<Card
			cardName={`AI Interview`}
			hasAddOn={true}
			isActive={estimation.aiInterview.activeAddOn}
			toggleAddOn={
				() => {
					setEstimation(
						(prevState) => ({
							...prevState,
							['aiInterview']: {
								...prevState['aiInterview'],
								activeAddOn: !prevState['aiInterview']['activeAddOn']
							}
						})
					)
				}
			}
		>
			<div className={`body-container`}>
				<div className={`body-container__bottom-section`}>
					<div className={`input-container`}>
						<div className={`input-container__label`}>Total Call duration limit</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.aiInterview.totalCallDurationLimit}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['aiInterview']: {
												...prevState['aiInterview'],
												totalCallDurationLimit: e.target.value
											}
										})
									);
								}
							}
							disabled={!estimation.aiInterview.activeAddOn}
						/>

						{/* <div className={`input-container__information`}>Default: 7,000 min (10% of profiles).</div> */}
					</div>

					<div className={`input-container`}>
						<div className={`input-container__label`}>Cost Per Minute (₹)</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.aiInterview.costPerMinute}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['aiInterview']: {
												...prevState['aiInterview'],
												costPerMinute: e.target.value
											}
										})
									);
								}
							}
							disabled={!estimation.aiInterview.activeAddOn}
						/>
					</div>
				</div>
			</div>

			<div className={`summary-container`}>
				<div className={`summary-container__label`}>
					Pricing for {estimation.aiInterview.totalCallDurationLimit} minutes @ ₹{Boolean(estimation.aiInterview.costPerMinute) ? estimation.aiInterview.costPerMinute : 0}/minute
				</div>

				<div className={`summary-container__value`}>
					₹{Boolean(estimation.aiInterview.costPerMinute) ? estimation.aiInterview.costPerMinute : 0}/min × {Boolean(estimation.aiInterview.totalCallDurationLimit) ? estimation.aiInterview.totalCallDurationLimit : 0}mins = <span
						className={`summary-container__value__result`}
					>
						₹{multiplication(estimation.aiInterview.costPerMinute, estimation.aiInterview.totalCallDurationLimit)}
					</span>
				</div>
			</div>
		</Card>
	);
};

export default AitInterview;