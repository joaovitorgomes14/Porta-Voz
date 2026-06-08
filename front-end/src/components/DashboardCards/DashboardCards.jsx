export default function DashboardCards({ total, pendentes, andamento, resolvidas }) {
  const cards = [
    { label: 'Total', value: total, color: 'bg-blue-500' },
    { label: 'Pendentes', value: pendentes, color: 'bg-amber-500' },
    { label: 'Em andamento', value: andamento, color: 'bg-emerald-500' },
    { label: 'Resolvidas', value: resolvidas, color: 'bg-violet-500' },
  ]

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
          <div className={`h-2 w-full rounded-full ${card.color} mb-3`} />
          <p className="text-sm text-slate-500">{card.label}</p>
          <strong className="text-2xl font-bold text-slate-800">{card.value}</strong>
        </article>
      ))}
    </section>
  )
}
