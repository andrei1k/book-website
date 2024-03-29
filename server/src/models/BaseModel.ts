import { Model } from "objection";

export class BaseModel extends Model {
  
  id!: number;

  createdAt!: Date;
  updatedAt!: Date;

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
