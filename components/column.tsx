"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  serial: number,
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  first_name: string
}

export const columns: ColumnDef<Payment>[] = [
  {
       accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "first_name",
    header: "Firstname",
  },
    {
    accessorKey: "surname",
    header: "Surname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    // 2. IMPLEMENT CUSTOM CELL RENDERER
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const normalizedRole = role.toLowerCase();
      
      let badgeClasses = "px-2 py-1 rounded-full capitalize text-base";

     
      if (normalizedRole === "admin") {
        badgeClasses += " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      } else if (normalizedRole === "voter") {
        badgeClasses += " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      } else {
        // Default style for any other role
        badgeClasses += " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      }

      return (
        <span className={badgeClasses}>
          {role}
        </span>
      );
    },
  },
]