import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Image
            src={"/logo.png"}
            alt="Welth Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <SignedOut>
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-700"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-700"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="flex items-center gap-2"
            >
              <Button variant="outline" className="border-black/10 bg-white/70">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="border-black/10 bg-white/70">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
