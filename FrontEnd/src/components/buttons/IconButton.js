import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import SvgIcon from '../SvgIcon';
import { svgs } from '../../style/svgs/svgList';
import { colors } from '../../style/color';
import { fonts } from '../../style/font/fonts';
import { fontWeights } from '../../style/font/fontWeights';

const IconButton = ({
    isIcon = false,
    isImage = true,
    iconSize = '25px',
    iconColor = colors.darkBlue,
    iconSrc = svgs.google,
    borderColor = 'black',
    backgroundColor = 'white',
    hoverBackgroundColor = 'lightGrey',
    borderRadius = '90px',
    width = '361px',
    height = '60px',
    textFont = fonts.openSans,
    fontWeight = fontWeights.bold,
    textSize = '20px',
    textColor = 'black',
    buttonText = 'Google',
    paddingLeftIcon = '12px',
    alignLeft = false,
    paddingLeftText = '50px',
    rightIconName = '',
    rightIconSize = '25px',
    isButtonClickable = true,
    isRightIconClickable = false,
    rightIconColor = colors.black,
    marginBottomLeftIcon = '0px',
    transition = 'background-color 0.3s',
    onPressButton = () => console.log('Left icon Button clicked'),
    onMouseOverButton = (e) => {
        e.currentTarget.style.backgroundColor = hoverBackgroundColor;
    },
    onMouseOutButton = (e) => {
        e.currentTarget.style.backgroundColor = backgroundColor;
    },
    onPressRightIcon = () => console.log('Right icon clicked'),
}) => {
    const IconLogo = isIcon && iconSrc ? Icon[iconSrc] : null;
    const IconRightLogo = rightIconName !== '' ? Icon[rightIconName] : null;

    return (
        <button
            onClick={isButtonClickable ? onPressButton : () => {}}
            onMouseOver={onMouseOverButton}
            onMouseOut={onMouseOutButton}
            style={{
                margin: 'auto',
                alignItems: 'center',
                border: `0px solid ${borderColor}`,
                backgroundColor,
                display: 'flex',
                flexDirection: 'row',
                borderRadius,
                cursor: isButtonClickable ? 'pointer' : '',
                fontFamily: textFont,
                fontSize: textSize,
                color: textColor,
                fontWeight,
                textAlign: alignLeft ? 'left' : 'center',
                width,
                height,
                transition,
                position: 'relative',
            }}
        >
            {IconLogo && (
                <div style={{ paddingLeft: paddingLeftIcon,  marginBottom: marginBottomLeftIcon, position: 'absolute' }}>
                    {React.createElement(IconLogo, {
                        size: iconSize,
                        color: iconColor,
                    })}
                </div>
            )}
            {isImage && iconSrc && (
                <div style={{ paddingLeft: paddingLeftIcon, marginBottom: marginBottomLeftIcon, position: 'absolute' }}>
                    <SvgIcon svgName={iconSrc} />
                </div>
            )}
            <div style={{display: 'flex', width: '100%', justifyContent: alignLeft ? '' : 'center'}}>
                <span style={{ paddingLeft: alignLeft ? paddingLeftText : '0px'}}>{buttonText}</span>
            </div>
            {rightIconName !== '' && (
                <div
                    onClick={isRightIconClickable ? onPressRightIcon : () => {}}
                    style={{ paddingLeft: paddingLeftIcon, marginLeft: 'auto', paddingRight: '12px', cursor: isRightIconClickable ? 'pointer' : ''}}>
                    {React.createElement(IconRightLogo, {
                        size: rightIconSize,
                        color: rightIconColor,
                    })}
                </div>
            )}
        </button>
    );
};

IconButton.propTypes = {
    isIcon: PropTypes.bool,
    isImage: PropTypes.bool,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    iconSrc: PropTypes.string,
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
    paddingLeftIcon: PropTypes.string,
    alignLeft: PropTypes.bool,
    paddingLeftText: PropTypes.string,
    transition: PropTypes.string,
    onPressButton: PropTypes.func,
    onMouseOverButton: PropTypes.func,
    onMouseOutButton: PropTypes.func,
    rightIconName: PropTypes.string,
    rightIconColor: PropTypes.string,
    rightIconSize: PropTypes.string,
    onPressRightIcon: PropTypes.func,
    isButtonClickable: PropTypes.bool,
    isRightIconClickable: PropTypes.bool,
    marginBottomLeftIcon: PropTypes.string,
};

export default IconButton;
