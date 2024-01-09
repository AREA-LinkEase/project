import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import styles from "./ActionReactionAutomate.module.css";
import Header from "../../components/Header";
import PText from "../../components/texts/PText";
import { fonts } from "../../style/font/fonts";
import { fontWeights } from "../../style/font/fontWeights";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import { colors } from "../../style/color";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import IconButton from "../../components/buttons/IconButton";
import SelectComponent from "../../components/selects/SelectComponent";
import {useLocation, useNavigate} from "react-router-dom/dist";
import {putAutomate} from "../../models/automates";
import Popup from "../../components/popup/Popup";

const ActionReactionAutomate = ({id, automateName}) => {
    const location = useLocation();
    const navigate = useNavigate();
	const { automate, workspace, name } = location.state || {};
    const [isOpenMenuTrigger, setIsOpenMenuTrigger] = useState(false);
    const [isError, setIsError] = useState(false);
    const [triggerValue, setTriggerValue] = useState('');
    const [selectedTriggerOption, setSelectedTriggerOption] = useState({id: -1, value: ''});
    const [isOpenMenuAction, setIsOpenMenuAction] = useState(false);
    const [actionValue, setActionValue] = useState('');
    const [selectedActionOption, setSelectedActionOption] = useState({id: -1, value: ''});

    const triggers = [
        {
            id: 1,
            value: "Quand j'écoute",
        },
        {
            id: 0,
            value: "Quand j'écoute pas",
        }
    ];

    const actions = [
        {
            id: 1,
            value: "Rajoute à la queue ...",
        },
        {
            id: 0,
            value: "Relancer la musique",
        }
    ];

    useEffect(() => {
        const findTriggerById = (id) => triggers.find(trigger => trigger.id === id);
        const findActionById = (id) => actions.find(action => action.id === id);
    
        const selectedTrigger = automate.trigger !== -1 ? findTriggerById(automate.trigger) : { id: -1, value: '' };
        const selectedAction = automate.action !== -1 ? findActionById(automate.action) : { id: -1, value: '' };
    
        setSelectedTriggerOption(selectedTrigger);
        setSelectedActionOption(selectedAction);
        setTriggerValue(automate.trigger_option);
        setActionValue(automate.action_option);
    }, []);

    const areStatesNotEmpty = () => {
        return (
            selectedTriggerOption.id !== -1 &&
            selectedActionOption.id !== -1
        );
    };

    const handleBackClick = () => {
        navigate("/workspace", {
            state: {
              workspace: workspace,
              name: name,
            },
          });
    }

    const onSubmit = async () => {
        let trigger = selectedTriggerOption.id;
        let action = selectedActionOption.id;
        let triggerOption = triggerValue;
        let actionOption = actionValue;

        console.log(workspace.id);
        try {
			const response = await putAutomate(workspace.id, actionOption, action, trigger, triggerOption);
			console.log(response);
			if (response.status === 200) {
                console.log("its okay");
            } else {
                setIsError(true);
            }
		} catch (error) {
			console.error("Error fetching putAutomate:", error);
		}
    };

    const handleClickButttonPopup = () => {
		setIsError(false);
	};
	
	const handleClosePopup = () => {
		setIsError(false);
	};

	return (
		<div key={id} className={styles.actionReactionAutomateBody}>
            <div style={{paddingBottom: '15px'}}>
			<Header CenterChildrenComponent={() => <PText width="50%" font={fonts.openSans} fontWeight={fontWeights.bold} text={automate.title} textAlign={true}/>} rightIconColor={colors.white} isRightIconClickable={false} isContentCenter={false} onClickIconLeft={handleBackClick}/>
            </div>
            <div className={styles.actionReactionAutomateContainer}>
                <div style={{paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <PText text="Trigger" font={fonts.openSans} fontWeight={fontWeights.bold} color="#233255" size="17px"/>
                </div>
                <div style={{paddingLeft: '20px', paddingBottom: '20px', width: '100%'}}>
                    <SelectComponent setSelectedOption={setSelectedTriggerOption} options={triggers} backgroundColor={colors.white} placeholder={(selectedTriggerOption.id !== '' && selectedTriggerOption.value !== '') ? selectedTriggerOption.value : "Select a trigger"} placeholderSize="15px" iconColor="#7C7C7C" borderColor={colors.lightlightGrey} borderWidth="1px" isOpenMenu={isOpenMenuTrigger} setIsOpenMenu={setIsOpenMenuTrigger} width="95%"/>
                </div>
                <div style={{paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <PText text="Trigger option" font={fonts.openSans} fontWeight={fontWeights.bold} color="#233255" size="17px"/>
                </div>
                <div style={{paddingLeft: '20px', paddingBottom: '20px'}}>
                    <PrimaryInput textColor="black" placeholderColor={colors.darkBlue} inputValue={triggerValue} setInputValue={setTriggerValue} width="88%"  borderRadius="15px" leftIconName='' fontWeight={fontWeights.normal} textFont={fonts.openSans} textSize="15px" backgroundColor={colors.white} borderColor={colors.lightlightGrey} placeholder="Write trigger option" height="20px"/>
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingBottom: '10px'}}>
                    <div className={styles.arrowDown}/>
                </div>
                
                <div style={{paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <PText text="Action" font={fonts.openSans} fontWeight={fontWeights.bold} color="#233255" size="17px"/>
                </div>
                <div style={{paddingLeft: '20px', paddingBottom: '20px', width: '100%'}}>
                    <SelectComponent setSelectedOption={setSelectedActionOption} options={actions} backgroundColor={colors.white} placeholder={(selectedActionOption.id !== '' && selectedActionOption.value !== '') ? selectedActionOption.value : "Select your action"} placeholderSize="15px" iconColor="#7C7C7C" borderColor={colors.lightlightGrey} borderWidth="1px" isOpenMenu={isOpenMenuAction} setIsOpenMenu={setIsOpenMenuAction} width="95%"/>
                </div>
                <div style={{paddingLeft: '20px', paddingTop: '15px', paddingBottom: '15px'}}>
                    <PText text="Action option" font={fonts.openSans} fontWeight={fontWeights.bold} color="#233255" size="17px"/>
                </div>
                <div style={{paddingLeft: '20px', paddingBottom: '20px'}}>
                    <PrimaryInput textColor="black" placeholderColor={colors.darkBlue} inputValue={actionValue} setInputValue={setActionValue} width="88%"  borderRadius="15px" leftIconName='' fontWeight={fontWeights.normal} textFont={fonts.openSans} textSize="15px" backgroundColor={colors.white} borderColor={colors.lightlightGrey} placeholder="Write your action option" height="20px"/>
                </div>
            </div>
            { areStatesNotEmpty() && (
                <div style={{position: 'fixed', bottom: 80, width: '100%', textAlign: 'center'}}>
                    <IconButton height="60px" buttonText='Save' width="90%" iconSrc='Plus' iconColor={colors.white} iconSize="30px" isIcon={true} isImage={false} backgroundColor={colors.darkPurple} textColor={colors.white} hoverBackgroundColor={colors.darkPurple} onPressButton={onSubmit} />
                </div>
            )}
            { isError && (
				<Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={'Error'} Content={'Error'} TextButton="Continue" />
			)}
            <BottomNavbar itemPosition={"Workspace"}/>
		</div>
	);
};

ActionReactionAutomate.propTypes = {
	id: PropTypes.string,
    automateName: PropTypes.string,
};

export default ActionReactionAutomate;
