import AdminContainer from "@/components/admin/AdminContainer";
import { getAllUsers } from "@/data/user";
import React from "react";

const AdminPage = async () => {
  const usersData = await getAllUsers();
  return <AdminContainer users={usersData} />;
};

export default AdminPage;
