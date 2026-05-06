export enum Roles {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
}

export class Role {
  private readonly value: Roles

  private constructor(value: Roles) {
    this.value = value
  }

  static create(role: Roles) {
    return new Role(role)
  }

  static student() {
    return new Role(Roles.STUDENT)
  }

  static instructor() {
    return new Role(Roles.INSTRUCTOR)
  }

  getValue() {
    return this.value
  }

  equals(other: Role) {
    return this.value === other.getValue()
  }
}
