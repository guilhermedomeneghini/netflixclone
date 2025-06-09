import { Prisma } from "@prisma/client";
import { db } from "../../libs/prisma";

export const getProfille = async ()=>{
    const result = await db.profiles.findMany();
    return result;
}

export const createProfile = async (name:string, urlimage:string)=>{
    const result = await db.profiles.create({
        data:{
            name,
            urlimage
        }
    });

    return result;

}