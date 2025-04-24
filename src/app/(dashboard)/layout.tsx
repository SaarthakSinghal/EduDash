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
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="h-screen w-1/6 md:w-1/12 lg:w-1/6 xlg:w-1/6 p-4 flex flex-col">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">SchooLama</span>
        </Link>
        <div className="overflow-y-auto">
        <Menu/>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col flex-1 bg-[#F7F8FA] overflow-scroll h-[100%]">
        <Navbar/>
        {children}
      </div>
    </div>
  );
}
