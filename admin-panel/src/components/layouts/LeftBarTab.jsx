import { useState } from 'react';
import Main from './AppsMenu/Main';

const LeftBarTab = () => {
	const [mainMenu, setMainMenu] = useState(true);

	const handleMenuSwitch = () => {
		setMainMenu(true);
	};

	return (
		<>
			<div className='leftbar-tab-menu'>
				{/*end main-icon-menu*/}
				<div className='main-menu-inner'>
					{/* LOGO */}
					<div className='topbar-left'>
						<a href='/' className='logo'>
							<span>
								<img
									src='assets/images/logo.png'
									style={{
										height: '55px',
										marginLeft: '22%',
										marginTop: '6%'
									}}
									alt='logo-large'
									className='logo-lg logo-dark'
								/>
								<img
									src='assets/images/logo.png'
									alt='logo-large'
									className='logo-lg logo-light'
								/>
							</span>
							<br />
							<span style={{ marginLeft: '12%' }}>
								<b>Intelli Judge</b>
							</span>
						</a>
					</div>
					{/*end logo*/}
					{mainMenu && <Main />}
				</div>
				{/* end main-menu-inner*/}
			</div>
		</>
	);
};

export default LeftBarTab;
