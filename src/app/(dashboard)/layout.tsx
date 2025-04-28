import Image from "next/image";
import Link from "next/link";
import Menu from "src/components/Menu";
import Navbar from "src/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="xlg:w-1/6 flex h-screen w-1/6 flex-col p-4 md:w-1/12 lg:w-1/6">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 lg:justify-start"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">EduDash</span>
        </Link>
        <div className="overflow-y-auto">
          <Menu />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex h-[100%] flex-1 flex-col overflow-scroll bg-[#F7F8FA]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
