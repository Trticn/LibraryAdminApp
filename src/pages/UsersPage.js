// UsersPage.js
import { Helmet } from 'react-helmet';
import UsersList from '../components/UsersList';
import { FiUsers, FiTrendingUp, FiClock,FiTrendingDown } from 'react-icons/fi';
import { compareMembersByMonth,compareNewMembersByMonth } from '../helpers';
import { useMemo } from 'react';
import { useFetchUsersQuery } from '../store';
import Skeleton from '../components/Skeleton';



const UsersPage = () => {
  const {data:allUsers, isFetching,error} = useFetchUsersQuery();


  const usersStats = useMemo(() => {
    if (!allUsers) return [];
    return{
      quantity:compareMembersByMonth(allUsers),
      monthlyChange:compareNewMembersByMonth(allUsers),
      inactive:compareMembersByMonth(allUsers.filter(user=>!user.active))
  
    }

  }, [allUsers]);

  let content;
  
  
  if (isFetching) {
    content = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mb-8">
  <Skeleton className="h-20 w-full rounded-lg" times={3} />
</div>
    );
  }else if (error) {
    content = (
      <div className="p-5 bg-red-50 text-red-600 rounded-lg m-5 text-center">
            <p className="font-medium">Došlo je do greške pri učitavanju</p>
            <p className="text-sm mt-1">Pokušajte osvježiti stranicu</p>
          </div>
    );
  } else content = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
    {[
      { 
        title: "Ukupno članova", 
        value: usersStats.quantity.totalUsers, 
        change: usersStats.quantity.percentChange, 
        icon: usersStats.quantity.percentChange > 0 ? <FiTrendingUp className="text-green-500"/> :<FiTrendingDown className='text-red-500'/>,
        trend: usersStats.quantity.percentChange > 0 ? 'up' : 'down',
   
      },
      { 
        title: "Novih ovog mjeseca", 
        value: usersStats.monthlyChange.currentMonthCount, 
        change: usersStats.monthlyChange.percentChange,
        icon: usersStats.monthlyChange.percentChange > 0 ? <FiTrendingUp className="text-green-500"/> :<FiTrendingDown className='text-red-500'/>,
        trend: usersStats.monthlyChange.percentChange > 0 ? 'up' : 'down',
     
      },
      { 
        title: "Neaktivnih", 
        value: usersStats.inactive.totalUsers, 
        change: usersStats.inactive.percentChange,
        icon: usersStats.monthlyChange.percentChange < 0 ? <FiTrendingUp className="text-green-500"/> :<FiTrendingDown className='text-red-500'/>,
        trend: usersStats.inactive.percentChange < 0 ? 'up' : 'down',

      }
    ].map((stat, index) => (
    
      <div 
        key={index} 
        className={`bg-white p-5 rounded-xl border-l-4 border-${stat.color}-500 shadow-xs hover:shadow-sm transition-shadow`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-lg`}>
            {stat.icon}
          </div>
        </div>
        <p className={`text-sm mt-3 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          <span className="font-medium">{stat.change}%</span> u odnosu na prošli mjesec
        </p>
      </div>
    ))}
  </div>
  )


  return (
    <div className="container users-page mx-auto">
      <Helmet>
        <title>Upravljanje članovima | Biblioteka</title>
      </Helmet>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FiUsers className="text-indigo-600" />
              Upravljanje članovima
            </h1>
            <p className="text-gray-500 mt-2">Pregled i administracija svih članova biblioteke</p>
          </div>
        </div>

        {/* Stats Cards */}
          {content}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <UsersList />
      </div>
    </div>
  );
};

export default UsersPage;