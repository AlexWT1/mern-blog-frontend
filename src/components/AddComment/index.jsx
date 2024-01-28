import React from 'react';
import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useParams } from 'react-router-dom';
import { createComment } from '../../redux/slices/comment';
export const Index = () => {
  const isAuth = useSelector(selectIsAuth);
  const [comment, setComment] = React.useState('');

  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = useSelector((state) => state.auth.data);

  const handleComment = () => {
    try {
      const postId = id;
      dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuth) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.root}>
          <Avatar
            classes={{ root: styles.avatar }}
            src={userData.avatarUrl ? `http://localhost:4444/${userData.avatarUrl}` : ''}
          />
          <div className={styles.form}>
            <TextField
              label="Написать комментарий"
              variant="outlined"
              value={comment}
              maxRows={10}
              onChange={(e) => setComment(e.target.value)}
              multiline
              fullWidth
            />
            <Button onClick={handleComment} variant="contained">
              Отправить
            </Button>
          </div>
        </div>
      </form>
    );
  } else {
    return <></>;
  }
};
