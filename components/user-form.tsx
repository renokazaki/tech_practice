"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const UserForm = () => {
  const router = useRouter();
  const { user } = useUser();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          img: user?.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("ユーザーの作成に失敗しました");
      }

      toast.success("ユーザーを作成しました");
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">名前</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力してください"
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "作成中..." : "ユーザーを作成"}
      </Button>
    </form>
  );
};
