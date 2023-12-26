import React, { useEffect, useState } from "react";
import styles from './AccueilPage.module.css';
import H1Text from "../../components/texts/H1Text";
import PText from "../../components/texts/PText";
import { texts } from "../../textValues/textLists";
import parseTextWithLineBreaks from "../../utils/parseTextWithLineBreaks";
import { colors } from "../../style/color";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import {useNavigate} from "react-router-dom";
import { getWorkspaces } from "../../models/workspaces";
import Popup from "../../components/popup/Popup";

const AccueilPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    const handleItemClick = () => {
        navigate('/create');
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getWorkspaces();
          if (response.status === 200) {
            setWorkspaces(response.content.result);
          } else {
            setIsError(true);
          }
        } catch (error) {
            console.error("Error fetching workspaces:", error);
        }
      };

      fetchData();
    }, []);

    const handleClickButttonPopup = () => {
      setIsError(false);
    };

    const handleClosePopup = () => {
        setIsError(false);
    };

    if (workspaces.length === 0) {
      return (
          <div className={styles.accueilBody}>
            <div className={styles.accueilH1Text}>
                <H1Text text="Let's go !" color={colors.lightlightGrey}/>
            </div>
            <div className={styles.accueilCenterDiv}>
              <div className={styles.accueilPText}>
                  <PText text={parseTextWithLineBreaks(texts.travailQuotidien)} color={colors.lightlightGrey}/>
              </div>
                <PrimaryButton buttonText='Create' width='90%' height='65px' onPressButton={handleItemClick}/>
            </div>
            <div>
              <BottomNavbar itemPosition={'Workspace'} isPopupVisible={isError}/>
            </div>
            { isError && (
              <Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={'Error'} Content={'Error'} TextButton="Continue" />
            )}
          </div>
        );
    } else {
      navigate('/homeWorkspace');
    }

};

export default AccueilPage;