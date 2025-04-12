import Helmet from 'components/helmet';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles.module.scss';

const NotFoundPage = () => (
  <main className={styles.wrapper}>
    <Helmet title="404 Not Found" />
    <div className={styles.message}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Sorry, we couldn&apos;t find that page</p>
      <Link className={styles.link} to="/">
        Back Home
      </Link>
    </div>
  </main>
);

export default NotFoundPage;
