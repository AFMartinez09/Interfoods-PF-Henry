import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from './Usuario';
import { Plato } from './Plato';

@Table({
  modelName: 'Review',
  tableName: 'Reviews',
})
export class Review extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comentario!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  })
  calificacion!: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @ForeignKey(() => Plato)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  platoId!: number;

  @BelongsTo(() => Plato)
  plato!: Plato;
}