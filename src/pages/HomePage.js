import { Link } from 'react-router';
import library from '../images/HD-wallpaper-books-library-shelves-lighting-beautiful-library-book.jpg';
import { FiUsers, FiBookOpen, FiCalendar, FiSettings,FiBook,FiAward } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="w-full bg-gray-50">
      {/* Hero sekcija */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover object-center"
          src={library} 
          alt="Biblioteka - Admin pogled" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent flex items-end pb-6 md:pb-12 lg:pb-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4 px-4">
              Dobrodošli, Administratoru
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto px-4">
              Upravljajte bibliotekom, korisnicima i događajima sa jedne centralne lokacije
            </p>
          </div>
        </div>
      </div>

      {/* Admin Features sekcija */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-3 md:mb-4">
            Administratorska kontrola
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-20">
          {[
            { 
              icon: <FiBookOpen className="text-3xl text-indigo-600 mx-auto" />,
              title: "Upravljanje knjigama", 
              text: "Dodaj, ažuriraj i uklanjaj naslove iz kolekcije",
              bg: "bg-indigo-50"
            },
            { 
              icon: <FiUsers className="text-3xl text-emerald-600 mx-auto" />,
              title: "Članovi biblioteke", 
              text: "Pregledaj i uređuj korisničke profile",
              bg: "bg-emerald-50"
            },
            { 
              icon: <FiCalendar className="text-3xl text-amber-500 mx-auto" />,
              title: "Planiranje događaja", 
              text: "Organizuj radionice, promocije i večeri poezije",
              bg: "bg-amber-50"
            },
            { 
              icon: <FiSettings className="text-3xl text-rose-500 mx-auto" />,
              title: "Podešavanja sistema", 
              text: "Konfiguriši pravila, notifikacije i pristup",
              bg: "bg-rose-50"
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className={`${item.bg} p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xs hover:shadow-sm transition-shadow duration-300 h-full`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>

{/* Upravljanje bibliotekom sekcija */}
<div className="bg-white rounded-xl sm:rounded-2xl shadow-xs p-6 sm:p-8 md:p-12 mb-12 md:mb-20">
  <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
    <div className="lg:w-1/2">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-4 sm:mb-6">
        Kako vodimo biblioteku
      </h2>
      <p className="text-gray-600 mb-4">
        Kao administrator, trudim se da biblioteka bude više od mesta za knjige – želimo da bude centar znanja, kulture i zajedništva.
      </p>
      <p className="text-gray-600">
        Upravljanje obuhvata katalogizaciju novih naslova, organizaciju događaja, vođenje evidencije o članovima i praćenje zaduženja, kao i održavanje prijatnog prostora za sve posetioce.
      </p>
    </div>
    <div className="lg:w-1/2 w-full">
      <div className="bg-indigo-50 p-4 sm:p-6 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-3 sm:mb-4">
          Alati i osoblje
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          <li className="flex items-start gap-2">
            <FiBook className="text-indigo-600 mt-1" />
            <span className="text-gray-600 text-sm sm:text-base">
              Koristimo napredni softver za upravljanje knjigama i članovima (MikroBib).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <FiCalendar className="text-emerald-500 mt-1" />
            <span className="text-gray-600 text-sm sm:text-base">
              Planiramo mesečne radionice, gostovanja i promocije knjiga.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <FiAward className="text-amber-500 mt-1" />
            <span className="text-gray-600 text-sm sm:text-base">
              Naš tim čine bibliotekari sa višegodišnjim iskustvom i ljubavlju prema znanju.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>


        {/* Admin akcije */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Dodajte novu knjigu ili događaj
          </h2>
          <p className="text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Brzo unesite nove naslove ili planirajte naredni kulturni događaj direktno iz admin panela
          </p>
          <Link to='/members' className="bg-white text-indigo-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-sm sm:shadow-md text-sm sm:text-base">
            Idi na Administraciju
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
