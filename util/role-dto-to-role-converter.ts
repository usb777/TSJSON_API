import { Role } from "../models/Role";
import { RoleDTO } from "../dtos/RoleDTO";


export function roleDTOToRoleConverter(roleDTO:RoleDTO):Role
{
    return new Role(
        roleDTO.roleid,
        roleDTO.role
        
    )
}