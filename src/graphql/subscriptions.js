/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      text
      user
      post {
        id
        title
        content
        user
        images
        comments {
          id
          text
          user
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        rating
        ratingCounter
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
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
      text
      user
      post {
        id
        title
        content
        user
        images
        comments {
          id
          text
          user
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        rating
        ratingCounter
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
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
      text
      user
      post {
        id
        title
        content
        user
        images
        comments {
          id
          text
          user
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        rating
        ratingCounter
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
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
        id
        text
        user
        post {
          id
          title
          content
          user
          images
          rating
          ratingCounter
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      rating
      ratingCounter
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
        id
        text
        user
        post {
          id
          title
          content
          user
          images
          rating
          ratingCounter
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      rating
      ratingCounter
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
        id
        text
        user
        post {
          id
          title
          content
          user
          images
          rating
          ratingCounter
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      rating
      ratingCounter
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
