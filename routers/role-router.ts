import * as express from 'express'
import { Role } from '../models/Role'

import { findAllRoles, findRoleById} from '../services/role-service'
import { RoleDTO } from '../dtos/RoleDTO'


export const roleRouter = express.Router()
// this will work almost exactly like it does with userRouter up in index


//generally a get request to the root of a path
//will give you every single one of those resources
roleRouter.get('',   async (req,res)=>{
    //get all of our users
    //format them to json
    //use the response obj to send them back
    let roles:Role[] = await findAllRoles(); 
    res.json(roles)// this will format the object into json and send it back
    
})



// get role by id 

// in express we can add a path variable by using a colon in the path
// this will add it to the request object and the colon makes it match anything
roleRouter.get('/:id',  async (req,res)=>
{
  
  
    const id = +req.params.id// the plus sign is to type coerce into a number
   
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let role = await findRoleById(id)
            
            res.json(role)

           

        }catch(e){
            res.status(e.status).send(e.message)
        }
      
        
    }
})