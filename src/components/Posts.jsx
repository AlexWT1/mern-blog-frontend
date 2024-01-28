import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../components/Post';

export const Posts = ({ populate }) => {
  const userData = useSelector((state) => state.auth.data);
  const { posts } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === 'loading';
  return (
    <Grid xs={8} item>
      {(isPostsLoading ? [...Array(5)] : populate ? posts.popularPosts : posts.items).map(
        (obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444/${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length ? obj.comments.length : 0}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ),
      )}
    </Grid>
  );
};
