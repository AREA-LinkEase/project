import React from 'react';
import PropTypes from 'prop-types';
import { fontWeights } from '../../style/font/fontWeights';

const BasicText = ({
                       text,
                       color,
                       size,
                       font,
                       fontWeight = fontWeights.bold,
                   }) => {

    return (
        <div>
      <span style={{ color, fontSize: size, fontFamily: font, fontWeight }}>
        {text}
      </span>
        </div>
    );
};

BasicText.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    fontWeight: PropTypes.string,
};

export default BasicText;
