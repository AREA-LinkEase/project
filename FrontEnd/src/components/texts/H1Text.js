import React from 'react';
import PropTypes from 'prop-types';
import { fontWeights } from '../../style/font/fontWeights';
import { fonts } from '../../style/font/fonts';

const H1Text = ({
                    text,
                    color = '#2A2B2D',
                    size = '45px',
                    font = fonts.poppins,
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

H1Text.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    fontWeight: PropTypes.number,
};

export default H1Text;
