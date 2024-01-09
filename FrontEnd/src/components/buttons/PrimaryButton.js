import React from 'react';
import adjustColorBrightness from '../../utils/adjustColorBrightness';
import { colors } from '../../style/color';
import { fonts } from '../../style/font/fonts';
import { fontWeights } from '../../style/font/fontWeights';
import PropTypes from "prop-types";

const PrimaryButton = ({
                           onMouseOverButton = (e) => {
                               e.target.style.backgroundColor = hoverBackgroundColor;
                           },
                           onMouseOutButton = (e) => {
                               e.target.style.backgroundColor = backgroundColor;
                           },
                           borderColor = colors.darkPurple,
                           backgroundColor = colors.darkPurple,
                           hoverBackgroundColor = adjustColorBrightness(colors.darkPurple, 20),
                           onPressButton = () => console.log('Primary Button clicked'),
                           borderRadius = '90px',
                           width = '361px',
                           height = '60px',
                           textFont = fonts.openSans,
                           fontWeight = fontWeights.bold,
                           textSize = '20px',
                           textColor = 'white',
                           buttonText = 'Primary',
                           transition = 'background-color 0.3s',
                       }) => {
    return (
        <button
            onClick={onPressButton}
            onMouseOver={onMouseOverButton}
            onMouseOut={onMouseOutButton}
            style={{
                border: `1px solid ${borderColor}`,
                backgroundColor,
                borderRadius,
                cursor: 'pointer',
                fontFamily: textFont,
                fontSize: textSize,
                color: textColor,
                fontWeight,
                textAlign: 'center',
                width,
                height,
                transition,
            }}
        >
            {buttonText}
        </button>
    );
};

PrimaryButton.propTypes = {
    onPressButton: PropTypes.func,
    onMouseOverButton: PropTypes.func,
    onMouseOutButton: PropTypes.func,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    hoverBackgroundColor: PropTypes.string,
    borderRadius: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    textFont: PropTypes.string,
    fontWeight: PropTypes.string,
    textSize: PropTypes.string,
    textColor: PropTypes.string,
    buttonText: PropTypes.string,
    transition: PropTypes.string,
};


export default PrimaryButton;
