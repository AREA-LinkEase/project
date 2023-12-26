import React from 'react';
import PropTypes from 'prop-types';

const BaseButton = ({
                        onPressButton,
                        onMouseOverButton,
                        onMouseOutButton,
                        borderColor,
                        backgroundColor,
                        borderRadius,
                        width,
                        height,
                        textFont,
                        textSize,
                        textColor,
                        buttonText,
                        transition,
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

BaseButton.propTypes = {
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
    textSize: PropTypes.string,
    textColor: PropTypes.string,
    buttonText: PropTypes.string,
    transition: PropTypes.string,
};

export default BaseButton;
