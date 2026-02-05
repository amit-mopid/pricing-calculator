import './sourcing-outreach.scss';
import Card from '@/components/templates/cards/card';
import { multiplication } from '@/utils/functions';

const SourcingOutreach = ({
	estimation = {},
	setEstimation = () => { }
}) => {
	return (
		<Card
			cardName={`Sourcing Outreach`}
			hasAddOn={true}
			isActive={estimation.sourcingOutreach.activeAddOn}
			toggleAddOn={
				() => {
					setEstimation(
						(prevState) => ({
							...prevState,
							['sourcingOutreach']: {
								...prevState['sourcingOutreach'],
								activeAddOn: !prevState['sourcingOutreach']['activeAddOn']
							}
						})
					)
				}
			}
		>
			<div className={`body-container`}>
				<div className={`body-container__bottom-section`}>
					<div className={`input-container`}>
						<div className={`input-container__label`}>Credit Limit</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.sourcingOutreach.creditLimit}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['sourcingOutreach']: {
												...prevState['sourcingOutreach'],
												creditLimit: e.target.value
											}
										})
									);
								}
							}
							disabled={!estimation.sourcingOutreach.activeAddOn}
						/>

						<div className={`input-container__information`}>Each credit = 1 email & phone number</div>
					</div>

					<div className={`input-container`}>
						<div className={`input-container__label`}>Cost Per Credit (₹)</div>

						<input
							className={`input-container__input`}
							type='number'
							min={0}
							value={estimation.sourcingOutreach.costPerCredit}
							onChange={
								(e) => {
									setEstimation(
										(prevState) => ({
											...prevState,
											['sourcingOutreach']: {
												...prevState['sourcingOutreach'],
												costPerCredit: e.target.value
											}
										})
									);
								}
							}
							disabled={!estimation.sourcingOutreach.activeAddOn}
						/>
					</div>
				</div>
			</div>

			<div className={`summary-container`}>
				<div className={`summary-container__label`}>
					Pricing for {estimation.sourcingOutreach.creditLimit} credits @ ₹{Boolean(estimation.sourcingOutreach.costPerCredit) ? estimation.sourcingOutreach.costPerCredit : 0}/minute
				</div>

				<div className={`summary-container__value`}>
					₹{Boolean(estimation.sourcingOutreach.costPerCredit) ? estimation.sourcingOutreach.costPerCredit : 0}/min × {Boolean(estimation.sourcingOutreach.creditLimit) ? estimation.sourcingOutreach.creditLimit : 0}mins = <span
						className={`summary-container__value__result`}
					>
						₹{multiplication(estimation.sourcingOutreach.costPerCredit, estimation.sourcingOutreach.creditLimit)}
					</span>
				</div>
			</div>
		</Card>
	);
};

export default SourcingOutreach;