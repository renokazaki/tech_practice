import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Teams } from "./Teams";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-2 py-2">
      <div className="flex items-start">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>

      {/* Teams コンポーネント */}
      <div className="flex items-end">
        <Teams />
      </div>
    </nav>
  );
};

export default Navbar;
