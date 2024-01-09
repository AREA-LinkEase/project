import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./RegisterPage.css";
import Header from "../../components/Header";
import H1Text from "../../components/texts/H1Text";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/isValidEmail";
import Popup from "../../components/popup/Popup";
import { register } from "../../models/users";

const RegisterPage = ({
  Title = "Quel est ton email ?",
  InputPlaceholder: initialInputPlaceholder = "No place holder",
  leftIconSrc: initialLeftIconSrc = "",
  rightIconSrcOn: initialRightIconSrcOn = "",
  rightIconSrcOff: initialRightIconSrcOff = "",
  ButtonText: initialButtonText = "no text",
  inputType: initialInputType = "password",
  titleColor = "#2A2B2D",
  type = "email",
}) => {
    const [inputValue, setInputValue] = useState("");
    const [isActive, setIsActive] = useState(initialInputType !== "password");
    const [title, setTitle] = useState(Title);
    const [inputPlaceholder, setInputPlaceholder] = useState(initialInputPlaceholder);
    const [leftIconSrc, setLeftIconSrc] = useState(initialLeftIconSrc);
    const [rightIconSrcOn, setRightIconSrcOn] = useState(initialRightIconSrcOn);
    const [rightIconSrcOff, setRightIconSrcOff] = useState(initialRightIconSrcOff);
    const [buttonText, setButtonText] = useState(initialButtonText);
    const [inputType, setInputType] = useState(initialInputType);
    const [typeValue, setTypeValue] = useState(type);
    const [isError, setIsError] = useState(false);
    const [errorInfo, setErrorInfo] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.title)
            setTitle(location.state.title);
        if (location.state && location.state.inputPlaceholder)
            setInputPlaceholder(location.state.inputPlaceholder);
        if (location.state && location.state.type)
            setTypeValue(location.state.type);
        if (location.state && location.state.inputType) {
            setIsActive(true);
            setInputType(location.state.inputType);
        }
        if (location.state && location.state.leftIconSrc)
            setLeftIconSrc(location.state.leftIconSrc);
        if (location.state && location.state.inputPlaceholder)
            setInputPlaceholder(location.state.inputPlaceholder);
    }, [location.state]);

    const onPressRightIcon = (value) => {
        setIsActive(!value);
    };

    const handleClickButttonPopup = () => {
        setErrorInfo('');
        setIsError(false);
    };

    const handleClosePopup = () => {
        setErrorInfo('');
        setIsError(false);
    };

    const rightIconName = isActive ? "isActiveIcon" : "isActiveIcon";

    const handleClickButton = async () => {
        if (typeValue === "email") {
            setEmail(inputValue);

            if (!isValidEmail(inputValue)) {
                setIsError(true);
                return;
            }
            setInputValue('');
            navigate("/register", {
            state: {
                title: "Create a username",
                type: 'username',
                inputType: 'text',
                inputPlaceholder: 'Username',
            },
        });
        } else if (typeValue === "username") {
            setUsername(inputValue);
            setInputValue('');
            navigate("/register", {
                state: {
                    title: "Create a password",
                    type: 'password',
                    inputType: 'password',
                    leftIconSrc: 'Lock',
                    inputPlaceholder: 'Password',
                },
            });
        } else {
            setPassword(inputValue);
            setInputValue('');
            const response = await register(username, email, password);
            console.log(response);
            if (response.status === 201) {
                navigate("/login", {
                    state: {
                        isNew: true,
                    },
                });
            } else if (response.status === 409) {
                setIsError(true);
                setErrorInfo('already exist');
            } else {
                setIsError(true);
                setErrorInfo('unknown');
            }
        }
    };

    const handleReturnButton = () => {
        if (typeValue === "email") {
            setEmail('');
            setInputValue('');
            navigate("/login");
        } else if (typeValue === "username") {
            setUsername('');
            setInputValue('');
            navigate("/register", {
                state: {
                    title: "What is your Email ?",
                    type: 'email',
                    leftIconSrc: 'User',
                    inputType: 'email',
                    inputPlaceholder: 'Email',
                },
            });
        } else {
            setPassword('');
            setInputValue('');
            navigate("/register", {
                state: {
                    title: "Create a username",
                    type: 'username',
                    leftIconSrc: 'User',
                    inputType: 'text',
                    inputPlaceholder: 'Username',
                },
            });
        }
    };

    return (
    <div className={"registerPageBody"}>
        <Header rightIconName={""} onClickIconLeft={handleReturnButton} />
        <div className={"registerTitle"}>
        <H1Text
            text={title}
            fontWeight={"550"}
            size={"38px"}
            color={titleColor}
        />
        </div>
        <div className={"registerInput"}>
        <PrimaryInput
            rightIconName={rightIconName}
            inputType={inputType}
            isRightIconIsActive={isActive}
            onPressRightIcon={onPressRightIcon}
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeholder={inputPlaceholder}
            leftIconName={leftIconSrc}
        />
        </div>
        <div className={"registerButton"}>
        <PrimaryButton
            onPressButton={handleClickButton}
            buttonText={buttonText}
            width={"90%"}
        />
        </div>
        { (isError && errorInfo !== '') && (
            <Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={`An error occured.`} Content={errorInfo === "already exist" ? "This user already exist." : "An unexpected error has occurred."} TextButton="Continue" />
        )}
        { (isError && errorInfo === '') && (
            <Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={`An error occured.`} Content={typeValue === "email" ? "Content of email is wrong." : "Content of password is wrong."} TextButton="Continue" />
        )}
    </div>
    );
};

RegisterPage.propTypes = {
    Title: PropTypes.string,
    InputPlaceholder: PropTypes.string,
    leftIconSrc: PropTypes.string,
    ButtonText: PropTypes.string,
    rightIconSrcOn: PropTypes.string,
    rightIconSrcOff: PropTypes.string,
    inputType: PropTypes.string,
    titleColor: PropTypes.string,
    type: PropTypes.string,
    emailValue: PropTypes.string,
    passwordValue: PropTypes.string,
};

export default RegisterPage;
