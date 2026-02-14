import './voice-calling.scss';
import Card from '@/components/templates/cards/card';
import { multiplication } from '@/utils/functions';

const VoiceCalling = ({
	estimation = {},
	setEstimation = () => { }
}) => {
	return (
		<Card
			cardName={`Voice Calling`}
			hasAddOn={true}
			isActive={Math.round(estimation.voiceCalling.activeAddOn)}
			toggleAddOn={
				() => {
					setEstimation(
						(prevState) => ({
							...prevState,
							['voiceCalling']: {
								...prevState['voiceCalling'],
								activeAddOn: !prevState['voiceCalling']['activeAddOn']
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
							value={Math.round(estimation.voiceCalling.totalCallDurationLimit)}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['voiceCalling']: {
												...prevState['voiceCalling'],
												totalCallDurationLimit: e.target.value
											}
										})
									);
								}
							}
							disabled={!estimation.voiceCalling.activeAddOn}
						/>

						{/* <div className={`input-container__information`}>Default: 7,000 min (10% of profiles).</div> */}
					</div>

					<div className={`input-container`}>
						<div className={`input-container__label`}>Cost Per Minute (₹)</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.voiceCalling.costPerMinute}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['voiceCalling']: {
												...prevState['voiceCalling'],
												costPerMinute: e.target.value
											}
										})
									);
								}
							}
							disabled={!estimation.voiceCalling.activeAddOn}
						/>
					</div>
				</div>
			</div>

			<div className={`summary-container`}>
				<div className={`summary-container__label`}>
					Pricing for {Math.round(estimation.voiceCalling.totalCallDurationLimit)} minutes @ ₹{Boolean(estimation.voiceCalling.costPerMinute) ? estimation.voiceCalling.costPerMinute : 0}/minute
				</div>

				<div className={`summary-container__value`}>
					₹{Boolean(estimation.voiceCalling.costPerMinute) ? Math.round(estimation.voiceCalling.costPerMinute) : 0}/min × {Boolean(estimation.voiceCalling.totalCallDurationLimit) ? Math.round(estimation.voiceCalling.totalCallDurationLimit) : 0}mins = <span
						className={`summary-container__value__result`}
					>
						₹{Math.round(multiplication(estimation.voiceCalling.costPerMinute, estimation.voiceCalling.totalCallDurationLimit)).toLocaleString('en-IN')}
					</span>
				</div>
			</div>
		</Card>
	);
};

export default VoiceCalling;