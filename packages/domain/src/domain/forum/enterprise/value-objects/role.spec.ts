import { Role, Roles } from './role'

describe('Role value object', () => {
  it('should create a student role', () => {
    const role = Role.student()
    expect(role.getValue()).toBe(Roles.STUDENT)
  })

  it('should create an instructor role', () => {
    const role = Role.instructor()
    expect(role.getValue()).toBe(Roles.INSTRUCTOR)
  })

  it('should create a role via create method', () => {
    const role = Role.create(Roles.INSTRUCTOR)
    expect(role.getValue()).toBe(Roles.INSTRUCTOR)
  })

  it('should return true when comparing equal roles', () => {
    const role1 = Role.student()
    const role2 = Role.student()
    expect(role1.equals(role2)).toBe(true)
  })

  it('should return false when comparing different roles', () => {
    const role1 = Role.student()
    const role2 = Role.instructor()
    expect(role1.equals(role2)).toBe(false)
  })
})
