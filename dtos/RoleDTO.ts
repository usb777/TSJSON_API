export const admin = 'Admin'
export const user = 'User'
export const financeManager = 'Finance-Manager'


export  class RoleDTO
{
    roleid: number // primary key
    role: string // not null, unique

constructor(roleid: number, role: string )
{
    this.roleid = roleid
    this.role = role

}


  }