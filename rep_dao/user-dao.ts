import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../models/User";
import { BadCredentialsError} from '../errors/BadCredentialsError'
import { InternalServerError } from "../errors/InternalServerError";
import { userDTOToUserConverter } from "../util/user-dto-to-user-converter";
import { UserDTO } from "../dtos/UserDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";


export async function daoFindUserByUsernameAndPassword(username:string,password:string):Promise<User>{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query('SELECT * FROM project0."user" U inner join project0.role R on U."role" = R.roleid  WHERE username = $1  and "password" = $2', [username,password])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}



// this function gets anf formats all users
export async function daoFindAllUsers():Promise<User[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM project0."user" U inner join project0."role" R on U."role" = R.roleid')
        return results.rows.map(userDTOToUserConverter)

    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }

}



export async function daoFindUserById(id:number):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project0."user" U inner join project0."role" R on U."role" = R.roleid WHERE U.userid = $1', [id])
        if(result.rowCount === 0)
        {
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])

    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='User Not Found')
        {
            throw new UserNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}






// update User
export async function daoUpdateUser(newUser:UserDTO):Promise<User> {
    let client:PoolClient
    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
       
       
        // send an insert that uses the id above and the user input
       

        /** !!! Change query to UPDATE !!! */
        let result = await client
        .query('UPDATE project0."user" SET username=$1, "password"=$2, firstname=$3, lastname=$4, email=$5, "role"=$6 where userid = $7 RETURNING userid;',
        [newUser.username, 
            newUser.password, 
            newUser.firstname,
             newUser.lastname,
              newUser.email, 
              newUser.roleid,
                newUser.userid])
        
        newUser.role = newUser.role
        newUser.roleid = newUser.roleid
        
        
        // put that newly genertaed user_id on the DTO 
        newUser.userid = result.rows[0].userid
        return userDTOToUserConverter(newUser)// convert and send back
    } catch(e)
    {    console.log("Dao user role = "+ newUser.role);
         console.log("Dao user role.id = "+ newUser.roleid );
         console.log("===UserDAO  daoUpdateUser Error ===" + e);
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}



