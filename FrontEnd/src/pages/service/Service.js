import PropTypes from "prop-types";
import * as Icon from 'react-feather';
import React, {useState} from "react";
import {colors} from "../../style/color";
import styles from "./Service.module.css";
import Header from "../../components/Header";
import H1Text from "../../components/texts/H1Text";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import SwitchButton from "../../components/switches/SwitchButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import adjustColorBrightness from "../../utils/adjustColorBrightness";
import TitleTextChildButton from "../../components/buttons/TitleTextChildButton";
import {useLocation, useNavigate} from "react-router-dom/dist";
import { getHeader } from "../../models/authUtils";

const Service = ({
    color = "gray",
    title = "Service",
    logo = "https://via.placeholder.com/71",
    description = "Description du service je suis la description du service et je raconte que fait ce service et aussi comment il peut ettre utilise dans linkease"
                 }) => {

    const location = useLocation();
    const { service } = location.state || {};
    const [showIcon, setShowIcon] = useState(true);
    const Settings = Icon['Settings'];
    const handleClick = () => {
        setShowIcon(!showIcon);
        try {
            console.log('ID', service.id)
            const token = getHeader().Authorization.split(' ')[1]
            window.open(`http://135.181.165.228:8080/services/connect/${service.id}/${token}`, "_blank")
        } catch (error) {
            console.error("Error fetching service:", error);
        }
    };

    const [BoxAccessValue, setBoxAccessValue] = useState("All");
    const [boxList] = useState([{
        name: 'Workspace for musique',
        creator: 'Non',
        people: 35,
        color: colors.lightPurple,
        access: "Workspace"
    },
    {
        name: 'Automate TaylorSwift',
        creator: 'Simon',
        people: 2,
        color: colors.darkGrey,
        access: "Automate"
    },
    {
        name: 'Automate Pause musique',
        creator: 'User1',
        people: 1,
        color: colors.lightPurple,
        access: "Automate"
    }]);

    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate("/search");
    }

    const handleClickServiceSetting = (item) => {
        navigate("/serviceSetting", {
            state: {
              service: item
            }
          })
    }
  return (
    <div>
        <div style={{
            background: color,
            height: "318px",
            position: 'fixed',
            zIndex: 2000, top: '0',
            width: '100%'
        }}>

            <div className={styles.serviceBackground}>
                <div style={{height: '100px', position: "fixed", top: '20px', width: "100%", zIndex:"100"}}>
                    <Header rightIconName={(showIcon)? "Settings" : ""}  rightIconColor={colors.white} rightIconSize={"24px"} onClickIconRight={() => {handleClickServiceSetting(service)}} backgroundColor={color} leftIconColor={colors.white} onClickIconLeft={handleClickBack}/>
                </div>
                <img src={service.imgLink} alt="logo" style={{zIndex: "101", width: '100px', height: '100px'}}/>
                <H1Text text={service.title} size={"24px"}/>
                <p className={styles.serviceDescription}>{service.description}</p>
                <PrimaryButton
                    buttonText={"Connect"}
                    textSize={"15px"}
                    backgroundColor={service.color}
                    hoverBackgroundColor={"#CFCFCF"}
                    width={"35%"} height={"42px"}
                    borderColor={"gray"}
                    textColor={"black"}
                    onPressButton={handleClick}
                />
            </div>
        </div>
        <div className={styles.serviceFilter}>
            <Header isFilter={true}
                    filterListTag={["All", "Workspace", "Automate"]}
                    filterSelected={BoxAccessValue}
                    setFilterSelected={setBoxAccessValue}
            />
        </div>
            <div
                className={styles.serviceContainer}
                style={{ marginTop: '85px', paddingTop: '295px'}}
            >
                {boxList.length !== 0 ? (
                    <div className={styles.serviceList}>
                        {boxList
                            .filter(
                                (box) =>
                                    BoxAccessValue === "All" ||
                                    box.access
                                        .toLowerCase()
                                        .includes(BoxAccessValue.toLowerCase())
                            )
                            .map((box, index, filteredList) => (
                                <div
                                    key={index}
                                    style={{
                                        paddingBottom:
                                            index === filteredList.length - 1 ? '90px' : '15px',
                                    }}
                                >
                                    <TitleTextChildButton
                                        title={box.name}
                                        text={`Par **${box.creator}**`}
                                        isSelectable={false}
                                        componentId={index}
                                        isClickable={true}
                                        backgroundColor={box.access === 'Public' ? box.color : '#777777'}
                                        borderColor={box.access === 'Public' ? box.color : '#777777'}
                                        width="90%"
                                        ComponentChildren={() => (
                                            <SwitchButton
                                                textColorOff={colors.white}
                                                backgroundColorOn={adjustColorBrightness(box.color, -50)}
                                                colorOn={box.color}
                                                textColorOn={colors.white}
                                                isOn={box.access!=="Private"}
                                                isLittle={true}
                                                width="120px"
                                                height="20px"
                                            />
                                        )}
                                    />
                                </div>
                            ))}
                    </div>
                ) : null}
            </div>
        <BottomNavbar />
    </div>
  );
}

Service.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    logo: PropTypes.string,
    description: PropTypes.string
}

export default Service;