import { UserForm } from "@/components/user-form";

export default function NewUserPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">新規ユーザー作成</h1>
      <UserForm />
    </div>
  );
}
