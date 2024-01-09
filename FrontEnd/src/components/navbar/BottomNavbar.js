import React, { useState, useEffect } from 'react';
import { colors } from '../../style/color';
import PropTypes from 'prop-types';
import style from './BottomNavbar.module.css';
import * as Icon from 'react-feather';
import { fontWeights } from '../../style/font/fontWeights';
import { fonts } from '../../style/font/fonts';
import {useNavigate} from "react-router-dom";

const styles = {
  footer: {
    backgroundColor: colors.darkPurple,
    position: 'fixed',
    bottom: 10,
    left: '2%',
    width: '96%',
    borderRadius: '90px',
    zIndex: 9999
  },
  navbar: {
    paddingTop: '7px',
    paddingBottom: '7px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: colors.lightPurple,
    fontSize: '11px',
    fontFamily: fonts.openSans,
    fontWeight: fontWeights.bold,
  },
  navItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingRight: '10px',
    paddingLeft: '10px',
    transition: 'color 0.1s ease-in-out',
  },
  icon: {
    paddingRight: '7px',
  },
  selected: {
    color: colors.darkPurple,
    backgroundColor: colors.white,
    borderRadius: '90px',
  },
};

const BottomNavbar = ({isPopupVisible = false, itemPosition}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(itemPosition);
  }, []);
  const navigate = useNavigate();

  const handleItemClick = (itemName) => {
    if (itemName === 'Workspace')
      itemName = 'homeWorkspace';
    navigate("/" + itemName.toLowerCase());
  };

  const renderNavItem = (itemName, icon) => (
    <div
      className="nav-item"
      style={{
        ...styles.navItem,
        ...(selectedItem === itemName && styles.selected),
      }}
      onClick={() => handleItemClick(itemName)}
    >
      {icon}
      {selectedItem === itemName && (
        <span>
          {itemName}
        </span>
      )}
    </div>
  );

  return (
    
    <footer style={styles.footer}>
      <div className={isPopupVisible ? style.blurred : ''}>
        <nav style={styles.navbar}>
          {renderNavItem('Workspace', <Icon.Grid size="28" style={styles.icon} />)}
          {renderNavItem('Search', <Icon.Search size="28" style={styles.icon} />)}
          {renderNavItem('Create', <Icon.PlusCircle size="28" style={styles.icon} />)}
          {renderNavItem('Forum', <Icon.MessageSquare size="28" style={styles.icon} />)}
          {renderNavItem('Profil', <Icon.User size="28" style={styles.icon} />)}
        </nav>
      </div>
    </footer>
  );
};

BottomNavbar.propTypes = {
  isPopupVisible: PropTypes.bool,
  itemPosition: PropTypes.string
};

export default BottomNavbar;