import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false,  })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false,  })
  password: string;
}