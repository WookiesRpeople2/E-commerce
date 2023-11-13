import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { AccountForm } from "./components/accountForm";

export default async function AccountPage({
  params,
}: {
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);

  return <AccountForm session={session} />;
}
