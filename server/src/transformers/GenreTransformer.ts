import { Genre } from "../models/Genre";

export class GenreTransformer{
  transform(genre: Genre){
    return {genreId: genre.id, genre: genre.name};
  }

  transformArray(genres: Genre[]){
    return genres.map(genre => this.transform(genre));
  }
}