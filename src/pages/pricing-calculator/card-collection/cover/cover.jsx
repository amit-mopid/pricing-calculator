import './cover.scss';
import { useEffect, useRef } from 'react';
import MopidLogo from '@/assets/images/mopid-logo-small.svg?react';
import GDPR from '@/assets/images/GDPR.svg?react';
import ISO from '@/assets/images/ISO.svg?react';
import SOC2 from '@/assets/images/SOC2.svg?react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { multiplication } from '@/utils/functions';

const ScreenOne = ({
	estimation = {},
	renderTimeLabel = () => {}
}) => {
	const addOnsAppended = (data) => {
		let addOnString = [];

		// 2. Optional add-ons
		if (data.voiceCalling?.activeAddOn) {
			addOnString.push('Voice Calling');
		}

		if (data.aiInterview?.activeAddOn) {
			addOnString.push('AI Interview');
		}

		if (data.sourcingOutreach?.activeAddOn) {
			addOnString.push('Sourcing Outreach');
		}

		if (data.adsBasedSourcing?.activeAddOn) {
			addOnString.push('Ads-Based Sourcing');
		}

		// return addOnString.join(' + ') + `${Boolean(addOnString.length) ? ' + ' : ''}Unlimited AI Screening + AI Assessments + AI Scheduling`
		return [
			...addOnString,
			'Unlimited AI Screening',
			'AI Assessments',
			'AI Scheduling'
		];
	};

	return (
		<>
			<div className={`top-section`}>
				<MopidLogo />

				<div className={`text-section`}>
					<div className={`text-1`}>{renderTimeLabel('coverLabel')}<br />Pricing<br />Proposal</div>

					<div className={`text-2`}>
						<div className={`sub-text-1`}>for {estimation.companyName}</div>

						<div className={`sub-text-2`}>
							{
								(addOnsAppended(estimation) || []).map(
									(el, elIndex) => (
										<div
											key={`el-${elIndex}`}
											className='list-content'
										>
											<div className='dot'></div>

											<span className='content'>{el}</span>
										</div>
									)
								)
							}
						</div>
					</div>
				</div>
			</div >

			<div className={`bottom-section`}>
				<GDPR />

				<ISO />

				<SOC2 />
			</div>
		</>
	);
};

const Pricing = ({
	label = '',
	label2 = '',
	value = '' || 0,
	type = '',
	isAddOn = false,
	totalAddOns = false
}) => {
	return (
		<div className={`price-container ${isAddOn ? `add-ons-padding ${totalAddOns ? 'border-division' : ''}` : 'require-padding'}`}>
			<div className='label-container'>
				<div className={`label-1 ${type === 'DISCOUNT' ? 'alert' : ''} ${isAddOn ? 'add-on-text' : ''}`}>{label}</div>
				<div className="label-2">{label2}</div>
			</div>

			<div className={`value ${type === 'DISCOUNT' ? 'alert' : ''}`}>{type === 'DISCOUNT' ? '- ' : ''}₹{value.toLocaleString('en-IN')}</div>
		</div>
	)
};

const Division = () => {
	return (
		<div className='division'></div>
	);
};

const ScreenTwo = ({
	estimation = {},
	renderTimeLabel = () => { }
}) => {

	const getaddOnsList = () => {
		return [
			{
				isActiveAddOn: estimation.voiceCalling.activeAddOn,
				label: `Voice Calling`,
				label2: `${estimation.voiceCalling.totalCallDurationLimit} mins`,
				value: (multiplication(estimation.voiceCalling.totalCallDurationLimit, estimation.voiceCalling.costPerMinute) / renderTimeLabel('divideBy')).toFixed(2)
			},
			{
				isActiveAddOn: estimation.aiInterview.activeAddOn,
				label: `AI Interview`,
				label2: `${estimation.aiInterview.totalCallDurationLimit} mins`,
				value: (multiplication(estimation.aiInterview.totalCallDurationLimit, estimation.aiInterview.costPerMinute) / renderTimeLabel('divideBy')).toFixed(2)
			},
			{
				isActiveAddOn: estimation.sourcingOutreach.activeAddOn,
				label: `Sourcing Outreach`,
				label2: `${estimation.sourcingOutreach.creditLimit} Credits`,
				value: (multiplication(estimation.sourcingOutreach.creditLimit, estimation.sourcingOutreach.costPerCredit) / renderTimeLabel('divideBy')).toFixed(2)
			},
			{
				isActiveAddOn: estimation.adsBasedSourcing.activeAddOn,
				label: `Ads-Based Sourcing`,
				label2: `Default Recharge for Ads-Based Sourcing`,
				value: (estimation.adsBasedSourcing.walletAmount / renderTimeLabel('divideBy')).toFixed(2)
			}
		];
	};

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
			? (discountAmount / renderTimeLabel('divideBy')).toFixed(2).toLocaleString('en-IN')
			: ((totalCost - discountAmount) / renderTimeLabel('divideBy')).toFixed(2).toLocaleString('en-IN')

	};

	return (
		<>
			<div className={`top-section`}>
				<div className="top-content">
					<div className="left-label">Pricing Summary</div>

					<div className="right-label">{estimation.annualHires.totalYearlyHiringLimit} hires/{
						renderTimeLabel('perLabel') === 'annual' 
							? 'year' 
							: renderTimeLabel('perLabel')
						}</div>
				</div>

				<div className="middle-content">
					<div className="up-content">
						<Pricing
							label={`Base Plan`}
							label2={`Unlimited AI Screening + AI Assessments + AI Scheduling`}
							value={
								(Number(estimation.annualHires.totalYearlyHiringLimit * estimation.annualHires.profilesProcessedPerHire * estimation.annualHires.costPerProfile) / renderTimeLabel('divideBy')).toFixed(2)
							}
						/>

						{
							Boolean((getaddOnsList() || []).filter(
								(el) => el.isActiveAddOn
							).length)
								? (
									<>
										<Division />

										<div className='add-ons-container'>
											<div className="label">Add Ons</div>

											<div className="add-ons">
												{
													(getaddOnsList() || []).filter(
														(el) => el.isActiveAddOn
													).map(
														(el, elIndex) => (
															<Pricing
																key={`summary-${elIndex}`}
																label={el.label}
																label2={el.label2}
																value={el.value}
																isAddOn={true}
																totalAddOns={
																	(getaddOnsList() || []).filter(
																		(el) => el.isActiveAddOn
																	).length - 1 > elIndex
																}
															/>
														)
													)
												}
											</div>
										</div>
									</>
								) : (<></>)
						}

						{
							Boolean(estimation.salesDiscount.discountPercent)
								? (
									<>
										<Division />

										<Pricing
											label={`Custom Discount (-${estimation.salesDiscount.discountPercent}%)`}
											label2={`Applies after all tier discounts`}
											value={pricingCalculationSummary('DISCOUNT', estimation)}
											type="DISCOUNT"
										/>
									</>
								) : (<></>)
						}

					</div>

					<div className="down-content">
						<div className="left">
							<div className="text-1">TOTAL</div>

							<div className="text-2">Prices are exclusive of taxes</div>
						</div>

						<div className="right">
							<div className='text-1'>₹{pricingCalculationSummary('', estimation)}</div>

							<div className='text-2'>per {renderTimeLabel('perLabel')}</div>
						</div>
					</div>
				</div>

				<div className="bottom-content">
					<div className="heading">Pricing & Usage Notes </div>

					{
						[
							'Screening is unlimited.',
							'AI assessments are capped at 100× annual hires as part of fair usage.',
							'Add-on volumes are flexible and pooled across roles.',
							'Pricing is indicative and valid for 30 days.',
							'Additional usage will be charged pro-rata.'
						].map(
							(el, elIndex) => (
								<div
									key={`notes-${elIndex}`}
									className='notes'
								>
									<div className="dot"></div>

									<div className={`text`}>{el}</div>
								</div>
							)
						)
					}
				</div>
			</div>

			<div className={`bottom-section`}>
				<MopidLogo />

				<div className={`trademark`}>© 2025 Tapmark Private Limited. All rights reserved.</div>
			</div>
		</>
	);
};

const Cover = ({
	estimation = {},
	download = false
}) => {

	const screenOneRef = useRef(null);
	const screenTwoRef = useRef(null);

	const renderTimeLabel = (key) => {
		return estimation.timing.find(
			(el) => el.value === true
		)[key];
	};

	const downloadPDF = async () => {
		const pdf = new jsPDF("p", "mm", "a4");

		// Screen 1
		const canvas1 = await html2canvas(screenOneRef.current);
		const imgData1 = canvas1.toDataURL("image/png");

		const imgWidth = 210; // A4 width in mm
		const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;

		pdf.addImage(imgData1, "PNG", 0, 0, imgWidth, imgHeight1);

		// Screen 2 (new page)
		pdf.addPage();

		const canvas2 = await html2canvas(screenTwoRef.current);
		const imgData2 = canvas2.toDataURL("image/png");
		const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;

		pdf.addImage(imgData2, "PNG", 0, 0, imgWidth, imgHeight2);

		const formatCompanyName = estimation.companyName.toLowerCase().split(' ').join('-');

		pdf.save(`MOPID_X_${formatCompanyName}_pricing.pdf`);
	}

	useEffect(
		() => {
			if (download) {
				downloadPDF();
			}
		}, [download]
	);

	return (
		<div className='printable-container'>
			<div
				className={`screen-1`}
				ref={screenOneRef}
			>
				<ScreenOne estimation={estimation} renderTimeLabel={renderTimeLabel} />
			</div>

			<div
				className={`screen-2`}
				ref={screenTwoRef}
			>
				<ScreenTwo estimation={estimation} renderTimeLabel={renderTimeLabel} />
			</div>
		</div>
	);
};

export default Cover;