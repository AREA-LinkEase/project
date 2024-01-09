import React, { useRef, useEffect } from "react";
import styles from "./Popup.module.css";
import PropTypes from "prop-types";
import PrimaryButton from "../buttons/PrimaryButton";
import H1Text from "../texts/H1Text";
import PText from "../texts/PText";
import { colors } from "../../style/color";

const Popup = ({ Title = "Title", Content = "Content", TextButton = "TextButton", onPress, leavePopup }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        leavePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [leavePopup]);

  return (
    <div className={styles.popupBody}>
      <div className={styles.popupOverlay}/>
      <div className={styles.popupContent} ref={popupRef}>
        <H1Text text={Title} size={"28px"} color={"#2A2B2D"} />
        <div className={styles.popupText}>
          <PText text={Content} size={"14px"} color={colors.black} />
        </div>
        <div className={styles.popupButton}>
          <PrimaryButton buttonText={TextButton} width={"300%"} textSize={"80%"} height={"47px"} onPressButton={onPress} />
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  Title: PropTypes.string,
  Content: PropTypes.string,
  TextButton: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  leavePopup: PropTypes.func.isRequired,
};

export default Popup;
