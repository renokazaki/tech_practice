"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  img: string;
}

export const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState<string | null>(null);

  const searchUsers = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/users/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("検索エラー:", error);
      toast.error("ユーザー検索中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (userId: string) => {
    try {
      setSending(userId);
      const response = await fetch("/api/friends/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId: userId }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast.success("友達申請を送信しました");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("友達申請エラー:", error);
      toast.error(
        error instanceof Error ? error.message : "友達申請の送信に失敗しました"
      );
    } finally {
      setSending(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="ユーザー名を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchUsers()}
        />
        <Button onClick={searchUsers} disabled={loading}>
          {loading ? "検索中..." : "検索"}
        </Button>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.img}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.name}</span>
            </div>
            <Button
              onClick={() => sendFriendRequest(user.id)}
              variant="outline"
              disabled={sending === user.id}
            >
              {sending === user.id ? "送信中..." : "友達申請を送信"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
