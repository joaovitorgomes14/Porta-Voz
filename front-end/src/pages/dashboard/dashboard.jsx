import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

const SAMPLE_SECTORS = [
  { nome: "Obras", descricao: "Fiscalização de vias e manutenção urbana", demandas: 14 },
  { nome: "Limpeza Urbana", descricao: "Coleta de resíduos e varrição de vias", demandas: 9 },
  { nome: "Iluminação Pública", descricao: "Reparo de postes e lâmpadas", demandas: 6 },
];

const SETTINGS_OPTIONS = [
  { label: "Notificações por e-mail", value: true },
  { label: "Relatórios semanais", value: false },
  { label: "Modo escuro", value: false },
];

export default function Dashboard() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [complaints, setComplaints]   = useState(INITIAL_COMPLAINTS);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [setorFilter, setSetorFilter]   = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const pathToPage = {
    "/dashboard": "dashboard",
    "/dashboard/complaints": "complaints",
    "/dashboard/setores": "setores",
    "/dashboard/admins": "admins",
    "/dashboard/reports": "reports",
    "/dashboard/settings": "settings",
  };

  const pageToPath = {
    dashboard: "/dashboard",
    complaints: "/dashboard/complaints",
    setores: "/dashboard/setores",
    admins: "/dashboard/admins",
    reports: "/dashboard/reports",
    settings: "/dashboard/settings",
  };

  const activePage = pathToPage[location.pathname] || "dashboard";
  const handleNavigate = (page) => {
    navigate(pageToPath[page] || "/dashboard");
    setMenuOpen(false);
  };

  const PAGE_TITLES = {
    dashboard: "Painel de Controle",
    complaints: "Reclamações",
    setores: "Setores",
    admins: "Administradores",
    reports: "Relatórios",
    settings: "Configurações",
  };

  const PAGE_DESCRIPTIONS = {
    dashboard: "Visão geral das reclamações e indicadores do município.",
    complaints: "Lista de todas as demandas registradas para acompanhamento detalhado.",
    setores: "Status e atividades dos setores de atendimento da cidade.",
    admins: "Gerencie usuários com acesso ao painel administrativo.",
    reports: "Relatórios e métricas que ajudam a priorizar intervenções.",
    settings: "Opções do sistema e preferências de exibição.",
  };

  const renderPageContent = () => {
    if (activePage === "complaints") {
      return (
        <div style={SECTION_CARD}>
          <div style={SECTION_HEADER}>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Reclamações recentes</h2>
              <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
                Acompanhe todas as pendências de cada bairro e setor.
              </p>
            </div>
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
      );
    }

    if (activePage === "setores") {
      return (
        <div style={{ display: "grid", gap: 20 }}>
          {SAMPLE_SECTORS.map((setor) => (
            <div key={setor.nome} style={SECTION_CARD}>
              <div style={SECTION_HEADER}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>{setor.nome}</h3>
                <span style={{ color: "#7A8FA6", fontSize: 12 }}>{setor.demandas} demandas abertas</span>
              </div>
              <p style={{ padding: "0 20px 20px", fontSize: 13, color: "#5A6B7D" }}>{setor.descricao}</p>
            </div>
          ))}
        </div>
      );
    }

    if (activePage === "reports") {
      return (
        <div style={{ display: "grid", gap: 20 }}>
          <div style={SECTION_CARD}>
            <div style={SECTION_HEADER}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Resumo de métricas</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, padding: 20 }}>
              <div style={{ background: "#F9FBFD", borderRadius: 12, padding: 16 }}>
                <strong style={{ display: "block", color: "#1A3A5C", marginBottom: 8 }}>Tempo médio de resolução</strong>
                <span style={{ fontSize: 24, color: "#2E86DE" }}>3.2 dias</span>
              </div>
              <div style={{ background: "#F9FBFD", borderRadius: 12, padding: 16 }}>
                <strong style={{ display: "block", color: "#1A3A5C", marginBottom: 8 }}>Satisfação</strong>
                <span style={{ fontSize: 24, color: "#2E86DE" }}>89%</span>
              </div>
              <div style={{ background: "#F9FBFD", borderRadius: 12, padding: 16 }}>
                <strong style={{ display: "block", color: "#1A3A5C", marginBottom: 8 }}>Ações concluídas</strong>
                <span style={{ fontSize: 24, color: "#2E86DE" }}>128</span>
              </div>
            </div>
          </div>

          <div style={SECTION_CARD}>
            <div style={SECTION_HEADER}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Relatório de atendimentos</h3>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ height: 180, background: "#F4F6F9", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#7A8FA6" }}>
                Gráfico de desempenho aqui
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activePage === "admins") {
      return (
        <div style={SECTION_CARD}>
          <div style={SECTION_HEADER}>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Gerenciamento de administradores</h2>
              <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
                Adicione, edite ou remova contas que têm acesso ao painel.
              </p>
            </div>
          </div>

          <AdminManager />
        </div>
      );
    }

    if (activePage === "settings") {
      return (
        <div style={SECTION_CARD}>
          <div style={SECTION_HEADER}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Preferências do sistema</h3>
          </div>
          <div style={{ padding: 20, display: "grid", gap: 16 }}>
            {SETTINGS_OPTIONS.map((option) => (
              <div key={option.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 12, background: "#F9FBFD" }}>
                <div>
                  <strong style={{ color: "#1A3A5C" }}>{option.label}</strong>
                  <p style={{ margin: 0, color: "#727F92", fontSize: 12 }}>Exemplo de controle do recurso</p>
                </div>
                <span style={{ color: "#2E86DE", fontWeight: 700 }}>{option.value ? "Ativado" : "Desativado"}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={SECTION_CARD}>
        <div style={SECTION_HEADER}>
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Painel de controle</h2>
            <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
              Veja os indicadores principais e as reclamações mais recentes.
            </p>
          </div>
        </div>

        <DashboardCards
          total={complaints.length}
          pendentes={pendentes}
          andamento={andamento}
          resolvidas={resolvidas}
        />

        <div style={SECTION_CARD}>
          <div style={SECTION_HEADER}>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Reclamações</h2>
              <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
                Gerencie status, prioridade e setor responsável.
              </p>
            </div>
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
      </div>
    );
  };

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

      <Sidebar
        open={menuOpen}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

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
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1A3A5C" }}>{PAGE_TITLES[activePage] || "Painel de Controle"}</h1>
            <p style={{ fontSize: 13, color: "#7A8FA6", marginTop: 3 }}>
              {PAGE_DESCRIPTIONS[activePage] || "Gerencie e acompanhe todas as reclamações do município."}
            </p>
          </div>

          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}
