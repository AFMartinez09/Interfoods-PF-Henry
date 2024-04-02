import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'Usuario',
  tableName: 'Usuarios',
})
export class Usuario extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
    allowNull: false,
  })
  pais!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ciudad!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  direccion!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  admin!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  habilitado!: boolean;
}

