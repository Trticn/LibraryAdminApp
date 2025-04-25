export function compareMembersByMonth(users) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Trenutni mesec (0-11)
    const currentYear = currentDate.getFullYear(); // Trenutna godina
  
    // Parsiramo korisnike
    const parsedUsers = users.map(user => {
      const [day, month, year] = user.date.split('/').map(Number);
      return {
        ...user,
        userDate: new Date(year, month - 1, day) // Kreiramo datum za svakog korisnika
      };
    });
  const totalUsers = parsedUsers.length
    // Broj korisnika do kraja trenutnog meseca
    const usersUntilCurrentMonth = parsedUsers.filter(u =>
      (u.userDate.getFullYear() === currentYear && u.userDate.getMonth() <= currentMonth) ||
      (u.userDate.getFullYear() < currentYear)
    ).length;
  
    // Broj korisnika do kraja prethodnog meseca
    const usersUntilPreviousMonth = parsedUsers.filter(u =>
      (u.userDate.getFullYear() === currentYear && u.userDate.getMonth() <= currentMonth - 1) ||
      (currentMonth === 0 && u.userDate.getFullYear() === currentYear - 1 && u.userDate.getMonth() === 11) ||
      (u.userDate.getFullYear() < currentYear)
    ).length;
  
    // Izračunavanje procentualne promene između meseci
    const change =
      usersUntilPreviousMonth === 0
        ? usersUntilCurrentMonth > 0 ? 100 : 0
        : ((usersUntilCurrentMonth - usersUntilPreviousMonth) / usersUntilPreviousMonth) * 100;
  
    return {
      totalUsers,
      usersUntilPreviousMonth,
      usersUntilCurrentMonth,
      percentChange: +change.toFixed(2)
    };
  }
  
  



export function compareNewMembersByMonth(users) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const parsedUsers = users.map(user => {
      const [day, month, year] = user.date.split('/').map(Number);
      return {
        ...user,
        userDate: new Date(year, month - 1, day)
      };
    });
  
    const currentMonthCount = parsedUsers.filter(u =>
      u.userDate.getFullYear() === currentYear &&
      u.userDate.getMonth() === currentMonth
    ).length;
  
    const previousMonthCount = parsedUsers.filter(u =>
      (u.userDate.getFullYear() === currentYear && u.userDate.getMonth() === currentMonth - 1) ||
      (currentMonth === 0 && u.userDate.getFullYear() === currentYear - 1 && u.userDate.getMonth() === 11)
    ).length;
  
    const change =
      previousMonthCount === 0
        ? currentMonthCount > 0 ? 100 : 0
        : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
  
    return {
      currentMonthCount,
      previousMonthCount,
      percentChange: +change.toFixed(2)
    };
  }
  

  export function getMostFrequentAuthor(allBooks) {
    const authorCount = allBooks.reduce((acc, { author }) => {
      if (author) {
        acc[author] = (acc[author] || 0) + 1;
      }
      return acc;
    }, {});
  
    const mostFrequentAuthor = Object.entries(authorCount)
      .sort(([, countA], [, countB]) => countB - countA)
      .shift()[0];
  
    return mostFrequentAuthor;
  };
  

export function getMostFrequentBook (books) {
  const sortedBooks = [...books].sort((a, b) => b.borrowCount - a.borrowCount);
  return sortedBooks[0]

};
