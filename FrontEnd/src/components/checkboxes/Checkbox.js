import React from 'react';
import { colors } from '../../style/color';

const Checkbox = ({
  isChecked,
  setIsChecked,
  borderColor = isChecked ? colors.lightPurple : colors.darkBlue,
  backgroundColor = isChecked ? colors.lightPurple : colors.white,
  borderRadius = '5px',
  borderWidth = '2px',
  width = '30px',
  height = '30px',
	text,
  textColor = colors.darkBlue,
	textFont = 'Arial, sans-serif',
  textSize = '15px',
}) => {

  return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}}>
			<div
				onClick={() => setIsChecked(!isChecked)}
				style={{
					backgroundColor: backgroundColor,
					borderColor: borderColor,
					border: `${borderWidth} solid ${borderColor}`,
					borderRadius: borderRadius,
					width: width,
					height: height,
					cursor: 'pointer'
			}}/>
			<div style={{paddingLeft: text !== '' ? '10px' : '0px'}}>
				<span style={{
					color: textColor,
					fontFamily: textFont,
					fontSize: textSize
				}}>
					{text}
				</span>
			</div>
		</div>
  );
};

export default Checkbox;
