import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/Navbar";

export default async function AdminPopupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_authenticated");

  if (!isAuthenticated) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}
