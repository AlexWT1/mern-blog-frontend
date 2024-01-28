import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments } from '../redux/slices/comment';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.war(err);
        alert('Ошибка при получении статьи');
      });
  }, [id]);

  const fetchComments = React.useCallback(async () => {
    dispatch(getPostComments(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444/${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments ? comments : []} isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
