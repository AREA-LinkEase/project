import React, {useState} from "react";
import styles from "./CommuAutomate.module.css";
import PropTypes from 'prop-types';
import TitleTextChildButton from "../../components/buttons/TitleTextChildButton";
import { colors } from "../../style/color";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import * as Icon from 'react-feather';
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import BasicText from "../../components/texts/BasicText";
import { formatNumber } from "../../utils/formatNumber";
import IconButton from "../../components/buttons/IconButton";

const NumberPeople = ({numberPeople}) => {

	const IconLogo = Icon["User"];

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		}}>
			<div style={{paddingRight: '10px'}}>
				<IconLogo color={colors.white}/>
			</div>
			<div>
				<BasicText text={formatNumber(numberPeople)} color={colors.white}/>
			</div>
		</div>
	)
}

const CommuAutomate = () => {
  const [automateSearchValue, setAutomateSearchValue] = useState("");
	const [automateList] = useState([{
		name: 'SpotifyBangar',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightPurple,
		access: "Public"
	},
	{
		name: 'Baboss',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.darkGrey,
		access: "Private"
	},
	{
		name: 'Mamen',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightPurple,
		access: "Public"
	},
	{
		name: '3ataï',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightlightGrey,
		access: "Public"
	},
	{
		name: 'THOAAAAMS',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.purple,
		access: "Public"
	},
	{
		name: 'PIZZA BIEN GARNIE',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.purple,
		access: "Private"
	}]);

  const [selectedAutomates, setSelectedAutomates] = useState([]);

  const handleSelect = (index) => {
    const isSelected = selectedAutomates.includes(index);

    if (isSelected) {
      setSelectedAutomates(selectedAutomates.filter((item) => item !== index));
    } else {
      setSelectedAutomates([...selectedAutomates, index]);
    }
  };

	return (
    <div className={styles.commuAutomateBody}>
      <div style={{ position: 'fixed', width: '100%', zIndex: 1000, paddingTop: '50px', textAlign: 'center', backgroundColor: colors.white, paddingBottom: '15px' }}>
      <PrimaryInput leftIconName='Search' placeholder='Automate search...' inputValue={automateSearchValue} setInputValue={setAutomateSearchValue} width="85%"/>
      </div>
      <div
        className={styles.commuAutomateContainer}
        style={{ marginTop: '150px'}}
      >
        {automateList.length !== 0 ? (
          <div className={styles.commuAutomateList}>
            {automateList
              .filter(automate => automate.name.toLowerCase().includes(automateSearchValue.toLowerCase()))
              .map((automate, index) => (
                <div key={index} style={{ paddingBottom: index === automateList.length - 1 ? ((selectedAutomates.length !== 0) ? '170px' : '90px') : '15px' }}>
										<TitleTextChildButton
											title={automate.name}
											text={`Par **${automate.creator}**`}
											isSelectable={true}
											componentId={index}
											backgroundColor={automate.color}
											borderColor={automate.color}
											isClickable={false}
											handleSelect={handleSelect}
											width="90%"
											ComponentChildren={() => <NumberPeople numberPeople={automate.people} />}
										/>
									</div>
              ))}
          </div>
        ) : null}
        {(selectedAutomates.length !== 0) && (
						<div style={{position: 'fixed', bottom: 80, width: '100%'}}>
							<IconButton height="70px" width="90%" buttonText='Add' iconSrc='Plus' iconColor={colors.white} iconSize="30px" isIcon={true} isImage={false} backgroundColor={colors.darkPurple} textColor={colors.white} hoverBackgroundColor={colors.darkPurple} />
						</div>
					)}
        <div>
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
};

NumberPeople.propTypes = {
	numberPeople: PropTypes.number
};

export default CommuAutomate;
