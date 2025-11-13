
import { LogOut, Vote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useGetProfileQuery, useLogoutMutation } from "@/services";
import { toast } from "sonner";
import { adminNavLinks, userNavLinks } from "@/data";

export default function Navbar() {
   const router = useRouter();
   const [isLogout] = useLogoutMutation()
     const { data, } = useGetProfileQuery();
     const getProfile =  data?.role
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleLogout = async (e: any) => {
    e.preventDefault(); 
    const refresh_token = sessionStorage.getItem("refresh_token") || undefined;
    await isLogout({refresh: refresh_token})
    .unwrap()
    .then(() => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
      }
      toast.success("Logout successful!");
      router.push('/'); 
    })
   }



  return (
    <div className="bg-[#001124] text-white py-4 w-full fixed flex justify-between items-center px-8 top-0 border-b border-border/50 backdrop-blur-sm  z-50 ">
      <div className="flex items-center gap-3">
       <div className="p-2 rounded-lg bg-primary/10 neon-glow">
            <Vote className="w-6 h-6 text-[#015FC7]" />
          </div>
          <h1 className="text-2xl font-bold neon-text">VoteHub</h1>
      </div>
      <div className="flex gap-x-6">
        {getProfile === "admin" ?
        <>{  adminNavLinks.map((navLink, index) => (
          <Link
            key={index}
            className=""
            href={navLink.link}
            {...(navLink.onClick ? { onClick: navLink.onClick } : {})}
          >
            <p className="text-lg font-medium hover:border-b-2 hover:border-[hsl(212,99%,39%)]">
              {navLink.text}
            </p>
          </Link>
        ))}</> : getProfile === "voter" ?
        <>
          { userNavLinks.map((navLink, index) => (
          <Link
            key={index}
            className=""
            href={navLink.link}
            {...(navLink.onClick ? { onClick: navLink.onClick } : {})}
          >
            <p className="text-lg font-medium hover:border-b-2 hover:border-[hsl(212,99%,39%)]">
              {navLink.text}
            </p>
          </Link>
        ))}</> : null
        }
      
      </div>

      <div className="flex items-center gap-4">
          {/* <span className="text-sm text-muted-foreground">{user?.email}</sp</Link>an> */}
          <Button variant="neon" className="neon-text" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
    </div>
  );
}
