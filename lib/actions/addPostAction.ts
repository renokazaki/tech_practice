// lib/actions/addPostAction.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addPostAction(data: any) {
  const {userId} =await auth()

if(!userId){
  return
}

try{
await prisma.task.create({
  data:{
    title:data.title,
    description:data.description,
    emergency:data.emergency,
    status:data.status,
    userId:userId,
    categoryId:data.category
  }
})

  // `/` のパスを再検証
  revalidatePath("/");

}catch(err){
  console.log(err)
}

}