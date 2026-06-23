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

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Nova reclamação aberta",
    message: "Buraco na via do bairro Centro precisa ser verificado.",
    date: "2026-06-17T14:20:00",
    lida: false,
    type: "Alerta",
  },
  {
    id: 2,
    title: "Relatório semanal disponível",
    message: "O relatório de desempenho foi gerado e está pronto para revisão.",
    date: "2026-06-16T09:15:00",
    lida: true,
    type: "Informação",
  },
  {
    id: 3,
    title: "Atualização no setor de limpezas",
    message: "A equipe de limpeza urbana atualizou o status de uma demanda urgente.",
    date: "2026-06-15T18:05:00",
    lida: false,
    type: "Atualização",
  },
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
  const [menuOpen, setMenuOpen]         = useState(false);
  const [complaints, setComplaints]     = useState(INITIAL_COMPLAINTS);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [setorFilter, setSetorFilter]   = useState("");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathToPage = {
    "/dashboard": "dashboard",
    "/dashboard/complaints": "complaints",
    "/dashboard/setores": "setores",
    "/dashboard/admins": "admins",
    "/dashboard/reports": "reports",
    "/dashboard/settings": "settings",
    "/dashboard/notifications": "notifications",
  };

  const pageToPath = {
    dashboard: "/dashboard",
    complaints: "/dashboard/complaints",
    setores: "/dashboard/setores",
    admins: "/dashboard/admins",
    reports: "/dashboard/reports",
    settings: "/dashboard/settings",
    notifications: "/dashboard/notifications",
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
    notifications: "Notificações",
  };

  const PAGE_DESCRIPTIONS = {
    dashboard: "Visão geral das reclamações e indicadores do município.",
    complaints: "Lista de todas as demandas registradas para acompanhamento detalhado.",
    setores: "Status e atividades dos setores de atendimento da cidade.",
    admins: "Gerencie usuários com acesso ao painel administrativo.",
    reports: "Relatórios e métricas que ajudam a priorizar intervenções.",
    settings: "Opções do sistema e preferências de exibição.",
    notifications: "Acompanhe alertas de serviço, atualizações e avisos recentes.",
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

    if (activePage === "notifications") {
      return (
        <div style={SECTION_CARD}>
          <div style={SECTION_HEADER}>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Notificações</h2>
              <p style={{ fontSize: 12, color: "#7A8FA6", marginTop: 2 }}>
                Veja os avisos, alertas e atualizações mais recentes do painel.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={() => setShowUnreadOnly((v) => !v)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #E4E9F0",
                  background: showUnreadOnly ? "#2E86DE" : "white",
                  color: showUnreadOnly ? "white" : "#445A72",
                  cursor: "pointer",
                }}
              >
                {showUnreadOnly ? "Ver todas" : "Somente não lidas"}
              </button>
              <button
                onClick={() => setNotifications((prev) => prev.map((item) => ({ ...item, lida: true })))}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #E4E9F0",
                  background: "#2E86DE",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Marcar todas como lidas
              </button>
            </div>
          </div>

          <div style={{ padding: 20, display: "grid", gap: 12 }}>
            {notificationsToDisplay.length === 0 ? (
              <div style={{ padding: 24, background: "#F9FBFD", borderRadius: 14, color: "#5A6B7D" }}>
                {showUnreadOnly
                  ? "Nenhuma notificação não lida no momento."
                  : "Nenhuma notificação disponível."}
              </div>
            ) : (
              notificationsToDisplay.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    background: notification.lida ? "#FFFFFF" : "#EEF6FF",
                    border: "1px solid #E4E9F0",
                    borderRadius: 16,
                    padding: 20,
                    display: "grid",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ display: "block", fontSize: 14, color: "#1A3A5C" }}>{notification.title}</strong>
                      <span style={{ fontSize: 12, color: "#7A8FA6" }}>{notification.type}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#7A8FA6" }}>
                      {new Date(notification.date).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: "#445A72", fontSize: 13 }}>{notification.message}</p>
                  {!notification.lida && (
                    <button
                      onClick={() => setNotifications((prev) => prev.map((item) => item.id === notification.id ? { ...item, lida: true } : item))}
                      style={{
                        alignSelf: "flex-start",
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "none",
                        background: "#2E86DE",
                        color: "white",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      Marcar como lida
                    </button>
                  )}
                </div>
              ))
            )}
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

  const notificationsToDisplay = notifications.filter((notification) =>
    !showUnreadOnly || !notification.lida
  );

  // Summary counts
  const pendentes  = complaints.filter((c) => c.status === "Pendente").length;
  const andamento  = complaints.filter((c) => c.status === "Em andamento").length;
  const resolvidas = complaints.filter((c) => c.status === "Resolvido").length;
  const unreadNotifications = notifications.filter((notification) => !notification.lida).length;

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
        unreadCount={unreadNotifications}
      />

      <div
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          minWidth: 0,
  
        }}
      >
        <Header
          onMenuClick={() => setMenuOpen((v) => !v)}
          onNotificationsClick={() => handleNavigate("notifications")}
          unreadCount={unreadNotifications}
        />

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
