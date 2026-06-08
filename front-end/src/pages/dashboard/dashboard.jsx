import { useState } from "react";

import Header from "../../components/Header/Header";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterBar from "../../components/FilterBar/FilterBar";
import ComplaintTable from "../../components/ComplaintTable/ComplaintTable";

export default function Dashboard() {

const [search, setSearch] = useState("");

const complaints = [
{
id: 1,
categoria: "Buraco",
bairro: "Centro",
status: "Pendente",
},
{
id: 2,
categoria: "Iluminação",
bairro: "Nova Viçosa",
status: "Resolvido",
},
{
id: 3,
categoria: "Lixo",
bairro: "Centro",
status: "Andamento",
},
];

const filteredComplaints =
complaints.filter((item) =>
item.categoria
.toLowerCase()
.includes(search.toLowerCase())
);

return (
  <div className="min-h-screen bg-slate-100">
    <Header />

  <main className="p-6 space-y-6">

    <DashboardCards
      total={complaints.length}
      pendentes={
        complaints.filter(
          (c) => c.status === "Pendente"
        ).length
      }
      andamento={
        complaints.filter(
          (c) => c.status === "Andamento"
        ).length
      }
      resolvidas={
        complaints.filter(
          (c) => c.status === "Resolvido"
        ).length
      }
    />

    <FilterBar
      search={search}
      setSearch={setSearch}
    />

    <ComplaintTable
      complaints={filteredComplaints}
    />

  </main>

</div>

);
}
