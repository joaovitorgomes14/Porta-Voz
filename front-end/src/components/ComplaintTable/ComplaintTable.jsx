const STATUS_STYLES = {
  Pendente:      { background: "#FEF5E7", color: "#B7770D" },
  "Em andamento": { background: "#EBF4FE", color: "#1A6EBE" },
  Resolvido:     { background: "#E8F8F0", color: "#1A7A42" },
};

const PRIORITY_COLORS = {
  Urgente: "#C0392B",
  Alta:    "#E67E22",
  Média:   "#2E86DE",
  Baixa:   "#27AE60",
};

const TH_STYLE = {
  padding: "10px 16px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  color: "#7A8FA6",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  borderBottom: "1px solid #E4E9F0",
};

const TD_STYLE = {
  padding: "12px 16px",
  fontSize: 13,
  color: "#2D4356",
  borderBottom: "1px solid #F0F4F8",
  verticalAlign: "middle",
};

const SELECT_STYLE = {
  border: "1px solid #DDE4ED",
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 12,
  color: "#445A72",
  background: "white",
  outline: "none",
  cursor: "pointer",
};

const BTN_STYLE = {
  padding: "5px 10px",
  borderRadius: 6,
  border: "1px solid #DDE4ED",
  background: "white",
  fontSize: 12,
  color: "#445A72",
  cursor: "pointer",
  fontWeight: 500,
};

const BTN_DANGER_STYLE = {
  ...BTN_STYLE,
  color: "#C0392B",
  borderColor: "#F5C6C2",
};

export default function ComplaintTable({ complaints, onStatusChange, onPriorityChange, onSectorChange, onDelete }) {
  if (complaints.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 14, color: "#7A8FA6" }}>Nenhuma reclamação encontrada para os filtros selecionados.</div>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#F8FAFC" }}>
            <th style={TH_STYLE}>ID</th>
            <th style={TH_STYLE}>Categoria</th>
            <th style={TH_STYLE}>Bairro</th>
            <th style={TH_STYLE}>Status</th>
            <th style={TH_STYLE}>Prioridade</th>
            <th style={TH_STYLE}>Setor</th>
            <th style={TH_STYLE}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item.id}>
              <td style={{ ...TD_STYLE, color: "#7A8FA6", fontSize: 12 }}>
                #{String(item.id).padStart(3, "0")}
              </td>

              <td style={TD_STYLE}>
                <strong style={{ fontWeight: 600 }}>{item.categoria}</strong>
              </td>

              <td style={TD_STYLE}>{item.bairro}</td>

              <td style={TD_STYLE}>
                <span
                  style={{
                    ...STATUS_STYLES[item.status],
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "3px 9px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {item.status}
                </span>
              </td>

              <td style={TD_STYLE}>
                <select
                  value={item.prioridade}
                  onChange={(e) => onPriorityChange?.(item.id, e.target.value)}
                  style={{
                    ...SELECT_STYLE,
                    color: PRIORITY_COLORS[item.prioridade] || "#445A72",
                  }}
                >
                  <option>Urgente</option>
                  <option>Alta</option>
                  <option>Média</option>
                  <option>Baixa</option>
                </select>
              </td>

              <td style={TD_STYLE}>
                <select
                  value={item.setor}
                  onChange={(e) => onSectorChange(item.id, e.target.value)}
                  style={SELECT_STYLE}
                >
                  <option>Obras</option>
                  <option>Limpeza Urbana</option>
                  <option>Iluminação Pública</option>
                  <option>Saúde</option>
                  <option>Educação</option>
                </select>
              </td>

              <td style={{ ...TD_STYLE, borderBottom: undefined }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                    style={SELECT_STYLE}
                  >
                    <option>Pendente</option>
                    <option>Em andamento</option>
                    <option>Resolvido</option>
                  </select>
                  <button
                    onClick={() => onDelete && onDelete(item.id)}
                    style={BTN_DANGER_STYLE}
                  >
                    Remover
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
