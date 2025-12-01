import React, { useState } from "react";
import BoxCard from "../../components/boxCard";
import Layout from "@/components/layout";
import {
  useGetActivePollsQuery,
  useGetRoleCountQuery,
  useGetUsersQuery,
} from "@/services/pollsService";
import { DataTable } from "@/components/memberTable";
import { columns } from "@/components/column";
import { Spinner } from "@/components/ui/spinner";

const INITIAL_URL = "https://codedman.pythonanywhere.com/auth/users/";

export default function Dashboard() {
  const { data: roleCount, isLoading: isRoleLoading  } = useGetRoleCountQuery({});
  const { data: activePoll, isLoading: isActivePollLoading } = useGetActivePollsQuery();
  const [currentUrl, setCurrentUrl] = useState(INITIAL_URL);
  const { data: getUser, isLoading: isUsersLoading} = useGetUsersQuery({url: currentUrl});
const isLoading = isRoleLoading || isActivePollLoading || isUsersLoading;

 
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
      {isLoading &&  <Spinner />} 
      <div className="grid md:grid-cols-4 sm:grid-cols-2  gap-10  py-10">
        {roleCount &&
          Object.entries(roleCount as Record<string, string | number>).map(
            ([role, count]) => (
              <BoxCard key={role} text={role} number={count} />
            )
          )}
        {activePoll && (
          <BoxCard text="Active Polls" number={activePoll?.count} />
        )}
        {getUser && <BoxCard text="Total members" number={getUser?.count} />}
      </div>
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

      {/* <BoxCard text={{roleCount.voter}} number={roleCount.voter} /> */}
    </Layout>
  );
}
