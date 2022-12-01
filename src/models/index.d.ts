import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type CommentMetaData = {
  readOnlyFields: 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerComment = {
  readonly id: string;
  readonly postID: string;
  readonly text: string;
  readonly user: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly id: string;
  readonly postID: string;
  readonly text: string;
  readonly user: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment, CommentMetaData>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

type EagerPost = {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly user: string;
  readonly images?: (string | null)[] | null;
  readonly comments?: (Comment | null)[] | null;
  readonly rating?: number | null;
  readonly ratingCounter?: number | null;
  readonly ratingPeople?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly user: string;
  readonly images?: (string | null)[] | null;
  readonly comments: AsyncCollection<Comment>;
  readonly rating?: number | null;
  readonly ratingCounter?: number | null;
  readonly ratingPeople?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post, PostMetaData>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}