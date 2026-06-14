import { useState } from "react";

import Header from "../../components/Header/Header";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterBar from "../../components/FilterBar/FilterBar";
import ComplaintTable from "../../components/ComplaintTable/ComplaintTable";
import AdminManager from "../../components/AdminManager/AdminManager";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      categoria: "Buraco",
      bairro: "Centro",
      status: "Pendente",
      prioridade: "Alta",
      setor: "Obras",
    },
    {
      id: 2,
      categoria: "Iluminação",
      bairro: "Nova Viçosa",
      status: "Resolvido",
      prioridade: "Média",
      setor: "Iluminação Pública",
    },
    {
      id: 3,
      categoria: "Lixo",
      bairro: "Centro",
      status: "Em andamento",
      prioridade: "Urgente",
      setor: "Limpeza Urbana",
    },
  ]);

  const handleStatusChange = (id, novoStatus) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: novoStatus }
          : item
      )
    );
  };

  const handlePriorityChange = (id, novaPrioridade) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, prioridade: novaPrioridade }
          : item
      )
    );
  };

  const handleSectorChange = (id, novoSetor) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, setor: novoSetor }
          : item
      )
    );
  };

  const filteredComplaints = complaints.filter((item) =>
    item.categoria.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">

      <Sidebar open={menuOpen} />

      <div className="bg-slate-100 min-h-screen">

        <Header
          onMenuClick={() => setMenuOpen(!menuOpen)}
        />

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
                (c) => c.status === "Em andamento"
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
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onSectorChange={handleSectorChange}
          />

          <AdminManager />

        </main>
      </div>
    </div>
  );
}