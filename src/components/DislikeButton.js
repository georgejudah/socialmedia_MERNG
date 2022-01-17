import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function DislikeButton({ user, post: { id, likeCount, dislikes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && dislikes.find((dislike) => dislike.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, dislikes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="red">
        <Icon name="thumbs down outline" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="thumbs down outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="thumbs down outline" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
      {/* <Label basic color="red" pointing="left">
        {likeCount}
      </Label> */}
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation dislikePost($postId: ID!) {
    dislikePost(postId: $postId) {
      id
      dislikes {
        id
        username
      }
      likeCount
    }
  }
`;

export default DislikeButton;
