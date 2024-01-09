import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../style/color';
import { fontWeights } from '../../style/font/fontWeights';
import { fonts } from '../../style/font/fonts';

const SwitchButton = ({
                          backgroundColorOn = colors.lightlightGrey,
                          backgroundColorOff = colors.darkdarkGrey,
                          isIndicator = true,
                          width = '327px',
                          height = '64px',
                          borderRadius = '90px',
                          isOn = false,
                          colorOff = colors.grey,
                          colorOn = colors.purple,
                          textOn = 'Disable',
                          textOff = 'Enable',
                          textFont = fonts.openSans,
                          textWeight = fontWeights.bold,
                          textColorOff = colors.white,
                          textColorOn = colors.lightBlack,
                          isLittle,
                          toggleSwitch,
                          textSizeMax = '55px',
                      }) => {
    const [isSwitched, setIsSwitched] = useState(isOn);
    const [textSize, setTextSize] = useState(0);
    const [buttonWidth, setButtonWidth] = useState(0);
    const [buttonHeight, setButtonHeight] = useState(0);

    useEffect(() => {
        const containerWidth = parseInt(width, 10);
        const containerHeight = parseInt(height, 10);
        const maxFontSize = extractNumberFromString(textSizeMax);

        const calculatedTextSize = containerWidth * (isLittle ? 0.12 : 0.1);
        if (calculatedTextSize > maxFontSize) {
            setTextSize(maxFontSize);
        }
        else
            setTextSize(calculatedTextSize);

        const calculatedButtonWidth = (containerWidth * (isLittle ? 0.19 : 0.35)) / containerWidth * 100;
        setButtonWidth(calculatedButtonWidth);

        const calculatedButtonHeight = (containerHeight * (isLittle ? 0.19 : 0.35)) / containerHeight * 100;
        setButtonHeight(calculatedButtonHeight);
    }, [width, height, isLittle]);


    const toggleSwitchInternal = (e) => {
        e.stopPropagation();
        setIsSwitched((prevSwitched) => !prevSwitched);
        toggleSwitch();
      };
    
    function extractNumberFromString(str) {
        const match = str.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
    }

    return (
        <div
            style={{
                position: 'relative',
                width: width,
                height: height,
                backgroundColor: isSwitched ? backgroundColorOn : backgroundColorOff,
                borderRadius: borderRadius,
                cursor: 'pointer',
                paddingTop: '12px',
                paddingBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'background-color 0.4s ease',
                scrollBehavior: 'smooth',
            }}
            onClick={isIndicator ? () => {} : toggleSwitchInternal}
        >
      <span
          style={{
              color: isSwitched ? textColorOn : textColorOff,
              fontFamily: textFont,
              fontSize: `${textSize}px`,
              fontWeight: textWeight,
          }}
      >
        {isSwitched ? textOn : textOff}
      </span>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: isSwitched ? `calc(100% - ${buttonWidth - 7}px)` : `${buttonWidth - 7}px`,
                    transform: 'translate(-50%, -50%)',
                    width: `${buttonWidth}px`,
                    height: `${buttonHeight}px`,
                    borderRadius: '50%',
                    backgroundColor: isSwitched ? colorOn : colorOff,
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)',
                    transition: 'left 0.3s ease, background-color 0.3s ease',
                }}
            />
        </div>
    );
};

SwitchButton.propTypes = {
    backgroundColorOn: PropTypes.string,
    backgroundColorOff: PropTypes.string,
    isIndicator: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    isOn: PropTypes.bool,
    colorOff: PropTypes.string,
    colorOn: PropTypes.string,
    textOn: PropTypes.string,
    textOff: PropTypes.string,
    textFont: PropTypes.string,
    textWeight: PropTypes.string,
    textColorOff: PropTypes.string,
    textColorOn: PropTypes.string,
    isLittle: PropTypes.bool,
    toggleSwitch: PropTypes.func,
    textSizeMax: PropTypes.string,
};

export default SwitchButton;
