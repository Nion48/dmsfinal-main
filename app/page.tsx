
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-blue-900/40 border border-blue-400/20 rounded-2xl shadow-2xl p-10 text-center">

        <h1 className="text-3xl font-bold text-white mb-4">
          Página Inicial do Sistema
        </h1>

        <p className="text-blue-200 text-lg mb-10">
          Bem-vindo ao Sistema de Gerenciamento de Alunos
        </p>

        <div className="flex flex-col gap-5">

          <Link
            href="/alunos/cadastro"
            className="w-full rounded-xl p-4 font-semibold text-white
            bg-gradient-to-r from-blue-600 to-cyan-500
            hover:from-blue-500 hover:to-cyan-400
            shadow-lg shadow-blue-900/40
            transition-all duration-300 hover:scale-105"
          >
            + Cadastrar Aluno
          </Link>

          <Link
            href="/alunos/consulta"
            className="w-full rounded-xl p-4 font-semibold text-blue-100
            bg-blue-800/60 border border-blue-400/30
            hover:bg-blue-700
            shadow-lg
            transition-all duration-300 hover:scale-105"
          >
            Consultar Aluno
          </Link>

        </div>

        <p className="text-blue-300/60 text-sm mt-10">
          Sistema de Gerenciamento de Alunos
        </p>

      </div>
    </div>
  );
}
