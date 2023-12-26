import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import styles from "./CreateWorkspace.module.css";
import Header from "../../components/Header";
import PText from "../../components/texts/PText";
import { fonts } from "../../style/font/fonts";
import { fontWeights } from "../../style/font/fontWeights";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import TitleTextChildButton from "../../components/buttons/TitleTextChildButton";
import BasicText from "../../components/texts/BasicText";
import * as Icon from 'react-feather';
import { colors } from "../../style/color";
import { formatNumber } from "../../utils/formatNumber";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import IconButton from "../../components/buttons/IconButton";
import { getWorkspaceView, postWorkspace } from "../../models/workspaces";
import { useNavigate } from "react-router";
import Popup from "../../components/popup/Popup";

const NumberPeople = ({numberPeople}) => {

	const IconLogo = Icon["User"];

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}}>
			<div style={{paddingRight: '10px'}}>
				<IconLogo color={colors.white}/>
			</div>
			<div>
				<BasicText text={formatNumber(numberPeople)} color={colors.white}/>
			</div>
		</div>
	)
}

const CreateWorkspace = () => {

	const navigate = useNavigate();
	const [nameValue, setNameValue] = useState("");
	const [popupSuccess, setPopupSuccess] = useState(false);
	const [popupError, setPopupError] = useState(false);
	const [publicWorkspaces, setPublicWorkspaces] = useState([]);
	const [workspaceSearchValue, setWorkspaceSearchValue] = useState("");

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await getWorkspaceView();
			console.log(response);
			if (response.status === 200) {
				// console.log(response.content.result);
				setPublicWorkspaces(response.content.result);
			} else {
			  setPopupError(true);
			}
		  } catch (error) {
			  console.error("Error fetching workspaces:", error);
		  }
		};
  
		fetchData();
	}, []);

  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);

  const handleSelect = (index) => {
    const isSelected = selectedWorkspaces.includes(index);

    if (isSelected) {
      setSelectedWorkspaces(selectedWorkspaces.filter((item) => item !== index));
    } else {
      setSelectedWorkspaces([...selectedWorkspaces, index]);
    }
  };

  const handleClickButttonPopup = () => {
	if (popupSuccess) {
		setPopupError(false);
		setPopupSuccess(false);
		navigate('/homeWorkspace');
		return;
	}
	setPopupError(false);
	setPopupSuccess(false);
  };

  const handleClosePopup = () => {
	if (popupSuccess) {
		setPopupError(false);
		setPopupSuccess(false);
		navigate('/homeWorkspace');
		return;
	}
	setPopupError(false);
	setPopupSuccess(false);
  };

	const handleAddWorkspace = async () => {
		try {
			const response = await postWorkspace(nameValue, "description par défaut", true);
			console.log(response);
			if (response.status === 201) {
				setPopupSuccess(true);
			} else {
				setPopupError(true);
			}
		} catch (error) {
			console.error("Error fetching workspaces:", error);
		}
	};

	const handleLeftIconClick = () => {
		navigate('/homeWorkspace');
	};

	return (
		<div className={styles.createWorkspaceBody}>
			<div>
				<Header rightIconName='' onClickIconLeft={handleLeftIconClick}/>
			</div>
			<div className={styles.createWorkspaceContainer}>
				<div className={styles.createWorkspaceTitle}>
					<PText text='New Workspace' font={fonts.openSans} fontWeight={fontWeights.bold} size="30px"/>
				</div>
				<div className={styles.createWorkspaceInput}>
					<PrimaryInput leftIconName='' placeholder='Name' inputValue={nameValue} setInputValue={setNameValue} width="85%"/>
				</div>
				<div className={styles.createWorkspaceSeparationLine}></div>
				<div className={styles.createWorkspaceInputWorkspace}>
					<PrimaryInput leftIconName='Search' placeholder='Workspace search...' inputValue={workspaceSearchValue} setInputValue={setWorkspaceSearchValue} width="85%"/>
				</div>
					{publicWorkspaces.length !== 0 ? (
						<div className={styles.createWorkspaceList}>
							{publicWorkspaces
								.filter(workspace => workspace.title.toLowerCase().includes(workspaceSearchValue.toLowerCase()))
								.map((workspace, index) => (
									<div key={index} style={{ paddingBottom: index === publicWorkspaces.length - 1 ? ((selectedWorkspaces.length !== 0 || nameValue !== "") ? '170px' : '90px') : '15px' }}>
										<TitleTextChildButton
											title={workspace.title}
											text={`Par **${'undefined'}**`} // a changer
											isSelectable={true}
											componentId={index}
											isClickable={false}
											backgroundColor={colors.lightPurple} // a changer
											borderColor={colors.lightPurple} // a changer
											handleSelect={handleSelect}
											width="90%"
											ComponentChildren={() => <NumberPeople numberPeople={5000} />} // a changer
										/>
									</div>
								))}
						</div>
						) : null
					}
					{ (selectedWorkspaces.length !== 0 || nameValue !== "") && (
						<div style={{position: 'fixed', bottom: 80, width: '100%'}}>
							<IconButton height="70px" onPressButton={handleAddWorkspace} buttonText='Add' width="90%" iconSrc='Plus' iconColor={colors.white} iconSize="30px" isIcon={true} isImage={false} backgroundColor={colors.darkPurple} textColor={colors.white} hoverBackgroundColor={colors.darkPurple} />
						</div>
					)}
				<div>
					<BottomNavbar itemPosition={"Create"}/>
				</div>
			</div>
			{ popupError && (
				<Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={'Error'} Content={'An error at creation.'} TextButton="Continue" />
			)}
			{ popupSuccess && (
				<Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={'Success'} Content={'Your workspace has been created.'} TextButton="Continue" />
			)}
		</div>
	);
};

NumberPeople.propTypes = {
	numberPeople: PropTypes.number
};

export default CreateWorkspace;
