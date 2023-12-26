import React from 'react';
import PropTypes from 'prop-types';
import { fontWeights } from '../../style/font/fontWeights';
import { fonts } from '../../style/font/fonts';

const PText = ({
                   text,
                   color = 'black',
                   size = '20px',
                   font = fonts.avenirNextLTProRegular,
                   fontWeight = fontWeights.regular,
                   lineHeight = 'normal',
                   textAlign = false,
                   width = '',
               }) => {

    return (
        <div style={{textAlign: textAlign ? 'center' : '', width: width}}>
            <span style={{ color, fontSize: size, fontFamily: font, fontWeight, lineHeight }}>
                {text}
            </span>
        </div>
    );
};

PText.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    fontWeight: PropTypes.string,
    lineHeight: PropTypes.string,
    textAlign: PropTypes.bool,
    width: PropTypes.string,
};

export default PText;
