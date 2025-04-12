import React, { useEffect, useRef, useState } from 'react';
import {
  getLegalData,
  getSelectedLegalItem,
} from 'redux/legal/actions/legalActions';

import Helmet from 'components/helmet';
import Icons from '../icons';
import { LegalModal } from '../layout/modal/modal';
import { NavLink } from 'react-router-dom';
import Parse from 'react-html-parser';
import { connect } from 'react-redux';
import cx from 'classnames';
import { pageScroll } from 'services/pageScroller';
import styles from './legal-page.module.scss';
import useTheme from '../../hooks/use-theme';
import { withRouter } from 'react-router';

const Legal = function({
  match,
  getLegalData,
  legalList,
  getSelectedLegalItem,
  selectedItem,
}) {
  const { isDesktop } = useTheme();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  let { title } = match.params;

  useEffect(() => {
    getLegalData();
  }, [getLegalData]);

  useEffect(() => {
    if (legalList) {
      getSelectedLegalItem(title);
    }
  }, [getSelectedLegalItem, title, legalList]);

  useEffect(() => {
    if (selectedItem && !isDesktop) {
      setOpen(true);
    }
  }, [isDesktop, selectedItem]);

  useEffect(() => {
    pageScroll();
  });

  if (!legalList) {
    return null;
  }

  return (
    <>
      <Helmet />
      <main className={cx(styles.wrapper)}>
        <div className="container">
          {isDesktop ? (
            <section className={styles.container}>
              <aside className={styles.aside}>
                <div className={styles.list__container}>
                  <ul className={styles.list}>
                    {legalList.map((item, index) => (
                      <NavLink key={item.id} to={`/legal/${item.title}`}>
                        <li
                          className={
                            title === item.title
                              ? styles.selected__item
                              : styles.list__item
                          }
                        >
                          {title === item.title && (
                            <Icons.ArrowList className={styles.arrow} />
                          )}
                          {index + 1}. {item.title}
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                </div>
              </aside>
              <div className={styles.content}>
                <div className={styles.header}>
                  <h1 className={styles.title}>{selectedItem?.title}</h1>
                  <div>
                    <img
                      alt=""
                      className={styles.image}
                      src={selectedItem?.image_url}
                    />
                  </div>
                </div>
                <div className={styles.separator} />
                <section className={styles.description}>
                  <div ref={ref} className={styles.description__content}>
                    {Parse(selectedItem?.html_content)}
                    <div className={styles.blur__text} />
                  </div>
                </section>
              </div>
            </section>
          ) : (
            <section className={styles.container__mobile}>
              <h1 className={styles.title}>Legal page</h1>
              <h2 className={styles.subtitle}>Select article</h2>
              {open && selectedItem && (
                <LegalModal
                  data={selectedItem}
                  isOpen={open}
                  setOpen={setOpen}
                />
              )}
              <div className={styles.list}>
                {legalList.map(item => (
                  <NavLink key={item.id} to={`/legal/${item.title}`}>
                    <li
                      className={styles.list__item}
                      onClick={() => setOpen(true)}
                    >
                      <div className={styles.item__title}>{item.title}</div>
                      <div>
                        <img
                          alt=""
                          className={styles.image}
                          src={item.image_url}
                        />
                      </div>
                    </li>
                  </NavLink>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

const mapStateToProps = state => {
  return {
    legalList: state.legal.legalList,
    selectedItem: state.legal.selectedLegalItem,
  };
};

export default withRouter(
  connect(mapStateToProps, { getLegalData, getSelectedLegalItem })(Legal)
);
