import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCategory } from "@/lib/supabasefunction";

type CategoryDialogProps = {
  isAdd: boolean;
  onClose: () => void;
};

const CategoryDialog: React.FC<CategoryDialogProps> = ({ isAdd, onClose }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      await addCategory(newCategory); // カテゴリを追加
      setNewCategory(""); // 入力欄をリセット
      onClose(); // ダイアログを閉じる
    } else {
      alert("カテゴリ名を入力してください。");
    }
  };

  return (
    <Dialog open={isAdd} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category Name</DialogTitle>
          <DialogDescription>
            Please enter the category name you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleAddCategory}>追加</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
