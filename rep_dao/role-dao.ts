import { PoolClient } from "pg";
import { connectionPool } from ".";


import { BadCredentialsError} from '../errors/BadCredentialsError'
import { InternalServerError } from "../errors/InternalServerError"; // 500 
import { UserNotFoundError } from "../errors/UserNotFoundError"; //404
import { RoleNotFoundError }  from  "../errors/RoleNotFoundError" ;

import { roleDTOToRoleConverter } from "../util/role-dto-to-role-converter";
import { RoleDTO } from "../dtos/RoleDTO";
import { Role } from "../models/Role";


// this function gets anf formats all roles
export async function daoFindAllRoles():Promise<Role[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query(' SELECT * FROM project0."role" r order by r.roleid  ')
        return results.rows.map(roleDTOToRoleConverter)

    }
    catch(e)
    {   console.log(" get all roles error " +e);
        throw new InternalServerError()
    } finally 
    {
        client && client.release()
    }

}


// get role by id 




// get user By ID
export async function daoFindRoleById(id:number):Promise<Role>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0."role" r WHERE r.roleid = $1', [id])
        if(result.rowCount === 0)
        {
            throw new Error('Role Not Found')
        }
        return roleDTOToRoleConverter(result.rows[0])

    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='Role Not Found')
        {
            throw new RoleNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

