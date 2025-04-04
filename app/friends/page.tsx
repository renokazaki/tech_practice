import { UserSearch } from "@/components/user-search";
import { FriendRequests } from "@/components/friend-requests";
import { FriendPosts } from "@/components/friend-posts";

export default function FriendsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-6">友達を探す</h1>
        <UserSearch />
      </section>

      <section>
        <FriendRequests />
      </section>

      <section>
        <FriendPosts />
      </section>
    </div>
  );
}
