
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
   const router = useRouter();
 //@typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogout = (e: any) => {
    e.preventDefault(); 
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    router.push('/'); 
  };
  const navLinks = [
    {
      id: 1,
      link: "/poll",
      text: "Polls",
      onClick: null,
    },
    {
      id: 2,
      link: "#",
      text: "Logout",
      onClick: handleLogout,
    },
  ];


  return (
    <div className="bg-[#001124] text-white py-4 w-full fixed flex justify-between items-center px-8 top-0 ">
      <div>
        <h1 className="text-4xl font-bold font-serif ">Vote</h1>
      </div>
      <div className="flex gap-x-6">
        {navLinks.map((navLink, index) => (
          <Link
            key={index}
            className=""
            href={navLink.link}
            {...(navLink.onClick ? { onClick: navLink.onClick } : {})}
          >
            <p className="text-lg font-medium hover:border-b-2 hover:border-[#015FC7]">
              {navLink.text}
            </p>
          </Link>
        ))}
      </div>

      <p className="text-base font-medium"></p>
    </div>
  );
}
