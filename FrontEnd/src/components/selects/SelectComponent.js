import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../style/color';
import * as Icon from 'react-feather';
import { fonts } from '../../style/font/fonts';
import PrimaryInput from '../Inputs/PrimaryInput';
import { fontWeights } from '../../style/font/fontWeights';
import PText from '../texts/PText';
import adjustColorBrightness from '../../utils/adjustColorBrightness';

const SelectComponent = ({
  isOpenMenu,
  setIsOpenMenu,
  backgroundColor = colors.lightGrey,
  borderRadius = '15px',
  borderColor = colors.lightGrey,
  borderWidth = '0px',
  placeholder = "Condition d'utilisation",
  placeholderColor = colors.darkGrey,
  placeholderSize = '20px',
  placeholderFont = fonts.openSans,
  iconName1 = 'ChevronDown',
  iconName2 = 'ChevronUp',
  iconSize = '24px',
  iconColor = colors.black,
  width = '351px',
  minHeight = '61px',
  maxHeight = '300px',
  options,
  setSelectedOption,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  const IconComponent1 = iconName1 ? Icon[iconName1] : null;
  const IconComponent2 = iconName2 ? Icon[iconName2] : null;

  return (
    <div>
      <div
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: `${borderWidth} solid ${borderColor}`,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          width: width,
          height: minHeight,
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
              fontWeight: fontWeights.normal
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
      </div>
      {isOpenMenu && (
        <div style={{
          position: 'absolute',
          width: width,
          paddingTop: '10px',
          zIndex: 20,
        }}>
          <div
            style={{
              display: 'flex',
              height: 'auto',
              maxHeight: maxHeight,
              flexDirection: 'column',
              border: `0px solid white`,
              backgroundColor: backgroundColor,
              borderRadius: borderRadius,
              width: width,
              boxShadow: '3px 15px 10px 5px rgba(0, 0, 0, 0.1)',
              overflowY: 'auto',
              transition: 'height 0.3s ease-in-out'
            }}
          >
            <div style={{ paddingTop: '15px', paddingBottom: '15px', textAlign: 'center' }}>
              <PrimaryInput
                leftIconName='Search'
                borderRadius='5px'
                placeholder='Search...'
                fontWeight={fontWeights.bold}
                borderColor='#D2D2D2'
                textSize='12px'
                inputValue={searchValue}
                backgroundColor={colors.white}
                setInputValue={setSearchValue}
                width="80%"
                height='14px'
                leftIconSize='16px'
                leftIconColor={colors.lightlightGrey}
              />
            </div>
            <div>
              {options
                .filter((option) => option.value.toLowerCase().includes(searchValue.toLowerCase()))
                .map((option) => {
                const isHovered = hoveredItem === option.id;
                const itemBackgroundColor = isHovered
                  ? adjustColorBrightness(colors.lightlightGrey, 40)
                  : colors.white;

                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      setSelectedOption({id: option.id, value: option.value});
                      setIsOpenMenu(false);
                    }}
                    onMouseEnter={() => setHoveredItem(option.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ width: '100%', cursor: 'pointer', backgroundColor: itemBackgroundColor }}
                  >
                    <div style={{ borderTop: '1px solid #F3F3F3', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px' }}>
                      <PText text={option.value} size='14px' font={fonts.openSans} color='#233255' />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SelectComponent.propTypes = {
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
  isSearchBar: PropTypes.bool,
  borderWidth: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default SelectComponent;
