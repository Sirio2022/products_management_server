import { Table, Column, Model, DataType, IsUUID, HasOne } from 'sequelize-typescript'
import Token from './Token'

export interface UserAttributes {
  id?: string
  name: string
  email: string
  password: string
  confirmed: boolean
}

@Table({
  tableName: 'users',
  timestamps: true
})
export default class User extends Model<UserAttributes> {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    set(value: string) {
      this.setDataValue('email', value.toLowerCase())
    }
  })
  declare email: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  declare confirmed: boolean

  @HasOne(() => Token)
  declare token: Token
}
