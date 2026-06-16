export default function FilterBar({ search, setSearch, statusFilter, setStatusFilter, setorFilter, setSetorFilter }) {
  return (
    <div
      style={{
        padding: "14px 20px",
        background: "#F8FAFC",
        borderBottom: "1px solid #F0F4F8",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {/* Search */}
      <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="#9AB0C5" strokeWidth="2"
          style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por categoria, bairro…"
          style={{
            width: "100%",
            border: "1px solid #DDE4ED",
            borderRadius: 7,
            padding: "7px 12px 7px 34px",
            fontSize: 13,
            color: "#445A72",
            background: "white",
            outline: "none",
          }}
        />
      </div>

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          border: "1px solid #DDE4ED",
          borderRadius: 7,
          padding: "7px 12px",
          fontSize: 13,
          color: "#445A72",
          background: "white",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="">Todos os status</option>
        <option value="Pendente">Pendente</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Resolvido">Resolvido</option>
      </select>

      {/* Setor filter */}
      <select
        value={setorFilter}
        onChange={(e) => setSetorFilter(e.target.value)}
        style={{
          border: "1px solid #DDE4ED",
          borderRadius: 7,
          padding: "7px 12px",
          fontSize: 13,
          color: "#445A72",
          background: "white",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="">Todos os setores</option>
        <option value="Obras">Obras</option>
        <option value="Limpeza Urbana">Limpeza Urbana</option>
        <option value="Iluminação Pública">Iluminação Pública</option>
        <option value="Saúde">Saúde</option>
        <option value="Educação">Educação</option>
      </select>
    </div>
  );
}
