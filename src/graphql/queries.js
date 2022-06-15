/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      post {
        id
        title
        content
        user
        images
        comments {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        post {
          id
          title
          content
          user
          images
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
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        postID
        post {
          id
          title
          content
          user
          images
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
      nextToken
      startedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      user
      images
      comments {
        id
        postID
        post {
          id
          title
          content
          user
          images
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        user
        images
        comments {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        content
        user
        images
        comments {
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
      nextToken
      startedAt
    }
  }
`;
