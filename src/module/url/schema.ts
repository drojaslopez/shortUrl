import {
  AllowNull,
  Column,
  DataType,
  Unique,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "urllink",
})
export class UrlLink extends Model {
  @PrimaryKey
  @Unique
  @Column(DataType.STRING)
  declare idUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare urlOriginal: string;

  @AllowNull(false)  
  @Unique
  @Column(DataType.STRING)
  declare urlShort: string;

  @AllowNull(false)  
  @Unique
  @Column(DataType.INTEGER)
  declare stateUrl: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare countClick: number;
}
