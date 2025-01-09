import {supabase} from "./supabase"

//=====================================================================================================================
//Task取得用

//全てのタスクを取得
export const gettask = async () =>{
    const task = await supabase.from("Task").select("*").order("id", { ascending: true }); // idで昇順に並べる
    return task
}

//指定したカテゴリのタスクを取得
export const getCategorytask = async (category_id:string) =>{

         // category_id を数値に変換
  const numericCategoryId = parseInt(category_id, 10);
    const task = await supabase.from("Task").select("*").eq("category_id", numericCategoryId).order("id", { ascending: true }); // idで昇順に並べる
    return task
}

//ALLのカテゴリのタスクを取得
export const getAlltask = async (all:number) =>{
const task = await supabase.from("Task").select("*").eq("all", all).order("id", { ascending: true }); // idで昇順に並べる
return task
}

//task追加用
export const addtask = async (title:string,description:string,emergency:string,status:string,category_id:string) =>{
      // category_id を数値に変換
  const numericCategoryId = parseInt(category_id, 10);

    await supabase.from("Task").insert({title:title,description:description,emergency:emergency,status:status ,category_id:numericCategoryId})
}
//=====================================================================================================================


//=====================================================================================================================
//Category取得用
export const getCategory = async () =>{
    const category = await supabase.from("Category").select("*").order("id", { ascending: true }); // idで昇順に並べる
    return category
}
//Category追加用
export const addCategory = async (category:string) =>{
    await supabase.from("Category").insert({category:category})
}
//=====================================================================================================================



//=====================================================================================================================

// //category内のtaskの詳細取得用
// export const getCategoryDescription = async (category_Id : number) =>{
//     const categoryDescription = await supabase
//     .from("categoryDescription")
//     .select("*")
//     .eq("category_id", category_Id)
//     return categoryDescription
// }

// //categoryにtask追加用
// export const addTask = async (category_id : number,taskTitle : string,taskDescription : string) =>{
//     await supabase.from("categoryDescription").insert({category_id:category_id,taskTitle:taskTitle ,taskDescription:taskDescription})
// }
// //=====================================================================================================================



// //削除用
// export const deleteTodo = async (id:number)=>{
//     await supabase.from("chat").delete().eq("id",id)
// }

// //更新用
// export const updateTodo = async (id:number,isCompleted:boolean)=>{
//     await supabase.from("chat").update({isCompleted:isCompleted}).eq("id",id)
// }