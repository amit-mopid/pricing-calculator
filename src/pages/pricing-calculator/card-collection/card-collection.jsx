import './card-collection.scss';
import PricingSummary from './pricing-summary/pricing-summary';
import AnnualHires from './annual-hires/annual-hires';
import VoiceCalling from './voice-calling/voice-calling';
import AiInterview from './ai-interview/ai-interview';
import SourcingOutreach from './sourcing-outreach/sourcing-outreach';
import AdsBasedSourcing from './ads-based-sourcing/ads-based-sourcing';
import SalesDiscount from './sales-discount/sales-discount';
import DownloadFile from '@/assets/images/download-file.svg?react';
import RadioButton from '@/components/atoms/radio-button/radio-button';

const CardCollection = ({
	estimation = {},
	setEstimation = () => { },
	setDownload = () => { }
}) => {
	return (
		<div className={`card-collection-wrapper`}>
			<div className={`card-collection-wrapper__left-section`}>
				<AnnualHires
					estimation={estimation}
					setEstimation={setEstimation}
				/>

				<div className={`add-ons-wrapper`}>
					<div className={`add-ons-wrapper__label`}>Add-Ons</div>

					<div className={`add-ons-wrapper__estimation-container`}>
						<VoiceCalling
							estimation={estimation}
							setEstimation={setEstimation}
						/>

						<AiInterview
							estimation={estimation}
							setEstimation={setEstimation}
						/>

						<SourcingOutreach
							estimation={estimation}
							setEstimation={setEstimation}
						/>

						<AdsBasedSourcing
							estimation={estimation}
							setEstimation={setEstimation}
						/>
					</div>
				</div>

				<div className={`custom-discount-wrapper`}>
					<div className={`custom-discount-wrapper__label`}>Custom Discount</div>

					<SalesDiscount
						estimation={estimation}
						setEstimation={setEstimation}
					/>
				</div>
			</div>

			<div className={`card-collection-wrapper__right-section`}>
				<PricingSummary
					estimation={estimation}
					setEstimation={setEstimation}
				/>

				<div
					className={`quotation-download-wrapper`}
				>
					<div className={`label`}>Company name</div>

					<input
						className='input-wrapper'
						value={estimation.companyName}
						onChange={
							(e) => {
								setEstimation(
									(prevState) => ({
										...prevState,
										['companyName']: e.target.value
									})
								)
							}
						}
					/>

					<div className={`timing-quotation`}>
						<div className={`label`}>Download quotation for</div>

						<div className={`radio-btn-container`}>
							{
								(estimation.timing || []).map(
									(option, optionIndex) => (
										<RadioButton
											key={`radio-btn-${optionIndex}`}
											label={option.label}
											isActive={option.value}
											handleActiveChange={
												() => {
													setEstimation(
														(prevState) => ({
															...prevState,
															['timing']: prevState['timing'].map(
																(selectedOption, selectedOptionIndex) => selectedOptionIndex === optionIndex
																	? ({
																		...selectedOption,
																		['value']: true
																	}) : ({
																		...selectedOption,
																		['value']: false
																	})
															)
														})
													)
												}
											}
										/>
									)
								)
							}
						</div>
					</div>

					<button
						className={`download-quotation-wrapper ${Boolean(estimation.companyName.length) && estimation.timing.map((el) => el?.value).includes(true) ? 'active-button' : 'inactive-button'}`}
						onClick={
							() => {
								if (Boolean(estimation.companyName.length) && estimation.timing.map((el) => el?.value).includes(true)) setDownload(true)
							}
						}
					>
						<DownloadFile />

						Download Quotation
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardCollection;