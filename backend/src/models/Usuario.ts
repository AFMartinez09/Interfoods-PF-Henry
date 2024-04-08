import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'Usuario',
  tableName: 'Usuarios',
})
export class Usuario extends Model {
  @Column({
    type: DataType.STRING,
  })
  nombre!: string;

  @Column({
    type: DataType.STRING,
  })
  apellido!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column(DataType.STRING(1000),)
  foto!: string;

  @Column({
    type: DataType.STRING,

  })
  pais!: string;

  @Column({
    type: DataType.STRING,

  })
  ciudad!: string;

  @Column({
    type: DataType.STRING,

  })
  direccion!: string;

  @Column({
    type: DataType.BOOLEAN,

  })
  admin!: boolean;

  @Column({
    type: DataType.BOOLEAN,

  })
  habilitado!: boolean;
}