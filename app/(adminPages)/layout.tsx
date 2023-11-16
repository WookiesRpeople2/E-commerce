import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { Navbar } from "@/components/customUi/navbar";

type AdminLayoutProps = { params: { storeId: string } };

export default async function AdminLayout({
  children,
  params,
}: React.PropsWithChildren<AdminLayoutProps>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const userId = session.user.userId;

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <Navbar stores={stores} />
      {children}
    </>
  );
}
