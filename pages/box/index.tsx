import React, { useEffect, useState } from 'react'
import BoxCard from '../../components/boxCard'
import { GetRoleCount } from '@/pages/api/polls'
import AdminLayout from '@/components/AdminLayout'

export default function Box() {
  const [roleCount, setRoleCount] = useState(0)
  useEffect(() => {
    const fetchRoleCount = async () => {
      const response = await GetRoleCount()
      setRoleCount(response.data)
    }
    fetchRoleCount()
  }, [])
  return (
    <AdminLayout>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-10  mx-10 py-10'>
        {Object.entries(roleCount).map(([role, count]) => (
          <BoxCard key={role} text={role} number={count} />
        ))}

      </div>


      {/* <BoxCard text={{roleCount.voter}} number={roleCount.voter} /> */}
    </AdminLayout>
  );
}
