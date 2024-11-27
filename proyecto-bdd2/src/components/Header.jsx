const Header = () => {
  return (
    <header className="flex flex-col items-center py-8 bg-white shadow-md">
      <img src="KFC_log.png" alt="KFC Logo" className="w-32 mb-4" />
      <p className="text-gray-600">@Coronel_Harland_Sanders</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded mt-4">
        Contáctanos
      </button>
    </header>
  );
};

export default Header;
