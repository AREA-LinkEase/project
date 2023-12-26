import React from 'react';
import PropTypes from 'prop-types';
import { fontWeights } from '../../style/font/fontWeights';

const H3Text = ({
                    text,
                    color = 'black',
                    size = '40px',
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

H3Text.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    fontWeight: PropTypes.string,
};

export default H3Text;
