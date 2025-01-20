import {supabase} from "./supabase"


//登録時にUser作成
export const createUser = async (userId:string,userName:string) =>{

await supabase.from("User").insert({userId:userId,userName:userName})
}



// Emergency と Status を型として定義
type Emergency = "low" | "middle" | "high";
type Status = "pending" | "in progress" | "done";

// Task の型定義
type Task = {
  id: number;
  title: string;
  description: string;
  emergency: Emergency;
  status: Status;
};

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


//タスクの更新用関数
export const updateTask = async (id:number, updatedData:Task) => {
  await supabase.from('Task') // テーブル名を指定
      .update(updatedData) // 更新するデータを渡す
      .eq('id', id); // 条件（idが一致するレコードを更新）
}


//タスク削除用=====================================================================================================================

export const deleteTask = async (id: number) => {
       await supabase
        .from("Task") // テーブル名を指定
        .delete()
        .eq("id", id); // id が一致するデータを削除
}
//=====================================================================================================================
//タスク並び替え用=====================================================================================================================

// //ALLのカテゴリのタスクを並び替え
export const getAllSortTask = async (all:number,orderValue:string,flag:boolean) =>{
      // orderValue を小文字に変換
  const lowerCaseOrderValue = orderValue.toLowerCase();
    const task = await supabase.from("Task").select("*").eq("all", all).order(lowerCaseOrderValue, { ascending: flag }); // idで昇順に並べる
    return task
    }

//指定したカテゴリのタスクを並び替え=====================================================================================================================
export const getCategorySortTask = async (category_id:string ,orderValue:string ,flag:boolean) =>{
    // category_id を数値に変換
const numericCategoryId = parseInt(category_id, 10);
  // orderValue を小文字に変換
  const lowerCaseOrderValue = orderValue.toLowerCase();
const task = await supabase.from("Task").select("*").eq("category_id", numericCategoryId).order(lowerCaseOrderValue, { ascending: flag }); // idで昇順に並べる
return task
}
