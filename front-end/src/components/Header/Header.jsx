export default function Header({ onMenuClick, onNotificationsClick, unreadCount }) {
  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #E4E9F0",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: 8,
            border: "1px solid #E4E9F0", background: "white", cursor: "pointer",
          }}
          aria-label="Abrir menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#445A72" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1A3A5C" }}>
            Dashboard de Reclamações
          </div>
          {/*<div style={{ fontSize: 12, color: "#7A8FA6", marginTop: 1 }}>
            Atualizado em{" "}
            {new Date().toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div> */}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onNotificationsClick}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 7,
            border: "1px solid #E0E7EF", background: "white",
            color: "#445A72", fontSize: 13, fontWeight: 500, cursor: "pointer",
            position: "relative",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Notificações
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                minWidth: 16,
                height: 16,
                lineHeight: "16px",
                fontSize: 10,
                fontWeight: 700,
                background: "#E74C3C",
                color: "white",
                borderRadius: 8,
                textAlign: "center",
                padding: "0 4px",
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}
