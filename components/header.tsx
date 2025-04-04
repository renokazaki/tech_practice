"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "ホーム", href: "/" },
  { name: "友達", href: "/friends" },
];

export const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-gray-600">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <nav className="ml-2 flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                    pathname === item.href
                      ? "border-indigo-500 text-blue-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-white">
                {user.username || user.fullName || "User"}
              </span>
            )}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>ログインしてください</SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};
