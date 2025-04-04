/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FriendRequest {
  id: string;
  sender: {
    id: string;
    name: string;
    img: string;
  };
  createdAt: string;
}

export const FriendRequests = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/friends/requests");
      if (!response.ok) throw new Error("申請の取得に失敗しました");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      toast.error("友達申請の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (requestId: string) => {
    try {
      const response = await fetch("/api/friends/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast.success("友達申請を承認しました");
      setRequests(requests.filter((req) => req.id !== requestId));
      router.refresh();
    } catch (error) {
      toast.error("友達申請の承認に失敗しました");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (requests.length === 0) {
    return <div>友達申請はありません</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">友達申請</h2>
      <div className="space-y-2">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-2">
              <img
                src={request.sender.img}
                alt={request.sender.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div>{request.sender.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button onClick={() => acceptRequest(request.id)} variant="outline">
              承認する
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
