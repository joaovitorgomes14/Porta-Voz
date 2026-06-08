export default function ComplaintTable({ complaints }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 overflow-x-auto">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">Reclamações</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="pb-2 pr-4">ID</th>
            <th className="pb-2 pr-4">Categoria</th>
            <th className="pb-2 pr-4">Bairro</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item.id} className="border-b last:border-b-0">
              <td className="py-2 pr-4">{item.id}</td>
              <td className="py-2 pr-4">{item.categoria}</td>
              <td className="py-2 pr-4">{item.bairro}</td>
              <td className="py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
