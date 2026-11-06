
"use client";

import { pb } from "@/lib/pocketbase";

export default function CadastroAluno() {

    async function salvar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const dados = new FormData(form);

        await pb.collection("tb_aluno").create({
            nome: dados.get("nome"),
            idade: dados.get("idade"),
            email: dados.get("email"),
            telefone: dados.get("telefone"),
        });

        alert("Aluno Cadastrado");
        form.reset();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-cyan-100 flex items-center justify-center p-6">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-blue-200 p-8">

                <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">
                    Cadastro de Aluno
                </h1>

                <p className="text-blue-600 text-center mb-8">
                    Preencha os dados para cadastrar um novo aluno
                </p>

                <form onSubmit={salvar} className="flex flex-col gap-4">

                    <div>
                        <label className="block text-blue-900 font-medium mb-1">
                            Nome do aluno
                        </label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Digite o nome do aluno"
                            required
                            className="w-full rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-blue-900 font-medium mb-1">
                            Idade
                        </label>
                        <input
                            type="number"
                            name="idade"
                            placeholder="Digite a idade do aluno"
                            required
                            className="w-full rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-blue-900 font-medium mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite o e-mail do aluno"
                            required
                            className="w-full rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-blue-900 font-medium mb-1">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            name="telefone"
                            placeholder="Digite o telefone do aluno"
                            required
                            className="w-full rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 rounded-lg p-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 shadow-md shadow-blue-200 transition-all duration-300 hover:scale-[1.02]"
                    >
                        Cadastrar Aluno
                    </button>

                </form>

            </div>
        </div>
    );
}
