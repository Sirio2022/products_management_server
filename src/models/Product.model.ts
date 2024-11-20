import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  schema: 'products',
  timestamps: true,
})
export default class Product extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare available: boolean;
}
