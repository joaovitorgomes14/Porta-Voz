import { useState } from "react";

export default function AdminManager() {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      nome: "João Vitor",
      email: "joao@portavoz.com",
      cargo: "Administrador Geral",
    },
    {
      id: 2,
      nome: "Maria Silva",
      email: "maria@portavoz.com",
      cargo: "Moderador",
    },
  ]);

  const [novoAdmin, setNovoAdmin] = useState({
    nome: "",
    email: "",
    cargo: "Moderador",
  });

  const adicionarAdmin = () => {
    if (
      !novoAdmin.nome.trim() ||
      !novoAdmin.email.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const admin = {
      id: Date.now(),
      ...novoAdmin,
    };

    setAdmins((prev) => [...prev, admin]);

    setNovoAdmin({
      nome: "",
      email: "",
      cargo: "Moderador",
    });
  };

  const removerAdmin = (id) => {
    setAdmins((prev) =>
      prev.filter((admin) => admin.id !== id)
    );
  };

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Gerenciamento de Administradores
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={novoAdmin.nome}
          onChange={(e) =>
            setNovoAdmin({
              ...novoAdmin,
              nome: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={novoAdmin.email}
          onChange={(e) =>
            setNovoAdmin({
              ...novoAdmin,
              email: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        />

        <select
          value={novoAdmin.cargo}
          onChange={(e) =>
            setNovoAdmin({
              ...novoAdmin,
              cargo: e.target.value,
            })
          }
          className="border rounded-lg px-3 py-2"
        >
          <option>Moderador</option>
          <option>Administrador</option>
          <option>Administrador Geral</option>
        </select>
      </div>

      <button
        onClick={adicionarAdmin}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Adicionar Administrador
      </button>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-slate-500 text-left">
              <th className="pb-3">Nome</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Cargo</th>
              <th className="pb-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b"
              >
                <td className="py-3">
                  {admin.nome}
                </td>

                <td className="py-3">
                  {admin.email}
                </td>

                <td className="py-3">
                  <span className="px-2 py-1 rounded bg-slate-100">
                    {admin.cargo}
                  </span>
                </td>

                <td className="py-3">
                  <button
                    onClick={() =>
                      removerAdmin(admin.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}