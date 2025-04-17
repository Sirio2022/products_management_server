import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  ForeignKey
} from 'sequelize-typescript'
import User from './User'

export interface TokenAttributes {
  id?: string
  userId: string
  token: string
  createdAt?: Date
  expiredAt?: Date
}

@Table({
  tableName: 'tokens',
  timestamps: true
})
export default class Token extends Model<TokenAttributes> {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare userId: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare token: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  declare createdAt: Date

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  })
  declare expiredAt: Date
}
