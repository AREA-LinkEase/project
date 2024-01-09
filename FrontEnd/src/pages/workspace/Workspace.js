import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from "./Workspace.module.css";
import Header from "../../components/Header";
import PText from "../../components/texts/PText";
import { fontWeights } from "../../style/font/fontWeights";
import { fonts } from "../../style/font/fonts";
import { colors } from "../../style/color";
import { formatTextBold } from "../../utils/formatTextBold";
import adjustColorBrightness from "../../utils/adjustColorBrightness";
import SwitchButton from "../../components/switches/SwitchButton";
import { calculatePixelSize } from "../../utils/calculatePixelSize";
import IconButton from "../../components/buttons/IconButton";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import * as Icon from 'react-feather';
import {useLocation, useNavigate} from "react-router-dom/dist";
import { getUserById } from "../../models/users";
import { getAutomatesByWorkspace } from "../../models/automates";
import { updateEnableWorkspace } from "../../models/workspaces";

const Workspace = ({ workspaceValues }) => {
	const location = useLocation();
	const { workspace, name } = location.state || {};
	const [isError, setIsError] = useState(false);
	const [isSwitched, setIsSwitched] = useState(workspaceValues.access !== "Private");
	const [automates, setAutomates] = useState([]);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const fetchAutomates = async () => {
			try {
				const id = workspace.id;
				console.log(id);
				const response = await getAutomatesByWorkspace(id);
				console.log(response);
				if (response.status === 200) {
					setAutomates(response.content.result);
				} else {
				setIsError(true);
				}
			} catch (error) {
				console.error("Error fetching workspaces:", error);
			}
		}

		setIsSwitched(workspace.enabled);
		fetchAutomates();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		console.log(automates);
	}, [automates]);

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	const UserIcon = Icon['User'];

	const onClickUserIcon = () => {
		navigate("/workspaceEditUsers", {
			state: {
			  workspace: workspace,
			  name: name,
			},
		});
	};

	const handleSwitchChange = async () => {
		setIsSwitched((prevSwitched) => !prevSwitched);
		try {
			const response = await updateEnableWorkspace(workspace.id, !isSwitched);
			console.log(response);
			if (response.status !== 200) {
				setIsError(true);
			}
		} catch (error) {
			console.error("Error fetching workspaces:", error);
		}
	};

	const navigate = useNavigate();
	const handleSettingClick = () => {
		navigate("/workspaceEdit", {
			state: {
			  workspace: workspace,
			  name: name,
			},
		  });
	}

	const handleBackClick = () => {
		navigate("/homeWorkspace");
	};

	const handleClickAutomate = (automate) => {
		console.log(automate);
		navigate("/actionReactionAutomate", {
            state: {
                automate: automate,
				workspace: workspace,
				name: name,
            },
        });
	};

	const handleClickNewAutomate = () => {
		// navigate("/createAutomate");
		navigate("/createAutomate", {
            state: {
				workspace: workspace,
				name: name, 
            },
        });
	};

	const handleClickButttonPopup = () => {
		setIsError(false);
	};
	
	const handleClosePopup = () => {
		setIsError(false);
	};
	
	const keyForSwitchButton = isSwitched ? 'switched' : 'not-switched';

	return (
		<div className={styles.workspaceBody}>
			<div style={{ position: 'fixed', zIndex: 1000, backgroundColor: 'white', width: '100%' }}>
				<div className={styles.workspaceDescriptionContainer} style={{ backgroundColor: isSwitched ? colors.lightPurple : "#777777" }}>
					<Header
						rightIconName="Settings"
						backgroundColor={isSwitched ? colors.lightPurple : "#777777"}
						leftIconColor={colors.white}
						rightIconColor={colors.white}
						leftIconSize="30px"
						rightIconSize="25px"
						marginBottomRightIcon="-2px"
						onClickIconRight={handleSettingClick}
						onClickIconLeft={handleBackClick}
					/>
					<div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
						<div style={{ paddingBottom: '7px', display: 'flex', flexDirection: 'row' }}>
							<div>
								<PText text={workspace.title} fontWeight={fontWeights.bold} font={fonts.openSans} color={colors.white} size="21px" />
							</div>
							<div
								onClick={onClickUserIcon}
								style={{ cursor: 'pointer', marginLeft: 'auto', marginRight: '-12px' }}>
								{React.createElement(UserIcon, {
									size: '30px',
									color: colors.white,
								})}
							</div>
						</div>
						<div style={{ paddingBottom: '15px' }}>
							<PText text={formatTextBold(`Par **${name}**`)} font={fonts.openSans} color={colors.white} size="12px" />
						</div>
						<div style={{ paddingBottom: '15px' }}>
							<PText text={workspace.description} font={fonts.openSans} color={colors.white} size="11px" lineHeight="0" />
						</div>
					</div>
				</div>
				<div className={styles.workspaceSwitch} style={{ paddingTop: '20px' }}>
					<SwitchButton
						key={keyForSwitchButton}
						textColorOff={colors.white}
						backgroundColorOn={colors.lightlightGrey}
						colorOn={colors.lightPurple}
						toggleSwitch={handleSwitchChange}
						textColorOn={colors.lightBlack}
						isIndicator={false}
						isOn={isSwitched}
						isLittle={false}
						width={calculatePixelSize(85, windowSize.width)}
						height="55px"
					/>
					<div style={{ paddingTop: '20px' }} />
					<div className={styles.workspaceSeparationLine} />
				</div>
				<div style={{ paddingLeft: '20px', paddingTop: '15px', paddingBottom: '10px' }}>
					<PText text='Automates :' font={fonts.openSans} color={colors.black} size="18px" />
				</div>
			</div>
			<div style={{ paddingLeft: '20px', paddingTop: '340px' }}>
				{automates?.map((automate, index) => {
					const isLastItem = index === automates.length - 1;
					const paddingBottomStyle = isLastItem ? { paddingBottom: '20px' } : { paddingBottom: '20px' };
					return (
						<div key={index} style={paddingBottomStyle}>
							<IconButton
								alignLeft={true}
								textSize='17px'
								hoverBackgroundColor={adjustColorBrightness(colors.lightlightBlue, -10)}
								textColor="#233255"
								iconColor="#233255"
								buttonText={automate.title}
								isIcon={true}
								iconSrc="Command"
								backgroundColor={colors.lightlightBlue}
								width="95%"
								height="50px"
								borderRadius='15px'
								onPressButton={() => {handleClickAutomate(automate)}}
							/>
						</div>
					);
				})}
				<div style={{ paddingBottom: '90px' }}>
					<IconButton
						textSize='17px'
						iconColor={colors.white}
						hoverBackgroundColor={adjustColorBrightness(colors.white, -10)}
						buttonText={"New automate"}
						isIcon={true}
						iconSrc="Plus"
						backgroundColor={colors.darkPurple}
						width="95%"
						height="50px"
						borderRadius='25px'
						textColor={colors.white}
						onPressButton={handleClickNewAutomate}
					/>
				</div>
			</div>
			{ isError && (
				<Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={'Error'} Content={'Error'} TextButton="Continue" />
			)}
			<BottomNavbar itemPosition={"Workspace"}/>
		</div>
	);
};

Workspace.propTypes = {
	workspaceValues: PropTypes.shape({
		name: PropTypes.string.isRequired,
		creator: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired,
		access: PropTypes.string.isRequired,
		automates: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
			})
		),
	}).isRequired,
};

export default Workspace;
