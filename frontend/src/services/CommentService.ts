import { HttpService } from "./HttpService";

export interface Comment {
  author: string,
  text: string
}

class CommentService {

  private http: HttpService = new HttpService()

  async getComments(bookId: number | string) {

    return await this.http.get<Comment[]>(`books/${bookId}/comments`)
  }
}

export const commentsService = new CommentService()