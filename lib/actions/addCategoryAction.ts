"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";


type AddCategoryData = {
    title: string;
  };
export async function addCategoryAction(data: AddCategoryData) {
  const {userId} =await auth()

if(!userId){
  return
}

try{
await prisma.category.create({
  data:{
    id:data.title,
    userId:userId,
   
  }
})

  // `/` のパスを再検証
  revalidatePath("/");

}catch(err){
  console.log(err)
}

}