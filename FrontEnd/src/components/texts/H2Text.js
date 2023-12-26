import React from 'react';
import PropTypes from 'prop-types';
import { fontWeights } from '../../style/font/fontWeights';

const H2Text = ({
                    text,
                    color = 'black',
                    size = '50px',
                    font = 'Arial, sans-serif',
                    fontWeight = fontWeights.semiBold,
                }) => {

    return (
        <div>
      <span style={{ color, fontSize: size, fontFamily: font, fontWeight }}>
        {text}
      </span>
        </div>
    );
};

H2Text.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    fontWeight: PropTypes.string,
};

export default H2Text;
