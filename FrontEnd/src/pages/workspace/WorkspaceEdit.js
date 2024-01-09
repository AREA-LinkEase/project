import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from "./WorkspaceEdit.module.css";
import Header from "../../components/Header";
import { colors } from "../../style/color";
import PText from "../../components/texts/PText";
import { fontWeights } from "../../style/font/fontWeights";
import { fonts } from "../../style/font/fonts";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import Popup from "../../components/popup/Popup";
import IconButton from "../../components/buttons/IconButton";
import {useLocation, useNavigate} from "react-router-dom/dist";

const WorkspaceEdit = ({id, named, description}) => {
    const location = useLocation();
    const navigate = useNavigate();
	const { workspace, name } = location.state || {};
    const [nameValue, setNameValue] = useState(named);
    const [descriptionValue, setDescriptionValue] = useState(description);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [initialName, setInitialName] = useState(named);
    const [initialDescription, setInitialDescription] = useState(description);

    useEffect(() => {
        setNameValue(workspace.title);
        setDescriptionValue(workspace.description);
    }, []);
    useEffect(() => {
        setInitialName(named);
        setInitialDescription(description);
        setIsModified(false);
    }, [named, description]);

    const handleNameChange = (newValue) => {
        setNameValue(newValue);
        setIsModified(newValue !== initialName || descriptionValue !== initialDescription);
    }

    const handleDescriptionChange = (newValue) => {
        setDescriptionValue(newValue);
        setIsModified(nameValue !== initialName || newValue !== initialDescription);
    }

    const handleClickDeleteText = () => {
        setIsOpenPopup(!isOpenPopup);
    };

    const handleClosePopup = () => {
        console.log("Clicked on screen to close popup");
        setIsOpenPopup(false);
    };

    const handleClickDeleteButttonPopup = () => {
        console.log("Clicked on button delete workspace");
        setIsOpenPopup(false);
    }

    const handleItemClick = () => {
        navigate("/workspace", {
			state: {
			  workspace: workspace,
              name: name,
			},
		});
    }

    return (
        <div key={id} className={styles.workspaceEditBody}>
            <Header rightIconColor={colors.white} leftIconSize="30px" onClickIconLeft={handleItemClick}/>
            <div style={{width: '100%'}}>
                <div style={{paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <PText text='Workspace parameters' fontWeight={fontWeights.bold} font={fonts.openSans} color={colors.lightBlack} size="21px"/>
                </div>
                <div style={{paddingBottom: '20px', paddingLeft: '20px'}}>
                    <PText text='Edit the name :' font={fonts.openSans} color={colors.lightBlack} size="17px"/>
                </div>
                <div style={{paddingBottom: '60px', paddingLeft: '20px'}}>
                    <PrimaryInput width="90%" leftIconName='' fontWeight={fontWeights.normal} placeholder="Name" inputType="text" textSize="15px" inputValue={nameValue} setInputValue={handleNameChange}/>
                </div>
                <div style={{paddingBottom: '20px', paddingLeft: '20px'}}>
                    <PText text='Edit the description:' font={fonts.openSans} color={colors.lightBlack} size="17px"/>
                </div>
                <div style={{paddingBottom: '100px', paddingLeft: '20px'}}>
                    <PrimaryInput width="90%" leftIconName='' isTextArea={true} placeholder="Description..." rows={8} fontWeight={fontWeights.normal} inputType="text" textSize="15px" inputValue={descriptionValue} setInputValue={handleDescriptionChange}/>
                </div>
                <div style={{width: "100%", textAlign: 'center'}}>
                    <div
                        onClick={handleClickDeleteText}
                        style={{cursor: 'pointer', display: 'inline-block'}}>
                        <PText text='Delete the workspace' font={fonts.openSans} color='red' fontWeight={fontWeights.bold} size="15px"/>
                    </div>
                </div>
                { isOpenPopup && (
                    <Popup onPress={handleClickDeleteButttonPopup} leavePopup={handleClosePopup} Title="Are you sure to delete it ?!" Content="The workspace and his content will definitely be deleted." TextButton="Delete" />
                )}
                { isModified && (
                    <div style={{position: 'fixed', bottom: 75, width: '100%', textAlign: 'center'}}>
                        <IconButton width="90%" height="60px" buttonText='Add' iconSrc='' backgroundColor={colors.darkPurple} textColor={colors.white} hoverBackgroundColor={colors.darkPurple} />
                    </div>
                )}
                <BottomNavbar isPopupVisible={isOpenPopup}/>
            </div>
        </div>
    );
};

WorkspaceEdit.propTypes = {
    id: PropTypes.string,
    named: PropTypes.string,
    description: PropTypes.string,
};

export default WorkspaceEdit;
