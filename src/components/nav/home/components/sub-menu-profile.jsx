import React, { useState } from 'react';
import { array, func } from 'prop-types';

import Icons from 'components/icons';
import NavButton from './nav-button';
import Tab from './tab';
import { connect } from 'react-redux';
import styles from './sub-menu.module.scss';

const List = ({ nav, setActiveTab, activeTab, setIsOpened }) => {
  return nav.map(({ label, Icon, children, to }, index) => {
    return (
      <div key={label} className={styles.popular_block}>
        <NavButton
          to={to}
          label={label}
          Icon={Icon}
          isLast
          isNoPlus={!children}
          setActiveTab={() => setActiveTab(label)}
          setIsOpened={setIsOpened}
        />

        {children && (
          <Tab
            list={children}
            isActive={activeTab === label}
            tabLabel={label}
            onBack={() => setActiveTab('')}
            setIsOpened={setIsOpened}
          />
        )}
      </div>
    );
  });
};

function ProfileSubMenu(props) {
  const { onBack, nav, setIsOpened } = props;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={styles.header}>
        <button type="button" className={styles.arrow} onClick={onBack}>
          <Icons.ArrowRight className={styles.arrow__icon} />
        </button>
        Profile
      </div>
      <div className={`${styles.column__wrapper}`}>
        <div className={`${styles.column} ${styles.artist}`}>
          <div className={styles.row}>
            <List
              nav={nav}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsOpened={setIsOpened}
            />
          </div>
        </div>
      </div>
    </>
  );
}

ProfileSubMenu.propTypes = {
  onBack: func.isRequired,
  nav: array,
};

const mapStateToProps = state => ({
  navbar: state.navbar,
});

export default connect(mapStateToProps)(ProfileSubMenu);
