import { User } from "../models/User"

export class UserTransformer {
  transform(user: User) {
    return { id: user.id, name: user.name }
  }

  transformArray(users: User[]) {
    return users.map(user => this.transform(user))
  }
}
