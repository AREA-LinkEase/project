import React, {useEffect, useState} from "react";
import styles from "./SearchPage.module.css";
import PropTypes from 'prop-types';
import Header from "../../components/Header";
import TitleTextChildButton from "../../components/buttons/TitleTextChildButton";
import { colors } from "../../style/color";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import ServiceButton from "../../components/buttons/ServiceButton";
import * as Icon from 'react-feather';
import BasicText from "../../components/texts/BasicText";
import { formatNumber } from "../../utils/formatNumber";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import {useNavigate} from "react-router-dom/dist";
import { getAutomates } from "../../models/automates";
import { getWorkspaces } from "../../models/workspaces";

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
};

const SearchPage = () => {
	
    const [workspaceAccessValue, setWorkspaceAccessValue] = useState("All");
    const [isError, setIsError] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);
    const [automates, setAutomates] = useState([]);
    const [allDatas, setAllDatas] = useState([]);
    const [itemSearchValue, setItemSearchValue] = useState("");
    const [itemsList] = useState([{
		name: 'SpotifyBangar',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightPurple,
		type: "Workspace"
	},
	{
        id: '1',
		name: 'Baboss',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.darkGrey,
		type: "Automate"
	},
	{
        id: '1',
		name: 'Mamen',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightPurple,
		type: "Workspace"
	},
	{
        id: '1',
		name: '3ataï',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightlightGrey,
		type: "Workspace"
	},
	{
        id: '1',
		name: 'THOAAAAMS',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightPurple,
		type: "Workspace"
	},
	{
        id: '1',
		name: 'Outlook',
		color: '#0000FF',
        imgLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png',
		type: "Service",
	},
	{
        id: '1',
		name: 'PIZZA BIEN GARNIE',
		creator: 'Adilou le fifou',
		people: 3500000,
		color: colors.lightPurple,
		type: "Automate"
	},
	{
    id: '1',
		name: 'Spotify',
		color: '#1DB954',
    imgLink: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-white-icon.png',
		type: "Service",
	},
	{
        id: '1',
		name: 'Discord',
		color: '#7289da',
        imgLink: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png',
		type: "Service",
	},
	{
        id: '1',
		name: 'Netflix',
		color: 'black',
        imgLink: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
		type: "Service",
	},
]);

  useEffect(() => {
    const fetchDataWorkspaces = async () => {
      try {
        const response = await getWorkspaces();
        console.log(response);
        if (response.status === 200) {
          setWorkspaces(response.content.result);
        } else {
          setIsError(true);
        }
      } catch (error) {
          console.error("Error fetching workspaces:", error);
      }
    };

    const fetchDataAutomates = async () => {
      try {
        const response = await getAutomates();
        console.log(response);
        if (response.status === 200) {
          setAutomates(response.content.result);
        } else {
          setIsError(true);
        }
      } catch (error) {
          console.error("Error fetching automates:", error);
      }
    };

    fetchDataWorkspaces();
    fetchDataAutomates();
  }, []);

  useEffect(() => {
    const manuallyAddedServices = [
      {
        id: '2',
        title: 'Spotify',
        color: '#1DB954',
        imgLink: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-white-icon.png',
        description: 'Voici le service de Spotify',
        type: "Service",
      },
      {
        id: '1',
        title: 'Discord',
        color: '#7289da',
        imgLink: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-white-icon.png',
        description: 'Voici le service de Discord',
        type: "Service",
      },
    ];

    const allDatas = [
      ...workspaces.map(workspace => ({ ...workspace, type: 'Workspace' })),
      ...automates.map(automate => ({ ...automate, type: 'Automate' })),
      ...manuallyAddedServices,
    ];

    setAllDatas(allDatas);
  }, [workspaces, automates]);

	const navigate = useNavigate();

  const handleClickOnService = (item) => {
    navigate("/service", {
      state: {
        service: item
      }
    })
  };

	const handleClickAutomate = (automate) => {
			navigate("/actionReactionAutomate")
	};

  const handleClickWorkspace = (workspace) => {
    navigate("/workspace", {
      state: {
        workspace: workspace,
      },
    });
  }

	// const handleClickWorkspace = () => {
  //   navigate("/workspace", {
  //     state: {
  //         id: "id"
  //     },
  // });
	// }

	return (
    <div className={styles.searchPageBody}>
      <div style={{ paddingLeft: '4%', position: 'fixed', width: '100%', zIndex: 1000, backgroundColor: colors.white }}>
        <Header
          isFilter={true}
          isNumberInfo={false}
          filterListTag={["All", "Workspace", "Service" ,"Automate"]}
          filterSelected={workspaceAccessValue}
          setFilterSelected={setWorkspaceAccessValue}
        />
      </div>
      <div style={{width: '100%', paddingBottom: '20px', position: 'fixed', paddingTop: '70px', zIndex: '999', textAlign: 'center', backgroundColor: colors.white}}>
        <PrimaryInput leftIconName='Search' height="20px" placeholder='Search...' inputValue={itemSearchValue} setInputValue={setItemSearchValue} width="85%"/>
      </div>
      <div
  className={styles.searchPageContainer}
  style={{
    marginTop: '160px',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  {allDatas.length !== 0 ? (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: '70px' }}>
      {allDatas
        .filter(
            (item) =>
            (workspaceAccessValue === 'All' || item.type.toLowerCase().includes(workspaceAccessValue.toLowerCase())) &&
            (itemSearchValue === '' || item.title.toLowerCase().includes(itemSearchValue.toLowerCase()))
        )
        .map((item, index) => {
          if (item.type && item.type === 'Service') {
            return (
              <div key={index} style={{ paddingRight: '10px', paddingLeft: '10px', paddingBottom: '20px' }}>
                <ServiceButton
                  imgLink={item.imgLink}
                  serviceName={item.title}
                  backgroundColor={item.color}
                  onClickButton={() => {
                    handleClickOnService(item);
                  }}
                />
              </div>
            );
          } else if (item.type && (item.type === 'Workspace' || item.type === 'Automate')) {
            return (
                <div key={index} style={{ paddingRight: '10px', paddingLeft: '10px', paddingBottom: '20px'}}>
                    <TitleTextChildButton
                        title={`${item.type === 'Workspace' ? 'Ws' : 'Aut'} - ${item.title}`}
                        text={`Par **${item.creator}**`}
                        isSelectable={false}
                        componentId={item.id}
                        isClickable={true}
                        backgroundColor={item.type === 'Workspace' ? colors.lightPurple : colors.darkPurple} // item.color
                        borderColor={item.type === 'Workspace' ? colors.lightPurple : colors.darkPurple}
						            onPressButton={item.type === 'Workspace' ? () => handleClickWorkspace(item) : () => handleClickAutomate(item)}
                        height="155px"
                        ComponentChildren={() => <NumberPeople numberPeople={5000} />} //item.people
                    />
                </div>
            )
          }
        })}
    </div>
  ) : null}
        <div>
          <BottomNavbar itemPosition={"Search"}/>
        </div>
      </div>
      { isError && (
              <Popup onPress={handleClickButttonPopup} leavePopup={handleClosePopup} Title={'Error'} Content={'Error'} TextButton="Continue" />
      )}
    </div>
  );
};

NumberPeople.propTypes = {
	numberPeople: PropTypes.number
};

export default SearchPage;
