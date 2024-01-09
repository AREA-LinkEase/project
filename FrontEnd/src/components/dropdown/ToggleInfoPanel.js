import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../style/color';
import * as Icon from 'react-feather';
import { formatTextBold } from '../../utils/formatTextBold';

const ToggleInfoPanel = ({
                             isOpenMenu,
                             setIsOpenMenu,
                             backgroundColor = colors.lightGrey,
                             borderRadius = '15px',
                             borderColor = colors.lightGrey,
                             placeholder = "Condition d'utilisation",
                             placeholderColor = colors.darkGrey,
                             placeholderSize = '20px',
                             placeholderFont = 'Arial, sans-serif',
                             interiorText,
                             interiorTextColor = colors.black,
                             interiorTextSize = '15px',
                             interiorTextFont = 'Arial, sans-serif',
                             iconName1 = 'ChevronDown',
                             iconName2 = 'ChevronUp',
                             iconSize = '24px',
                             iconColor = colors.black,
                             width = '351px',
                             minHeight = '61px',
                             maxHeight = '200px'
                         }) => {
    const IconComponent1 = iconName1 ? Icon[iconName1] : null;
    const IconComponent2 = iconName2 ? Icon[iconName2] : null;

    return (
        <div
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderRadius: borderRadius,
                width: width,
                height: isOpenMenu ? maxHeight : minHeight,
                cursor: 'pointer',
                paddingLeft: '15px',
                paddingRight: '15px',
                transition: 'height 0.3s ease-in-out'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '17px',
                    paddingBottom: '10px',
                }}
            >
        <span
            style={{
                color: placeholderColor,
                fontFamily: placeholderFont,
                fontSize: placeholderSize,
            }}
        >
          {placeholder}
        </span>
                {isOpenMenu ? (
                    <div style={{ marginBottom: '-4px' }}>
                        {React.createElement(IconComponent1, {
                            size: iconSize,
                            color: iconColor,
                        })}
                    </div>
                ) : (
                    <div style={{ marginBottom: '-4px' }}>
                        {React.createElement(IconComponent2, {
                            size: iconSize,
                            color: iconColor,
                        })}
                    </div>
                )}
            </div>
            {isOpenMenu && (
                <div
                    style={{
                        overflow: 'auto',
                        whiteSpace: 'pre-line',
                        paddingBottom: '15px',
                        transition: 'height 0.3s ease-in-out'
                    }}
                >
          <span
              style={{
                  color: interiorTextColor,
                  fontSize: interiorTextSize,
                  fontFamily: interiorTextFont,
              }}
          >
            {formatTextBold(interiorText)}
          </span>
                </div>
            )}
        </div>
    );
};

ToggleInfoPanel.propTypes = {
    isOpenMenu: PropTypes.bool.isRequired,
    setIsOpenMenu: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.string,
    borderColor: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    placeholderSize: PropTypes.string,
    placeholderFont: PropTypes.string,
    interiorText: PropTypes.string,
    interiorTextColor: PropTypes.string,
    interiorTextSize: PropTypes.string,
    interiorTextFont: PropTypes.string,
    iconName1: PropTypes.string,
    iconName2: PropTypes.string,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    width: PropTypes.string,
    minHeight: PropTypes.string,
    maxHeight: PropTypes.string,
};

export default ToggleInfoPanel;
