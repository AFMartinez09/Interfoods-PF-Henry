import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'Plato',
  tableName: 'Platos',
})
export class Plato extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre!: string;

  @Column(DataType.STRING)
  origen!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  ingredientes!: string[];

  @Column(DataType.INTEGER)
  kilocalorias!: number;

  @Column(DataType.INTEGER)
  carbohidratos!: number;

  @Column(DataType.INTEGER)
  grasas!: number;

  @Column(DataType.INTEGER)
  peso!: number;

  @Column(DataType.FLOAT)
  precio!: number;

  @Column(DataType.STRING)
  tipo!: string;

  @Column(DataType.STRING)
  imagen!: string;

  @Column(DataType.STRING(1000))
  descripcion!: string;

  @Column(DataType.STRING)
  stock!: string;
}
