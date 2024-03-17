"user client";
import { UserInfo } from "@/components/ui/UserInfo/UserInfo";
import { currentUser } from "@/lib/auth";

const ClientPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo user={user} label="📱 Client component" />
    </div>
  );
};

export default ClientPage;
