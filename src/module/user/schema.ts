import {
  AllowNull,
  Column,
  DataType,
  Unique,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  BeforeUpdate,
  BeforeCreate,
  BeforeSave
} from "sequelize-typescript";
import bcrypt from "bcryptjs";

@Table({
  tableName: "users",
})
export class Users extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare fullName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare profile: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: Users) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
}
