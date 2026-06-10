export default function ComplaintTable({
  complaints,
  onStatusChange,
  onPriorityChange,
  onSectorChange,
}) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 overflow-x-auto">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">
        Reclamações
      </h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="pb-2 pr-4">ID</th>
            <th className="pb-2 pr-4">Categoria</th>
            <th className="pb-2 pr-4">Bairro</th>
            <th className="pb-2 pr-4">Status</th>
            <th className="pb-2 pr-4">Prioridade</th>
            <th className="pb-2">Setor</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((item) => (
            <tr
              key={item.id}
              className="border-b last:border-b-0"
            >
              <td className="py-3 pr-4">{item.id}</td>

              <td className="py-3 pr-4">
                {item.categoria}
              </td>

              <td className="py-3 pr-4">
                {item.bairro}
              </td>

              <td className="py-3 pr-4">
                <select
                  value={item.status}
                  onChange={(e) =>
                    onStatusChange(
                      item.id,
                      e.target.value
                    )
                  }
                  className="border rounded px-2 py-1"
                >
                  <option>Pendente</option>
                  <option>Em andamento</option>
                  <option>Resolvido</option>
                </select>
              </td>

              <td className="py-3 pr-4">
                <select
                  value={item.prioridade}
                  onChange={(e) =>
                    onPriorityChange(
                      item.id,
                      e.target.value
                    )
                  }
                  className="border rounded px-2 py-1"
                >
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                  <option>Urgente</option>
                </select>
              </td>

              <td className="py-3">
                <select
                  value={item.setor}
                  onChange={(e) =>
                    onSectorChange(
                      item.id,
                      e.target.value
                    )
                  }
                  className="border rounded px-2 py-1"
                >
                  <option>Obras</option>
                  <option>Limpeza Urbana</option>
                  <option>Iluminação Pública</option>
                  <option>Saúde</option>
                  <option>Educação</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}