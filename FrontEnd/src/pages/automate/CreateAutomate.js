import React, {useState} from "react";
import PropTypes from 'prop-types';
import styles from "./CreateAutomate.module.css";
import Header from "../../components/Header";
import PText from "../../components/texts/PText";
import { fonts } from "../../style/font/fonts";
import { fontWeights } from "../../style/font/fontWeights";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import TitleTextChildButton from "../../components/buttons/TitleTextChildButton";
import BasicText from "../../components/texts/BasicText";
import * as Icon from 'react-feather';
import { colors } from "../../style/color";
import { formatNumber } from "../../utils/formatNumber";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import IconButton from "../../components/buttons/IconButton";
import { postAutomate } from "../../models/automates";
import { useLocation, useNavigate } from "react-router";

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

const CreateAutomate = () => {

	const [nameValue, setNameValue] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { workspace, name } = location.state || {};
	const [automateSearchValue, setAutomateSearchValue] = useState("");
	const automateList = [{
		name: 'ListenTaylorSwift',
		creator: 'Nadil',
		people: 2350000,
		color: colors.lightPurple,
	},
	{
		name: 'SendMessageIfMusique',
		creator: 'Nouvo',
		people: 4000,
		color: colors.darkGrey
	},
	{
		name: 'PauseMusiqueIfMessage',
		creator: 'Simon',
		people: 35000,
		color: colors.lightPurple,
	}];

  const [selectedAutomates, setSelectedAutomates] = useState([]);

  const handleSelect = (index) => {
    const isSelected = selectedAutomates.includes(index);

    if (isSelected) {
      setSelectedAutomates(selectedAutomates.filter((item) => item !== index));
    } else {
      setSelectedAutomates([...selectedAutomates, index]);
    }
  };

  const handleCreateAutomate = async () => {
	try {
		console.log(workspace.id);
		const response = await postAutomate(nameValue, workspace.id); // ici
		console.log(response);
		if (response.status === 201) {
			navigate("/workspace", {
				state: {
					workspace: workspace,
					name: name,
				},
			});
		} else {

		}
	} catch (error) {
		console.error("Error fetching create automate:", error);
	}
  };

  const handleClickBack = () => {
	navigate("/workspace", {
		state: {
			workspace: workspace,
			name: name,
		},
	});
  };

	return (
		<div className={styles.createAutomateBody}>
			<div>
				<Header rightIconName='' onClickIconLeft={handleClickBack}/>
			</div>
			<div className={styles.createAutomateContainer}>
				<div className={styles.createAutomateTitle}>
					<PText text='New Automate' font={fonts.openSans} fontWeight={fontWeights.bold} size="30px"/>
				</div>
				<div className={styles.createAutomateInput}>
					<PrimaryInput leftIconName='' placeholder='Name' inputValue={nameValue} setInputValue={setNameValue} width="85%"/>
				</div>
				<div className={styles.createAutomateSeparationLine}></div>
				<div className={styles.createAutomateInputAutomate}>
					<PrimaryInput leftIconName='Search' placeholder='Automate search...' inputValue={automateSearchValue} setInputValue={setAutomateSearchValue} width="85%"/>
				</div>
					{automateList.length !== 0 ? (
						<div className={styles.createAutomateList}>
							{automateList
								.filter(automate => automate.name.toLowerCase().includes(automateSearchValue.toLowerCase()))
								.map((automate, index) => (
									<div key={index} style={{ paddingBottom: index === automateList.length - 1 ? ((selectedAutomates.length !== 0 || nameValue !== "") ? '170px' : '90px') : '15px' }}>
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
						) : null
					}
					{ (selectedAutomates.length !== 0 || nameValue !== "") && (
						<div style={{position: 'fixed', bottom: 80, width: '100%'}}>
							<IconButton height="70px" onPressButton={handleCreateAutomate} buttonText='Add'width="90%" iconSrc='Plus' iconColor={colors.white} iconSize="30px" isIcon={true} isImage={false} backgroundColor={colors.darkPurple} textColor={colors.white} hoverBackgroundColor={colors.darkPurple} />
						</div>
					)}
				<div>
					<BottomNavbar itemPosition={"Workspace"}/>
				</div>
			</div>
		</div>
	);
};

NumberPeople.propTypes = {
	numberPeople: PropTypes.number
};

export default CreateAutomate;
