import React, { useState } from "react";
import Layout from "@/components/layout";
import {
  useGetUsersQuery,
} from "@/services/pollsService";
import { DataTable } from "@/components/memberTable";
import { columns } from "@/components/column";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const INITIAL_URL = "https://codedman.pythonanywhere.com/auth/users/";

export default function Members() {
  const [currentUrl, setCurrentUrl] = useState(INITIAL_URL);
  const { data: getUser, isLoading: isUsersLoading} = useGetUsersQuery({url: currentUrl});
  const userData = getUser?.results || [];
  const nextUrl = getUser?.next || null;
  const previousUrl = getUser?.previous || null;

  // Handlers to update the URL state
  const handleNextPage = () => {
    if (nextUrl) {
      setCurrentUrl(nextUrl);
    }
  };

  const handlePreviousPage = () => {
    if (previousUrl) {
      setCurrentUrl(previousUrl);
    }
  };


  return (
    <Layout>
      <div className="w-fit my-8 flex justify-end">
        {/* <Button text="Create user"></Button> */}
        <Link href="/createAdmin">
        <Button  className="text-xl text-main bg-white hover:text-white items-end">Create user</Button>
        </Link>
        </div>
      {isUsersLoading ? <Spinner /> :
     
      <div>
        <DataTable
          columns={columns}
          data={userData}
          nextPageUrl={nextUrl}
          previousPageUrl={previousUrl}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
}
    </Layout>
  );
}
