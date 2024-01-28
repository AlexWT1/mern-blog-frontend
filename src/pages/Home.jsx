import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';

import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { getLastComment } from '../redux/slices/comment';
import { Posts } from '../components/Posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.posts);

  const [populate, setPopulate] = React.useState(false);

  const { lastComments } = useSelector((state) => state.comment);

  const isTagsLoading = tags.status === 'loading';
  const isLastCommentsLoading = lastComments.status === 'loading';
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(getLastComment());
  }, [dispatch]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example">
        <Tab
          label="Новые"
          onClick={() => {
            setPopulate(false);
            setValue(0);
          }}
        />
        <Tab
          label="Популярные"
          onClick={() => {
            setPopulate(true);
            setValue(1);
          }}
        />
      </Tabs>
      <Grid container spacing={4}>
        <Posts populate={populate} value={0 ? !populate : 1} />
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={lastComments} isLoading={isLastCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
