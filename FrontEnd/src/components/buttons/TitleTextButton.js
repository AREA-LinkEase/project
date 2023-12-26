import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../style/color';
import adjustColorBrightness from '../../utils/adjustColorBrightness';
import { fontWeights } from '../../style/font/fontWeights';
import * as Icon from 'react-feather';
import { svgs } from '../../style/svgs/svgList';

const TitleTextButton = ({
                             backgroundColor = '#1DB954',
                             hoverBackgroundColor = adjustColorBrightness(backgroundColor, 20),
                             borderColor = '#1DB954',
                             borderRadius = '15px',
                             width = '361px',
                             height = '129px',
                             title = 'New saved album',
                             titleFont = 'Arial, sans-serif',
                             titleSize = '24px',
                             titleColor = colors.white,
                             titleWeight = fontWeights.bold,
                             text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                             textFont = 'Arial, sans-serif',
                             textSize = '15px',
                             textColor = colors.white,
                             textWeight = fontWeights.normal,
                             iconName = 'ChevronRight',
                             iconSize = '25px',
                             iconColor = colors.white,
                             paddingRightIcon = '20px',
                             onPressButton = () => console.log('TitleText Button clicked'),
                             onMouseOverButton = (e) => {
                                 e.currentTarget.style.backgroundColor = hoverBackgroundColor;
                                 e.currentTarget.style.borderColor = hoverBackgroundColor;
                             },
                             onMouseOutButton = (e) => {
                                 e.currentTarget.style.backgroundColor = backgroundColor;
                                 e.currentTarget.style.borderColor = backgroundColor;
                             },
                         }) => {
    const IconLogo = iconName ? Icon[iconName] : null;

    return (
        <div>
            <div
                onClick={onPressButton}
                onMouseOver={onMouseOverButton}
                onMouseOut={onMouseOutButton}
                style={{
                    backgroundColor,
                    borderRadius,
                    border: `1px solid ${borderColor}`,
                    cursor: 'pointer',
                    width,
                    height,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingTop: '15px',
                    paddingLeft: '15px',
                    transition: 'background-color 0.3s',
                    paddingRight: '2px',
                }}
            >
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
                            paddingBottom: '10px',
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
              {text}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

TitleTextButton.propTypes = {
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
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    paddingRightIcon: PropTypes.string,
    onPressButton: PropTypes.func,
    onMouseOverButton: PropTypes.func,
    onMouseOutButton: PropTypes.func,
};

export default TitleTextButton;
