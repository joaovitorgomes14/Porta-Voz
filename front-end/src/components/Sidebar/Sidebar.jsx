export default function Sidebar({ open, activePage, onNavigate }) {
  const mainItems = [
    {
      page: "dashboard",
      label: "Dashboard",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      page: "complaints",
      label: "Reclamações",
      badge: 3,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      page: "setores",
      label: "Setores",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const managementItems = [
    {
      page: "admins",
      label: "Administradores",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      page: "reports",
      label: "Relatórios",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      page: "settings",
      label: "Configurações",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93A10 10 0 1 0 4.93 19.07 10 10 0 0 0 19.07 4.93z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-30
        flex flex-col
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ width: "240px", background: "#1A3A5C" }}
    >
      {/* Brand */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            width: 36, height: 36, background: "#2E86DE",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", marginBottom: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <h2 style={{ color: "white", fontSize: 14, fontWeight: 600, letterSpacing: "0.3px" }}>
          Prefeitura de Viçosa
        </h2>
        <p style={{ color: "#8BA8C4", fontSize: 11, marginTop: 2 }}>Portal da Voz — Painel Admin</p>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        <p style={{ fontSize: 10, color: "#5C7E9F", letterSpacing: "0.8px", textTransform: "uppercase", padding: "8px 10px 4px", fontWeight: 600 }}>
          Principal
        </p>
        {mainItems.map((item) => {
          const isActive = activePage === item.page;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate?.(item.page)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "9px 12px",
                borderRadius: 7, cursor: "pointer",
                color: isActive ? "white" : "#8BA8C4",
                fontSize: 13, fontWeight: 500,
                background: isActive ? "#2E86DE" : "transparent",
                border: "none", marginBottom: 2,
                textAlign: "left",
              }}
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <span
                  style={{
                    marginLeft: "auto", background: "#E74C3C", color: "white",
                    fontSize: 10, fontWeight: 700, padding: "1px 6px",
                    borderRadius: 10, minWidth: 18, textAlign: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <p style={{ fontSize: 10, color: "#5C7E9F", letterSpacing: "0.8px", textTransform: "uppercase", padding: "16px 10px 4px", fontWeight: 600 }}>
          Gestão
        </p>
        {managementItems.map((item) => {
          const isActive = activePage === item.page;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate?.(item.page)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "9px 12px",
                borderRadius: 7, cursor: "pointer",
                color: isActive ? "white" : "#8BA8C4",
                fontSize: 13, fontWeight: 500,
                background: isActive ? "#2E86DE" : "transparent",
                border: "none", marginBottom: 2,
                textAlign: "left",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              width: 30, height: 30, background: "#2E86DE",
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 11, fontWeight: 700,
              color: "white", flexShrink: 0,
            }}
          >
            JV
          </div>
          <div>
            <p style={{ color: "white", fontSize: 12, fontWeight: 500 }}>João Vitor</p>
            <span style={{ color: "#5C7E9F", fontSize: 10 }}>Administrador Geral</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
