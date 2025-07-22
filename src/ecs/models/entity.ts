import { ComponentClass, ComponentRegistry, IEntity } from "@interfaces/Entity";
import { IdController } from "controllers/idController";
import { v4 as uuidv4 } from 'uuid';

export class Entity implements IEntity {
  private idController = new IdController()
  id: number;
  components = new Map<ComponentClass, ComponentRegistry[keyof ComponentRegistry]>();
  tags?: string[];

  constructor() {
    this.id = this.idController.getNewId();
  }

  add<T extends ComponentRegistry[keyof ComponentRegistry]>(cls: new (...args: any[]) => T, instance: T): this {
    this.components.set(cls, instance);
    return this;
  }

  get<T extends ComponentRegistry[keyof ComponentRegistry]>(cls: new (...args: any[]) => T): T | undefined {
    return this.components.get(cls) as T | undefined;
  }

  has<T extends ComponentRegistry[keyof ComponentRegistry]>(cls: new (...args: any[]) => T): boolean {
    return this.components.has(cls);
  }
}