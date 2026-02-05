import './ads-based-sourcing.scss';
import Card from '@/components/templates/cards/card';

const AdsBasedSourcing = ({
	estimation = {},
	setEstimation = () => { }
}) => {
	return (
		<Card
			cardName={`Ads-Based Sourcing`}
			hasAddOn={true}
			isActive={estimation.adsBasedSourcing.activeAddOn}
			toggleAddOn={
				() => {
					setEstimation(
						(prevState) => ({
							...prevState,
							['adsBasedSourcing']: {
								...prevState['adsBasedSourcing'],
								activeAddOn: !prevState['adsBasedSourcing']['activeAddOn']
							}
						})
					)
				}
			}
		>
			<div className={`body-container`}>
				<div className={`body-container__bottom-section`}>
					<div className={`input-container`}>
						<div className={`input-container__label`}>Wallet Amount (₹)</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.adsBasedSourcing.walletAmount}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['adsBasedSourcing']: {
												...prevState['adsBasedSourcing'],
												walletAmount: Number(e.target.value)
											}
										})
									);
								}
							}
							disabled={!estimation.adsBasedSourcing.activeAddOn}
						/>
					</div>
				</div>
			</div>

			<div className={`summary-container`}>
				<div className={`summary-container__label`}>
					Default Recharge for Ads-Based Sourcing
				</div>

				<div className={`summary-container__value`}>
					₹{Boolean(estimation.adsBasedSourcing.walletAmount) ? estimation.adsBasedSourcing.walletAmount : 0}
				</div>
			</div>
		</Card>
	);
};


export default AdsBasedSourcing;