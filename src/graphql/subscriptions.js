/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      post {
        id
        title
        content
        user
        images
        comments {
          nextToken
          startedAt
        }
        rating
        ratingCounter
        ratingPeople
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      text
      user
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      post {
        id
        title
        content
        user
        images
        comments {
          nextToken
          startedAt
        }
        rating
        ratingCounter
        ratingPeople
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      text
      user
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      post {
        id
        title
        content
        user
        images
        comments {
          nextToken
          startedAt
        }
        rating
        ratingCounter
        ratingPeople
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      text
      user
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      content
      user
      images
      comments {
        items {
          id
          postID
          text
          user
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      rating
      ratingCounter
      ratingPeople
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      content
      user
      images
      comments {
        items {
          id
          postID
          text
          user
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      rating
      ratingCounter
      ratingPeople
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      content
      user
      images
      comments {
        items {
          id
          postID
          text
          user
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      rating
      ratingCounter
      ratingPeople
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
