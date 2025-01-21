import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CategoryDialogProps = {
  isAdd: boolean;
  onClose: () => void;
  setIsAddCategory: Dispatch<SetStateAction<boolean>>;
};

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  isAdd,
  onClose,
  setIsAddCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");

  // サーバーへのデータ送信
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/category/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newCategory, // APIに渡すデータ
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
      } else {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsAddCategory((prev) => !prev);
    onClose(); // モーダルを閉じる
    setNewCategory(""); // 入力フィールドをクリア
  };

  //==============================================================

  return (
    <Dialog open={isAdd} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category Name</DialogTitle>
          <DialogDescription>
            Please enter the category name you want to add.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit">追加</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
