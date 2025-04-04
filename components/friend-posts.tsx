"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface FriendPost {
  id: string;
  title: string;
  description: string;
  emergency: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    img: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export const FriendPosts = () => {
  const [posts, setPosts] = useState<FriendPost[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/friends/posts");
      if (!response.ok) throw new Error("投稿の取得に失敗しました");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast.error("友達の投稿の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (posts.length === 0) {
    return <div>友達の投稿はありません</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">友達の投稿</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={post.user.img}
                alt={post.user.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium">{post.user.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-gray-600">{post.description}</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                {post.category.name}
              </span>
              <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
                {post.emergency}
              </span>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                {post.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
