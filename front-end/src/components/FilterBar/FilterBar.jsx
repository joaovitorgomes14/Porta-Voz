export default function FilterBar({ search, setSearch }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
      <label className="block text-sm font-medium text-slate-700 mb-2">Buscar por categoria</label>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Digite uma categoria"
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
      />
    </section>
  )
}
