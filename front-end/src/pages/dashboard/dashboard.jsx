import { useState } from "react";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterBar from "../../components/FilterBar/FilterBar";
import ComplaintTable from "../../components/ComplaintTable/ComplaintTable";
import AdminManager from "../../components/AdminManager/AdminManager";

const INITIAL_COMPLAINTS = [
  { id: 1, categoria: "Buraco na via",  bairro: "Centro",       status: "Pendente",     prioridade: "Alta",    setor: "Obras" },
  { id: 2, categoria: "Iluminação",     bairro: "Nova Viçosa",  status: "Resolvido",    prioridade: "Média",   setor: "Iluminação Pública" },
  { id: 3, categoria: "Coleta de lixo", bairro: "Centro",       status: "Em andamento", prioridade: "Urgente", setor: "Limpeza Urbana" },
];

const SECTION_CARD = {
  background: "white",
  border: "1px solid #E4E9F0",
  borderRadius: 10,
  marginBottom: 20,
  overflow: "hidden",
};

const SECTION_HEADER = {
  padding: "16px 20px",
  borderBottom: "1px solid #F0F4F8",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Dashboard() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [complaints, setComplaints]   = useState(INITIAL_COMPLAINTS);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [setorFilter, setSetorFilter]   = useState("");

  // Handlers
  const handleStatusChange = (id, novoStatus) =>
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status: novoStatus } : c));

  const handlePriorityChange = (id, novaPrioridade) =>
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, prioridade: novaPrioridade } : c));

  const handleSectorChange = (id, novoSetor) =>
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, setor: novoSetor } : c));

  const handleDelete = (id) =>
    setComplaints((prev) => prev.filter((c) => c.id !== id));

  // Filtered list
  const filtered = complaints.filter((c) => {
    const matchSearch =
      c.categoria.toLowerCase().includes(search.toLowerCase()) ||
      c.bairro.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchSetor  = !setorFilter  || c.setor  === setorFilter;
    return matchSearch && matchStatus && matchSetor;
  });

  // Summary counts
  const pendentes  = complaints.filter((c) => c.status === "Pendente").length;
  const andamento  = complaints.filter((c) => c.status === "Em andamento").length;
  const resolvidas = complaints.filter((c) => c.status === "Resolvido").length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F6F9" }}>
      {/* Overlay when sidebar is open on mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 20,
          }}
        />
      )}

      <Sidebar open={menuOpen} />

      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          minWidth: 0,
          // Push content right when sidebar is open on desktop
          // Use margin-left on larger screens if you want a persistent sidebar
        }}
      >
        <Header onMenuClick={() => setMenuOpen((v) => !v)} />

        <main style={{ padding: 24, flex: 1 }}>
          {/* Page heading */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1A3A5C" }}>Visão Geral</h1>
            <p style={{ fontSize: 13, color: "#7A8FA6", marginTop: 3 }}>
              Gerencie e acompanhe todas as reclamações do município
            </p>
          </div>

          {/* Stats */}
          <DashboardCards
            total={complaints.length}
            pendentes={pendentes}
            andamento={andamento}
            resolvidas={resolvidas}
          />

          {/* Complaints section */}
          <div style={SECTION_CARD}>
            <div style={SECTION_HEADER}>
              <div>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Reclamações</h2>
                <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
                  Gerencie status, prioridade e setor responsável
                </p>
              </div>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 12px", borderRadius: 7,
                  border: "1px solid #E0E7EF", background: "white",
                  color: "#445A72", fontSize: 12, fontWeight: 500, cursor: "pointer",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Exportar CSV
              </button>
            </div>

            <FilterBar
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              setorFilter={setorFilter}
              setSetorFilter={setSetorFilter}
            />

            <ComplaintTable
              complaints={filtered}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onSectorChange={handleSectorChange}
              onDelete={handleDelete}
            />
          </div>

          {/* Admin section */}
          <div style={SECTION_CARD}>
            <div style={SECTION_HEADER}>
              <div>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>
                  Gerenciamento de Administradores
                </h2>
                <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
                  Adicione ou remova usuários com acesso ao painel
                </p>
              </div>
            </div>

            <AdminManager />
          </div>
        </main>
      </div>
    </div>
  );
}
