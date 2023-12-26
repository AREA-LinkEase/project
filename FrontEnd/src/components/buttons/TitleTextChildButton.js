import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../style/color';
import adjustColorBrightness from '../../utils/adjustColorBrightness';
import { fontWeights } from '../../style/font/fontWeights';
import * as Icon from 'react-feather';
import { formatTextBold } from '../../utils/formatTextBold.js';

const TitleTextChildButton = ({
                                  componentId,
                                  backgroundColor = '#1DB954',
                                  hoverBackgroundColor = adjustColorBrightness(backgroundColor, 20),
                                  borderColor = '#1DB954',
                                  borderRadius = '15px',
                                  width = '361px',
                                  height = '129px',
                                  title = 'Nom du Workspace',
                                  titleFont = 'Arial, sans-serif',
                                  titleSize = '24px',
                                  titleColor = colors.white,
                                  titleWeight = fontWeights.bold,
                                  text = 'par **Nom du createur**',
                                  textFont = 'Arial, sans-serif',
                                  textSize = '15px',
                                  textColor = colors.white,
                                  textWeight = fontWeights.normal,
                                  iconName = '',
                                  isClickable,
                                  isSelectable,
                                  handleSelect,
                                  iconSize = '25px',
                                  iconColor = colors.white,
                                  paddingBottomFirst = '15px',
                                  paddingBottomSecond = '15px',
                                  paddingRightIcon = '20px',
                                  onPressButton = () => console.log('TitleText Button clicked'),
                                  onMouseOverButton = (e) => {
                                      e.currentTarget.style.backgroundColor = hoverBackgroundColor;
                                      if (!isSelectable)
                                          e.currentTarget.style.borderColor = hoverBackgroundColor;
                                  },
                                  onMouseOutButton = (e) => {
                                      e.currentTarget.style.backgroundColor = backgroundColor;
                                      if (!isSelectable)
                                          e.currentTarget.style.borderColor = backgroundColor;
                                  },
                                  ComponentChildren,
                              }) => {
    const IconLogo = iconName ? Icon[iconName] : null;
    const SelectLogo = Icon["Check"];
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (isClickable) {
            onPressButton();
        }

        if (isSelectable) {
            setIsSelected((prevSelected) => !prevSelected);
            handleSelect(componentId);
        }
    };

    return (
        <div>
            <div
                onClick={handleClick}
                onMouseOver={onMouseOverButton}
                onMouseOut={onMouseOutButton}
                style={{
                    backgroundColor,
                    borderRadius,
                    border: `2px solid ${isSelected ? colors.darkPurple : borderColor}`,
                    cursor: 'pointer',
                    width,
                    height,
                    display: 'inline-block',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    paddingTop: '15px',
                    paddingLeft: '15px',
                    transition: 'background-color 0.3s',
                    paddingRight: '2px',
                    position: 'relative',
                }}
            >
                {isSelected && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '-7px',
                            left: '-7px',
                            borderRadius: '50%',
                            backgroundColor: colors.darkPurple,
                            padding: '2px',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ paddingTop: '4px' }}>
                            {React.createElement(SelectLogo, {
                                size: '20px',
                                color: colors.white,
                            })}
                        </div>
                    </div>
                )}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        overflow: 'auto',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingBottom: paddingBottomFirst,
                        }}
                    >
                        <div>
              <span
                  style={{
                      color: titleColor,
                      fontFamily: titleFont,
                      fontSize: titleSize,
                      fontWeight: titleWeight,
                      textAlign: 'left',
                  }}
              >
                {title}
              </span>
                        </div>
                        {IconLogo && (
                            <div style={{ paddingRight: paddingRightIcon }}>
                                {React.createElement(IconLogo, {
                                    size: iconSize,
                                    color: iconColor,
                                })}
                            </div>
                        )}
                    </div>
                    <div>
            <span
                style={{
                    color: textColor,
                    fontFamily: textFont,
                    fontSize: textSize,
                    fontWeight: textWeight,
                    textAlign: 'left',
                }}
            >
              {formatTextBold(text)}
            </span>
                    </div>
                    {ComponentChildren && (
                        <div style={{ paddingTop: paddingBottomSecond }}>
                            <ComponentChildren />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Déclarez les PropTypes pour chaque propriété
TitleTextChildButton.propTypes = {
    componentId: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    hoverBackgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    title: PropTypes.string,
    titleFont: PropTypes.string,
    titleSize: PropTypes.string,
    titleColor: PropTypes.string,
    titleWeight: PropTypes.string,
    text: PropTypes.string,
    textFont: PropTypes.string,
    textSize: PropTypes.string,
    textColor: PropTypes.string,
    textWeight: PropTypes.string,
    iconName: PropTypes.string,
    isClickable: PropTypes.bool,
    isSelectable: PropTypes.bool,
    handleSelect: PropTypes.func,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    paddingBottomFirst: PropTypes.string,
    paddingBottomSecond: PropTypes.string,
    paddingRightIcon: PropTypes.string,
    onPressButton: PropTypes.func,
    onMouseOverButton: PropTypes.func,
    onMouseOutButton: PropTypes.func,
    ComponentChildren: PropTypes.elementType,
};

export default TitleTextChildButton;
