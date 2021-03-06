import * as express from 'express'
import { User } from '../models/User'
import { Role } from '../models/Role'
import { findAllUsers, updateOneUser,  insertOneUser, findUserById, deleteOneUser } from '../services/user-service'
import { UserDTO } from '../dtos/UserDTO'


export const userRouter = express.Router()
// this will work almost exactly like it does with userRouter up in index


//generally a get request to the root of a path
//will give you every single one of those resources
userRouter.get('',   async (req,res)=>{
    //get all of our users
    //format them to json
    //use the response obj to send them back
    let users:User[] = await findAllUsers(); 
    res.json(users)// this will format the object into json and send it back
    
})

// in express we can add a path variable by using a colon in the path
// this will add it to the request object and the colon makes it match anything
userRouter.get('/:id',  async (req,res)=>
{
  
  
    const id = +req.params.id// the plus sign is to type coerce into a number
   
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findUserById(id)
            
            res.json(user)

           

        }catch(e){
            res.status(e.status).send(e.message)
        }
      
        
    }
})



// PATCH - update USER
userRouter.patch('',  async (req,res)=>
{
    let { userId, userName, password,  firstName, lastName,   email, role, gender } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    console.log(JSON.stringify(req.body))
   

    if(userName && password && email && userId && firstName && lastName && role.roleid && role.role && gender)
    {

    let roleObject: Role  = new Role(role.roleid, role.role)    
    let uDTO:UserDTO = new UserDTO(userId,userName,password,firstName,lastName,email,role.roleid, role.role, gender)
    

    let newUser = await updateOneUser(uDTO)
    res.status(201).json(newUser);

    console.log(JSON.stringify( newUser ) )
} 
else {
    res.status(400).send('Please include all user fields')
   
    // for setting a status and a body
     }
})




// PATCH - insert USER
userRouter.put('',  async (req,res)=>
{
    let { userId, userName, password,  firstName, lastName,   email, role, gender } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    console.log(JSON.stringify(req.body))
   

    if(userName && password && email && userId && firstName && lastName && role.roleid && role.role && gender)
    {

    let roleObject: Role  = new Role(role.roleid, role.role)    
    let uDTO:UserDTO = new UserDTO(0,userName,password,firstName,lastName,email,role.roleid, role.role, gender)
    

    let newUser = await insertOneUser(uDTO)
    res.status(201).json(newUser);

    console.log(JSON.stringify( newUser ) )
} 
else {
    res.status(400).send('Please include all user fields')
   
    // for setting a status and a body
     }
})






// DELETE USER
userRouter.delete('',  async (req,res)=>
{
    let { userId } = req.body// this will be where the data the sent me is
    // the downside is this is by default just a string of json, not a js object
    console.log(JSON.stringify(req.body))
   
    console.log("userId ="+userId );
    if( userId )
    {       
        try { let userDeleted = await deleteOneUser(userId)   }
            
        catch(e) 
         {   console.log("========Error is ======" +e)  }
    // res.status(201).json(userDeleted);

   // console.log(JSON.stringify( userDeleted ) )
} 
else {
    res.status(400).send('User not found')
   
    // for setting a status and a body
     }
})