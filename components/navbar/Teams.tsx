import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import {
  getAlltask,
  getCategory,
  getCategorytask,
} from "@/lib/supabasefunction";
import { Button } from "../ui/button";
type Category = {
  id: number;
  category: string;
};

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

type SelectCategoryProps = {
  selectCategory: string;
  setSelectCategory: React.Dispatch<React.SetStateAction<string>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};
const Teams: React.FC<SelectCategoryProps> = ({
  selectCategory,
  setSelectCategory,
  setTasks,
}) => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    // カテゴリを取得する関数
    const fetchAllCategory = async () => {
      try {
        const allCategory = await getCategory();
        if (allCategory.data) {
          // データをStateに設定
          setCategory(allCategory.data as Category[]);
          // console.log("取得したカテゴリ:", allCategory.data); // デバッグ用
        } else {
          console.error("カテゴリの取得に失敗しました:", allCategory.error); // エラーをログ出力
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };
    // fetchAllCategoryを呼び出す
    fetchAllCategory();
  }, [selectCategory]);

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        let alltask;
        // カテゴリがallまたは1の場合は全てのタスクを取得
        if (selectCategory === "all" || selectCategory === "1") {
          alltask = await getAlltask(1);
        } else {
          alltask = await getCategorytask(selectCategory);
        }
        if (alltask.data) {
          setTasks(alltask.data as Task[]);
        } else {
          console.error("タスクの取得に失敗しました:", alltask.error);
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };
    fetchAllTask();
  }, [selectCategory]);

  return (
    <Select onValueChange={(value) => setSelectCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectCategory} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id.toString()}
              className="cursor-pointer border-b-2"
            >
              <div onClick={() => console.log(item.category)}>
                {item.category}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>

        <Button className="w-[180px] mt-2">
          <PlusIcon className=" flex justify-center " />
          create category
        </Button>
      </SelectContent>
    </Select>
  );
};

export default Teams;
