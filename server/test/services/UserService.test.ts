import { User } from "../../src/models/User";
import { BookService } from "../../src/services/BookService";
import { UserAlreadyExists, UserService } from "../../src/services/UserService"
import { createBook, createUser } from "../support/factories";

describe('UserService', () => {
  describe('#register', () => {
    it('inserts user into database', async () => {
      const userService = new UserService();

      const user = await userService.register({
        name: 'Bill',
        email: 'billy@gmail.com',
        password: '12341234'
      });

      expect(await User.query().findOne('email', 'billy@gmail.com')).toEqual(user);
    })

    it('throws an error if user is already registered', async () => {
      const userService = new UserService();

      await createUser({email: 'billy@gmail.com'});

      await expect(() => userService.register({
        name: 'Bill',
        email: 'billy@gmail.com',
        password: '12341234'
      })).rejects.toThrowError(UserAlreadyExists)
    })
  })

  describe('#findByEmail', () => {
    it('returns user if user with specific email is registered', async () => {
      const userService = new UserService();
      await createUser({email: 'billy@gmail.com'});

      const user = await userService.findByEmail('billy@gmail.com');

      expect(user!.email).toEqual('billy@gmail.com')
    })

    it('returns undefined if user with specific email is not is registered', async () => {
      const userService = new UserService();

      const user = await userService.findByEmail('billy@gmail.com');

      expect(user).toBeUndefined();
    })
  })

  describe('findById', () => {
    it('returns user if user with this id exists', async () => {
      const userService = new UserService();
      const user = await createUser();

      expect(await userService.findByID(`${user.id}`)).toEqual(user);
    })

    it('returns undefined if user with this id does not exist', async () => {
      const userService = new UserService();

      expect(await userService.findByID('1')).toBeUndefined();
    })
  })

  describe('#login', () => {
    it('returns user if email and password are correct', async () => {
      const userService = new UserService();

      const user = await userService.register({email: 'bill@gmail.com', password: '123412345', name: 'Bill'});

      expect(await userService.login({email: 'bill@gmail.com', password: '123412345'})).toEqual(user);
    })
    
    it('returns undifined if user with such username and password does not exist', async () => {
      const userService = new UserService();

      expect(await userService.login({email: 'bill@gmail.com', password: '123412345'})).toBeUndefined();
    })
  })

  describe('#addBookToRead', () => {
    it('returns undefined if user is not found', async () => {
      const userService = new UserService();

      const book = await createBook();
      
      expect(await userService.addBookToRead('biil@gmail.com', book.id)).toBeUndefined();
    })
    it('returns user book is added', async () => {
      const userService = new UserService();

      const user = await createUser({email: 'bil@gmail.com'});
      const book = await createBook();
      
      expect(await userService.addBookToRead('bil@gmail.com', book.id)).toEqual(user);
    })
  })

  describe('#getUsersReadBooks', () => {
    it('returns empty array if user has no books in list', async () => {
      const userService = new UserService();

      await createUser({email: 'bil@gmail.com'});

      expect(await userService.getUsersReadBooks('bil@gmail.com')).toEqual([])
    })

    it('returns array of user\'s read book', async () => {
      const userService = new UserService();

      const user = await createUser();
      const book = await createBook({userId: user.id});
      const book2 = await createBook({title: 'Ratatui', userId: user.id});

      await createUser({email: 'bil@gmail.com'});
      await userService.addBookToRead('bil@gmail.com', book.id);
      await userService.addBookToRead('bil@gmail.com', book2.id);

      expect(await userService.getUsersReadBooks('bil@gmail.com')).toEqual([book, book2]);
    })

    it('returns undefined when user does not exist', async () => {
      const userService = new UserService();

      expect(await userService.getUsersReadBooks('bil@gmail.com')).toBeUndefined()
    })
  })
})