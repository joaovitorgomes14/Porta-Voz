export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Reclamações",
    "Setores",
    "Administradores",
    "Relatórios",
    "Configurações",
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Porta Voz
      </h1>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}