import { text } from "stream/consumers";
import { Comment } from "../models/Comment";
import { BookTransformer } from "./BookTransformer";
import { UserTransformer } from "./UserTransformer";

export class CommentTransformer{
  constructor(private bookTransformer: BookTransformer, private userTransformer: UserTransformer) {}

  transform(comment: Comment){
    return {
      user: comment.user && this.userTransformer.transform(comment.user),
      book: comment.book && this.bookTransformer.transform(comment.book),
      commentId: comment.id,
      text: comment.text
    }
  }

  transformArray(comments: Comment[]){
    return comments.map(comment => this.transform(comment));
  }

  transformArrayWithLessInfo(comments: Comment[]){
    return comments.map(comment => this.transform(comment)).map(comment => {return {author: comment.user?.name, text: comment.text}})
  }
}