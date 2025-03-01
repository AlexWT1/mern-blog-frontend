import React from 'react';
import styles from './UserInfo.module.scss';
import { Avatar } from '@mui/material';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Avatar
        className={styles.avatar}
        alt=""
        src={avatarUrl ? `http://localhost:4444/${avatarUrl}` : ''}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
