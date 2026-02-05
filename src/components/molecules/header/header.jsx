import './header.scss';
import MopidLogo from '@/assets/images/mopid-logo-small.svg?react';

const Header = () => {
	return (
		<div className={`header-wrapper`}>
			<div className={`header-wrapper__left-section`}>
				<MopidLogo />

				<div className={`header-wrapper__left-section__division`}></div>

				<div className={`header-wrapper__left-section__header-label`}>
					Pricing Calculator
				</div>
			</div>

			<div className={`header-wrapper__right-section`}></div>
		</div>
	);
};

export default Header;