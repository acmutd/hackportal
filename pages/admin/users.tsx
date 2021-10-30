import Head from 'next/head';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import FilterComponent from '../../components/FilterComponent';
import UserList from '../../components/UserList';
import { mockUserData } from '../../lib/data';

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const getUserList = () => {
    return mockUserData;
  };

  useEffect(() => {
    const userList = getUserList();
    const ul = [];
    for (let i = 0; i < Math.ceil(userList.length / 4); i++) {
      ul.push([]);
    }
    userList.forEach((user, idx) => {
      ul[Math.floor(idx / 4)].push(user);
    });
    setUsers(ul);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section id="subheader" className="p-4">
        <AdminHeader />
      </section>
      <div className="top-6 p-4 flex flex-row items-center gap-x-2">
        <h1 className="font-bold text-lg">Search Users</h1>
        <input
          type="text"
          className="rounded-lg px-2 py-1 w-2/5"
          style={{ backgroundColor: '#F2F3FF' }}
        />
      </div>
      <div className="p-4 flex flex-row w-full">
        <div className="w-full md:w-1/6 lg:w-1/12 flex flex-col gap-y-4">
          <div>
            <h1 className="text-md font-bold text-center">Filters</h1>
            <FilterComponent title="Hackers" />
            <FilterComponent title="Sponsors" />
            <FilterComponent title="Organizers" />
          </div>
          <div className="my-4">
            <h1 className="text-md font-bold text-center mb-4">Sort By:</h1>
            <h4 className="text-md text-center">Alphabetically</h4>
            <h4 className="text-md text-center">User Level</h4>
          </div>
        </div>
        <div className="w-full">
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}
