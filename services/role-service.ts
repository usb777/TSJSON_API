import { daoFindAllRoles, daoFindRoleById } from "../rep_dao/role-dao";
import { Role } from "../models/Role";
import { RoleDTO } from "../dtos/RoleDTO";

// we seperated out the concern of finding the appropriate user from our controller
// this means in the future, when we rewrite this method, we shouldn't have to change the function that is calling it
// by seperating these concerns we are loosly coupling our code

export async function findAllRoles():Promise<Role[]>
{
   // I write to a different table, who just sent this request
   // know what time of day, these requests get most sent
   return await daoFindAllRoles()
}




export async function findRoleById(id:number):Promise<Role>
{
   return await daoFindRoleById(id)
}

