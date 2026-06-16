import { useState } from "react";

const CARGO_STYLES = {
  "Administrador Geral": { background: "#EBF4FE", color: "#1A6EBE" },
  "Administrador":        { background: "#E8FAF6", color: "#0D7A60" },
  "Moderador":            { background: "#F0F4F8", color: "#445A72" },
};

function Initials({ name }) {
  const parts = name.trim().split(" ");
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

const INPUT_STYLE = {
  border: "1px solid #DDE4ED",
  borderRadius: 7,
  padding: "7px 10px",
  fontSize: 13,
  color: "#2D4356",
  background: "white",
  outline: "none",
  width: "100%",
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

export default function AdminManager() {
  const [admins, setAdmins] = useState([
    { id: 1, nome: "João Vitor",  email: "joao@portavoz.com",  cargo: "Administrador Geral" },
    { id: 2, nome: "Maria Silva", email: "maria@portavoz.com", cargo: "Moderador" },
  ]);

  const [novoAdmin, setNovoAdmin] = useState({ nome: "", email: "", cargo: "Moderador" });
  const [erro, setErro] = useState("");

  const adicionarAdmin = () => {
    if (!novoAdmin.nome.trim() || !novoAdmin.email.trim()) {
      setErro("Preencha o nome e o e-mail antes de adicionar.");
      return;
    }
    setErro("");
    setAdmins((prev) => [...prev, { id: Date.now(), ...novoAdmin }]);
    setNovoAdmin({ nome: "", email: "", cargo: "Moderador" });
  };

  const removerAdmin = (id) => {
    if (admins.length === 1) {
      setErro("É necessário manter ao menos um administrador.");
      return;
    }
    setErro("");
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      {/* Form */}
      <div
        style={{
          padding: "16px 20px",
          background: "#F8FAFC",
          borderBottom: "1px solid #F0F4F8",
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140 }}>
          <label style={{ fontSize: 11, color: "#7A8FA6", fontWeight: 600 }}>Nome completo</label>
          <input
            type="text"
            placeholder="Ex: Ana Souza"
            value={novoAdmin.nome}
            onChange={(e) => setNovoAdmin({ ...novoAdmin, nome: e.target.value })}
            style={INPUT_STYLE}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 160 }}>
          <label style={{ fontSize: 11, color: "#7A8FA6", fontWeight: 600 }}>E-mail institucional</label>
          <input
            type="email"
            placeholder="ana@vicosa.mg.gov.br"
            value={novoAdmin.email}
            onChange={(e) => setNovoAdmin({ ...novoAdmin, email: e.target.value })}
            style={INPUT_STYLE}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 160, maxWidth: 200 }}>
          <label style={{ fontSize: 11, color: "#7A8FA6", fontWeight: 600 }}>Cargo</label>
          <select
            value={novoAdmin.cargo}
            onChange={(e) => setNovoAdmin({ ...novoAdmin, cargo: e.target.value })}
            style={INPUT_STYLE}
          >
            <option>Moderador</option>
            <option>Administrador</option>
            <option>Administrador Geral</option>
          </select>
        </div>

        <button
          onClick={adicionarAdmin}
          style={{
            background: "#2E86DE", color: "white",
            border: "none", borderRadius: 7,
            padding: "8px 16px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", whiteSpace: "nowrap", alignSelf: "flex-end",
          }}
        >
          + Adicionar
        </button>
      </div>

      {/* Error */}
      {erro && (
        <div
          style={{
            padding: "8px 20px",
            background: "#FDF0EF",
            borderBottom: "1px solid #FAD4D0",
            fontSize: 12, color: "#C0392B",
          }}
        >
          {erro}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              <th style={TH_STYLE}>Usuário</th>
              <th style={TH_STYLE}>E-mail</th>
              <th style={TH_STYLE}>Cargo</th>
              <th style={TH_STYLE}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td style={TD_STYLE}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: "#EBF4FE",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, color: "#1A6EBE", flexShrink: 0,
                      }}
                    >
                      <Initials name={admin.nome} />
                    </div>
                    {admin.nome}
                  </div>
                </td>

                <td style={{ ...TD_STYLE, color: "#7A8FA6" }}>{admin.email}</td>

                <td style={TD_STYLE}>
                  <span
                    style={{
                      ...CARGO_STYLES[admin.cargo],
                      display: "inline-flex",
                      padding: "3px 9px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {admin.cargo}
                  </span>
                </td>

                <td style={TD_STYLE}>
                  <button
                    onClick={() => removerAdmin(admin.id)}
                    style={{
                      padding: "5px 10px", borderRadius: 6,
                      border: "1px solid #F5C6C2",
                      background: "white", fontSize: 12,
                      color: "#C0392B", cursor: "pointer", fontWeight: 500,
                    }}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
