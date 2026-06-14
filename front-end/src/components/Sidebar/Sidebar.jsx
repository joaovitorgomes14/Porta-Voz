export default function Sidebar({ open }) {
  const menuItems = [
    "Dashboard",
    "Reclamações",
    "Setores",
    "Administradores",
    "Relatórios",
    "Configurações",
  ];

  return (
    <>
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-slate-900
          text-white
          p-5
          z-30
          transform
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h1 className="text-2xl font-bold mt-14 mb-8">
          Porta Voz
        </h1>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="w-full text-left p-3 rounded-lg hover:bg-slate-800"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}