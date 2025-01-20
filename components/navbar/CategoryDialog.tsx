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
import { addCategoryAction } from "@/lib/actions/addCategoryAction";

type CategoryDialogProps = {
  isAdd: boolean;
  onClose: () => void;
};

const CategoryDialog: React.FC<CategoryDialogProps> = ({ isAdd, onClose }) => {
  const [newCategory, setNewCategory] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addCategoryAction({ title: newCategory });
    setNewCategory("");
    onClose();
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
