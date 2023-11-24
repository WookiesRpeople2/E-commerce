import { cn } from "@/lib/utils";
import Link from "next/link";

type DesktopNavbarProps = {
  links: {
    link: string;
    label?: string;
    clicked: boolean;
  }[];
};

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ links }) => {
  return (
    <div className="w-full h-full flex items-center space-x-4">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.link}
          className={cn(
            "first:text-xl first:font-semibold first:opacity-100 first:text-black dark:first:text-white",
            link.clicked ? "opacity-100" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
