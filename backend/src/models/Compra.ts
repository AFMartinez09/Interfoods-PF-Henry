import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({
  modelName: 'Compra',
  tableName: 'Compras',
})
export class Compra extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalProductos!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalGasto!: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  detallesPlatos!: { platoId: number, cantidad: number, precioUnitario: number }[];
}