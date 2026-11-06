
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";

type Aluno = {
    id: string;
    nome: string;
    idade: string;
    email: string;
    telefone: string;
}

export default function ConsultarAluno() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [busca, setBusca] = useState("");
    const [excluir, setExcluir] = useState<Aluno | null>(null);

    useEffect(() => {
        pb.collection("tb_aluno")
            .getFullList<Aluno>({ sort: "nome", requestKey: null })
            .then(setAlunos);
    }, []);

    const filtrados = alunos.filter((a) =>
        a.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    async function confirmarExclusao() {
        if (!excluir) return;
        await pb.collection("tb_aluno").delete(excluir.id);
        setAlunos((lista) => lista.filter((a) => a.id !== excluir.id));
        setExcluir(null);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-100 p-6">

            <div className="max-w-6xl mx-auto">

                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">
                        Consulta de Alunos
                    </h1>

                    <p className="text-blue-700">
                        Consulte, altere ou exclua os alunos cadastrados no sistema
                    </p>
                </div>

                {/* Área principal */}
                <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6">

                    {/* Pesquisa */}
                    <div className="mb-6">
                        <label className="block text-blue-900 font-semibold mb-2">
                            Buscar aluno
                        </label>

                        <input
                            type="text"
                            placeholder="Digite o nome do aluno..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="w-full rounded-lg border border-cyan-200 bg-sky-50 p-3 text-blue-950 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition"
                        />
                    </div>

                    {/* Quantidade de alunos */}
                    <div className="mb-4 text-sm text-blue-700">
                        Alunos encontrados: <strong>{filtrados.length}</strong>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto rounded-lg border border-blue-100">

                        <table className="w-full bg-white text-blue-950 text-sm">

                            <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                                <tr>
                                    <th className="p-4 text-left">Nome</th>
                                    <th className="p-4 text-left">Idade</th>
                                    <th className="p-4 text-left">E-mail</th>
                                    <th className="p-4 text-left">Telefone</th>
                                    <th className="p-4 text-center">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtrados.map((a) => (
                                    <tr
                                        key={a.id}
                                        className="border-t border-blue-100 hover:bg-cyan-50 transition-colors"
                                    >
                                        <td className="p-4 font-medium">{a.nome}</td>
                                        <td className="p-4">{a.idade}</td>
                                        <td className="p-4">{a.email}</td>
                                        <td className="p-4">{a.telefone}</td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">

                                                <Link
                                                    href={`/alunos/alterar/${a.id}`}
                                                    className="rounded-lg px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                                >
                                                    Alterar
                                                </Link>

                                                <button
                                                    onClick={() => setExcluir(a)}
                                                    className="rounded-lg px-3 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                                                >
                                                    Deletar
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filtrados.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-8 text-center text-blue-500"
                                        >
                                            Nenhum aluno encontrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>

                {/* Modal de exclusão */}
                {excluir && (
                    <div className="fixed inset-0 bg-blue-950/50 backdrop-blur-sm flex items-center justify-center p-4">

                        <div className="bg-white text-blue-950 rounded-2xl p-7 w-full max-w-md shadow-2xl border border-cyan-200">

                            <h2 className="text-xl font-bold text-blue-900 mb-3">
                                Confirmar exclusão
                            </h2>

                            <p className="mb-6 text-blue-700">
                                Deseja realmente deletar o aluno{" "}
                                <strong className="text-blue-950">
                                    {excluir.nome}
                                </strong>?
                            </p>

                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() => setExcluir(null)}
                                    className="rounded-lg px-4 py-2 bg-sky-100 text-blue-800 hover:bg-sky-200 transition-colors"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={confirmarExclusao}
                                    className="rounded-lg px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                                >
                                    Sim, deletar
                                </button>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
