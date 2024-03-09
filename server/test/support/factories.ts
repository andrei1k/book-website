import { Book } from "../../src/models/Book";
import { Comment } from "../../src/models/Comment";
import { Genre } from "../../src/models/Genre";
import { User } from "../../src/models/User";

export function createUser(data: Partial<User> = {}) {
  return User.query().insert({
    name: 'Test User',
    email: 'test@gmail.com',
    password: '12341234',
    ...data
  }).returning('*')
}

export async function createBook(data: Partial<Book> = {}){
  const userId = data.userId ?? (await createUser()).id

  return Book.query().insert({
    title: 'Random book',
    author: 'unknown',
    userId: userId,
    ...data
  }).returning('*')
}

export async function createComment(data: Partial<Comment>){
  const userId = data.userId ?? (await createUser()).id
  const bookId = data.bookId ?? (await createBook()).id

  return Comment.query().insert({
    text: 'its a book',
    userId: userId,
    bookId: bookId,
    ...data
  }).returning('*')
}

export function createGenre(data: Partial<Genre>){
  return Genre.query().insert({
    name: data.name ?? 'fictional',
    ...data
  }).returning('*')
}