"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

type NavigationLinkProps = {
  path: string;
  route: string;
};

export default function NavigationLink({ path, route }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "text-[#1F2937] hover:text-indigo-600 transition-colors",
        isActive && "text-indigo-800 font-semibold"
      )}
    >
      {route}
    </Link>
  );
}
