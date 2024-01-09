import React, { useState } from 'react';
import styles from './BurgerCrossIcon.module.css';

const BurgerCrossIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log("lool");
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles['nav-open'] : ''}`}>
      <a id="menu-toggle" className={styles['menu-toggle']} onClick={handleClick}>
        <span className={`${styles['menu-toggle-bar']} ${styles['menu-toggle-bar--top']}`}></span>
        <span className={`${styles['menu-toggle-bar']} ${styles['menu-toggle-bar--middle']}`}></span>
        <span className={`${styles['menu-toggle-bar']} ${styles['menu-toggle-bar--bottom']}`}></span>
      </a>
    </div>
  );
};

export default BurgerCrossIcon;
