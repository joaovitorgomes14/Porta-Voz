import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterBar from "../../components/FilterBar/FilterBar";
import ComplaintTable from "../../components/ComplaintTable/ComplaintTable";
import AdminManager from "../../components/AdminManager/AdminManager";
import { deleteComplaintRequest, getComplaintsRequest, updateComplaintRequest } from "../../api";

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

const SECTOR_DESCRIPTIONS = {
  Obras: "Fiscalização de vias e manutenção urbana",
  "Limpeza Urbana": "Coleta de resíduos e varrição de vias",
  "Iluminação Pública": "Reparo de postes e lâmpadas",
  Saúde: "Atendimento e infraestrutura de saúde pública",
  Educação: "Apoio e manutenção de unidades escolares",
  "Não definido": "Demandas sem setor atribuído ou setor não informado",
};

const SETTINGS_OPTIONS = [
  { label: "Notificações por e-mail", value: true },
  { label: "Relatórios semanais", value: false },
  { label: "Modo escuro", value: false },
];

const NOTIFICATIONS_STORAGE_KEY = "porta-voz-notifications";
const COMPLAINTS_STORAGE_KEY = "porta-voz-complaints";

function loadStoredNotifications() {
  if (typeof window === "undefined") {
    return INITIAL_NOTIFICATIONS;
  }

  try {
    const stored = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (!stored) {
      return INITIAL_NOTIFICATIONS;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
}

function loadStoredComplaints() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(COMPLAINTS_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Dashboard() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [complaints, setComplaints]     = useState(loadStoredComplaints);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [setorFilter, setSetorFilter]   = useState("");
  const [notifications, setNotifications] = useState(loadStoredNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isLoadingComplaints, setIsLoadingComplaints] = useState(true);
  const [settings, setSettings] = useState(() => {
    if (typeof window === "undefined") {
      return SETTINGS_OPTIONS.reduce((acc, option) => ({ ...acc, [option.label]: option.value }), {});
    }

    try {
      const stored = window.localStorage.getItem("porta-voz-settings");
      if (!stored) {
        return SETTINGS_OPTIONS.reduce((acc, option) => ({ ...acc, [option.label]: option.value }), {});
      }

      return JSON.parse(stored);
    } catch {
      return SETTINGS_OPTIONS.reduce((acc, option) => ({ ...acc, [option.label]: option.value }), {});
    }
  });
  const location = useLocation();
  const navigate = useNavigate();
  const complaintsRef = useRef([]);

  const addNotification = useCallback((title, message, type = "Atualização") => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        title,
        message,
        date: new Date().toISOString(),
        lida: false,
        type,
      },
      ...prev,
    ]);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(complaints));
    }
  }, [complaints]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("porta-voz-settings", JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    let isMounted = true;
    let pollingHandle = null;

    async function fetchComplaints() {
      try {
        const response = await getComplaintsRequest();
        const items = Array.isArray(response?.complaints) ? response.complaints : [];

        const mappedComplaints = items.map((item) => ({
          id: item.id,
          categoria: item.descricao || item.categoria || "Sem descrição",
          bairro: item.bairro || "Não informado",
          status: item.status || "Pendente",
          prioridade: item.prioridade || "Média",
          setor: item.setor || "Não definido",
        }));

        if (!isMounted) return;

        const previousIds = complaintsRef.current.map((complaint) => complaint.id);
        const newlyAdded = mappedComplaints.filter((item) => !previousIds.includes(item.id));

        if (newlyAdded.length > 0 && complaintsRef.current.length > 0) {
          addNotification(
            "Nova demanda recebida",
            `${newlyAdded.length} nova(s) reclamação(ões) foi(ram) adicionada(s) ao painel.`,
            "Alerta"
          );
        }

        const shouldUpdate =
          mappedComplaints.length !== complaintsRef.current.length ||
          !mappedComplaints.every((item, index) => item.id === complaintsRef.current[index]?.id);

        if (shouldUpdate) {
          setComplaints(mappedComplaints);
        }

        complaintsRef.current = mappedComplaints;
        setIsLoadingComplaints(false);
      } catch (error) {
        console.error("Erro ao carregar reclamações:", error);
        if (!isMounted) return;
        const stored = loadStoredComplaints();
        setComplaints(stored.length > 0 ? stored : []);
        setIsLoadingComplaints(false);
      }
    }

    fetchComplaints();

    pollingHandle = window.setInterval(() => {
      fetchComplaints();
    }, 10000);

    return () => {
      isMounted = false;
      window.clearInterval(pollingHandle);
    };
  }, [addNotification]);

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
    if (isLoadingComplaints && complaints.length === 0) {
      return (
        <div style={SECTION_CARD}>
          <div style={{ padding: 40, textAlign: "center", color: "#7A8FA6" }}>
            Carregando dados do painel...
          </div>
        </div>
      );
    }

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
      const setorCounts = complaints.reduce((acc, complaint) => {
        const id = complaint.setor || "Não definido";
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      const setores = Object.entries(setorCounts)
        .filter(([, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);

      return (
        <div style={{ display: "grid", gap: 20 }}>
          {setores.length === 0 ? (
            <div style={SECTION_CARD}>
              <div style={{ padding: 40, textAlign: "center", color: "#7A8FA6" }}>
                Nenhuma demanda registrada para exibir setores.
              </div>
            </div>
          ) : (
            setores.map(([nome, demandas]) => (
              <div key={nome} style={SECTION_CARD}>
                <div style={SECTION_HEADER}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>{nome}</h3>
                  <span style={{ color: "#7A8FA6", fontSize: 12 }}>
                    {demandas} demanda{demandas === 1 ? "" : "s"}
                  </span>
                </div>
                <p style={{ padding: "0 20px 20px", fontSize: 13, color: "#5A6B7D" }}>
                  {SECTOR_DESCRIPTIONS[nome] || "Setor com demandas registradas."}
                </p>
              </div>
            ))
          )}
        </div>
      );
    }

    if (activePage === "reports") {
      const setorCounts = complaints.reduce((acc, complaint) => {
        acc[complaint.setor] = (acc[complaint.setor] || 0) + 1;
        return acc;
      }, {});

      const topSetores = Object.entries(setorCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
      const avgResolution = complaints.length > 0 ? Math.max(1, Math.round(complaints.length / 2.5)) : 0;

      return (
        <div style={{ display: "grid", gap: 20 }}>
          <div style={SECTION_CARD}>
            <div style={SECTION_HEADER}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Resumo de métricas</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, padding: 20 }}>
              <div style={{ background: "#F9FBFD", borderRadius: 12, padding: 16 }}>
                <strong style={{ display: "block", color: "#1A3A5C", marginBottom: 8 }}>Tempo médio de resolução</strong>
                <span style={{ fontSize: 24, color: "#2E86DE" }}>{avgResolution} dias</span>
              </div>
              <div style={{ background: "#F9FBFD", borderRadius: 12, padding: 16 }}>
                <strong style={{ display: "block", color: "#1A3A5C", marginBottom: 8 }}>Satisfação</strong>
                <span style={{ fontSize: 24, color: "#2E86DE" }}>{complaints.length > 0 ? "92%" : "Sem dados"}</span>
              </div>
              <div style={{ background: "#F9FBFD", borderRadius: 12, padding: 16 }}>
                <strong style={{ display: "block", color: "#1A3A5C", marginBottom: 8 }}>Ações concluídas</strong>
                <span style={{ fontSize: 24, color: "#2E86DE" }}>{resolvidas}</span>
              </div>
            </div>
          </div>

          <div style={SECTION_CARD}>
            <div style={SECTION_HEADER}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A3A5C" }}>Distribuição por setor</h3>
            </div>
            <div style={{ padding: 20, display: "grid", gap: 12 }}>
              {topSetores.length === 0 ? (
                <div style={{ color: "#7A8FA6" }}>Nenhuma demanda cadastrada ainda.</div>
              ) : (
                topSetores.map(([setor, count]) => (
                  <div key={setor}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "#1A3A5C", fontSize: 13 }}>{setor}</span>
                      <span style={{ color: "#7A8FA6", fontSize: 13 }}>{count} demandas</span>
                    </div>
                    <div style={{ height: 8, background: "#E9EEF3", borderRadius: 999 }}>
                      <div style={{ width: `${Math.min(100, count * 12)}%`, height: "100%", background: "#2E86DE", borderRadius: 999 }} />
                    </div>
                  </div>
                ))
              )}
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
                      onClick={() => markNotificationAsRead(notification.id)}
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
                  <p style={{ margin: 0, color: "#727F92", fontSize: 12 }}>Controle ativo para a experiência de uso.</p>
                </div>
                <button
                  onClick={() => setSettings((prev) => ({ ...prev, [option.label]: !prev[option.label] }))}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid #DDE4ED",
                    background: settings[option.label] ? "#2E86DE" : "white",
                    color: settings[option.label] ? "white" : "#445A72",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {settings[option.label] ? "Ativado" : "Desativado"}
                </button>
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
  const markNotificationAsRead = (id) => {
    setNotifications((prev) => prev.map((item) => item.id === id ? { ...item, lida: true } : item));
  };

  const handleComplaintUpdate = async (id, updates) => {
    const complaintBeforeUpdate = complaints.find((complaint) => complaint.id === id);

    try {
      await updateComplaintRequest(id, updates);
      setComplaints((prev) => prev.map((complaint) => complaint.id === id ? { ...complaint, ...updates } : complaint));

      if (complaintBeforeUpdate) {
        const fieldName = updates.status ? "status" : updates.prioridade ? "prioridade" : "setor";
        const labelValue = updates[fieldName];
        addNotification(
          "Demanda atualizada",
          `${complaintBeforeUpdate.categoria} teve o ${fieldName} alterado para ${labelValue}.`,
          "Atualização"
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar reclamação:", error);
    }
  };

  const handleStatusChange = (id, novoStatus) => handleComplaintUpdate(id, { status: novoStatus });

  const handlePriorityChange = (id, novaPrioridade) => handleComplaintUpdate(id, { prioridade: novaPrioridade });

  const handleSectorChange = (id, novoSetor) => handleComplaintUpdate(id, { setor: novoSetor });

  const handleDelete = async (id) => {
    const complaintToDelete = complaints.find((complaint) => complaint.id === id);

    try {
      await deleteComplaintRequest(id);
      setComplaints((prev) => prev.filter((complaint) => complaint.id !== id));

      if (complaintToDelete) {
        addNotification(
          "Demanda removida",
          `${complaintToDelete.categoria} foi removida da lista de reclamações.`,
          "Alerta"
        );
      }
    } catch (error) {
      console.error("Erro ao remover reclamação:", error);
    }
  };

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
