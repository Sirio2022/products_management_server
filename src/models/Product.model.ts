import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  schema: 'products',
  timestamps: true,
})
class Product extends Model {
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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare available: boolean;
}

export default Product;
