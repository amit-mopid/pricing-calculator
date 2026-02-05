import './card.scss';
import IosButton from '../../../components/atoms/ios-button/ios-button';

const Card = ({
	children,
	cardName = '',
	hasAddOn = false,
	isActive = false,
	toggleAddOn = () => { }
}) => {
	return (
		<div className={`card-wrapper`}>
			{
				Boolean(cardName)
					? (
						<div className={`card-wrapper__label-container`}>
							{
								hasAddOn
									? (
										<IosButton
											isActive={isActive}
											handleToggleSwitch={toggleAddOn}
										/>
									) : (<></>)
							}

							<div className={`card-wrapper__label-container__label`}>{cardName}</div>
						</div>
					) : (<></>)
			}

			{children}
		</div>
	);
};

export default Card;