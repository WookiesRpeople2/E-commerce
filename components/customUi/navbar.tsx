"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PopoverAvatar } from "@/components/customUi/popoverAvatar";

type NavbarProps = {
  storeName: string;
};

export const Navbar: React.FC<NavbarProps> = ({ storeName }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const links = [
    {
      link: `/${params.storeId}`,
      label: storeName,
      clicked: pathname === `/${params.storeId}`,
    },
    {
      link: `/${params.storeId}/collections`,
      label: "collection's",
      clicked: pathname === `/${params.storeId}/collections`,
    },
    {
      link: `/${params.storeId}/colors`,
      label: "colors",
      clicked: pathname === `/${params.storeId}/colors`,
    },
    {
      link: `/${params.storeId}/sizes`,
      label: "sizes",
      clicked: pathname === `/${params.storeId}/sizes`,
    },
    {
      link: `/${params.storeId}/products`,
      label: "product's",
      clicked: pathname === `/${params.storeId}/products`,
    },
    {
      link: `/${params.storeId}/settings`,
      label: "settings",
      clicked: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className="h-20 shadow-md flex px-4 justify-between items-center">
      <div className="w-full h-full flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.link}
            className={cn(
              "first:text-xl first:font-semibold",
              link.clicked ? "opacity-100" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <PopoverAvatar />
    </nav>
  );
};
