import { Card, CardContent, CardHeader } from "../card";
import { ExtendedUser } from "@/auth";
import { Badge } from "../badge";
import InfoCard from "./InfoCard";

type Props = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: Props) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoCard label="ID">{user?.id}</InfoCard>
        <InfoCard label="name">{user?.name}</InfoCard>
        <InfoCard label="email">{user?.email}</InfoCard>
        <InfoCard label="role">{user?.role}</InfoCard>
        <InfoCard label="Two Factor Authentication">
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </InfoCard>
      </CardContent>
    </Card>
  );
};
