export default function Header({ onMenuClick }) {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-md flex items-center gap-4 relative z-50">
      <button
        onClick={onMenuClick}
        className="text-2xl hover:bg-slate-800 p-2 rounded"
      >
        ☰
      </button>

      <div>
        <h1 className="text-xl font-semibold">
          Portal da Voz
        </h1>

        <p className="text-sm text-slate-200">
          Painel de reclamações e acompanhamento
        </p>
      </div>
    </header>
  );
}