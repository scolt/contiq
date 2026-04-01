import { NavBar } from "@/components/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
