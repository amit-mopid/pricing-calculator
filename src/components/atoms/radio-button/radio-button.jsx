import "./radio-button.scss";

const RadioButton = ({
	label = '',
	isActive = false,
	handleActiveChange = () => { }
}) => {
	return (
		<div className={`radio-button-wrapper`}>
			<div
				className={`radio-button-outer-circle ${isActive ? 'active-outer-circle' : 'inactive-outer-circle'}`}
				onClick={handleActiveChange}
			>
				<div className={`radio-button-middle-circle`}>
					<div className={`radio-button-inner-circle ${isActive ? 'active-inner-circle' : 'inactive-inner-circle'}`}></div>
				</div>
			</div>

			<div className={`radio-button-label`}>{label}</div>
		</div>
	);
};

export default RadioButton;