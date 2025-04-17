import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import User from './User'

export interface ProductAttributes {
  id?: string
  name: string
  price: number
  stock: number
  active?: boolean
  image: string
  description: string
  manager: string
}

@Table({
  tableName: 'products',
  timestamps: true
})
export default class Product extends Model<ProductAttributes> {
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
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
    get() {
      const value = this.getDataValue('price')
      return parseFloat(value)
    }
  })
  declare price: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare stock: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  declare active: boolean

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare image: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare description: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare manager: string // Foreign key to the User table, assuming a user can manage multiple products

  @BelongsTo(() => User)
  user!: User // Define the relationship with the User model
}
