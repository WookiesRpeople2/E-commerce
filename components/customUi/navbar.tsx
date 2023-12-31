"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PopoverAvatar } from "@/components/customUi/popoverAvatar";
import { Store } from "@prisma/client";
import { CreateStore } from "@/components/customUi/createStores";
import { ToggleTheme } from "@/components/customUi/toggleTheme";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DesktopNavbar } from "./desktopNavbar";
import { MobileNavbar } from "./mobileNavbar";

type NavbarProps = {
  stores: Store[];
};

export const Navbar: React.FC<NavbarProps> = ({ stores }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const storeName = stores.find(
    (store) => store.id === params.storeId
  )?.storeName;

  const handleOnClick = async () => {
    router.refresh();
    router.push(`/${params.storeId}/newStore`);
  };

  const handleOnChange = async (value: string) => {
    const storeId = stores.find(
      (store) => store.storeName.toLowerCase() === value
    )?.id;
    router.refresh();
    router.push(`/${storeId}`);
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    {
      link: `/${params.storeId}`,
      label: storeName,
      clicked: pathname === `/${params.storeId}`,
    },
    {
      link: `/${params.storeId}`,
      label: "dashboard",
      clicked: pathname === `/${params.storeId}`,
    },
    {
      link: `/${params.storeId}/collections`,
      label: "collections",
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
      link: `/${params.storeId}/groupes`,
      label: "groupes",
      clicked: pathname === `/${params.storeId}/groupes`,
    },
    {
      link: `/${params.storeId}/products`,
      label: "products",
      clicked: pathname === `/${params.storeId}/products`,
    },
    {
      link: `/${params.storeId}/payments`,
      label: "payments",
      clicked: pathname === `/${params.storeId}/payments`,
    },
    {
      link: `/${params.storeId}/settings`,
      label: "settings",
      clicked: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className="h-20 shadow-md flex px-4 justify-between items-center w-full">
      <div className="lg:hidden">
        <MobileNavbar links={links} />
      </div>
      <div className="w-full h-full items-center space-x-4 hidden lg:flex">
        <DesktopNavbar links={links} />
      </div>
      <div className="flex space-x-4">
        <CreateStore
          currentStoreName={storeName as string}
          handleOnChange={(value) => handleOnChange(value)}
          handleOnClick={handleOnClick}
          stores={stores}
        />
        <ToggleTheme />
        <PopoverAvatar />
      </div>
    </nav>
  );
};
