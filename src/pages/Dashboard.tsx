import PageContainer from "../components/PageContainer";
import GraphicsCard from "../components/graphics/GraphicsCard";

const dados: { dia: string; horas: number }[] = [
  { dia: "Seg", horas: 6 },
  { dia: "Ter", horas: 8 },
  { dia: "Qua", horas: 5 },
  { dia: "Qui", horas: 7 },
  { dia: "Sex", horas: 4 },
  { dia: "Sáb", horas: 2 },
  { dia: "Dom", horas: 0 },
];

const dadosLinha = [
  { dia: "Seg", tasks: 2 },
  { dia: "Ter", tasks: 4 },
  { dia: "Qua", tasks: 6 },
  { dia: "Qui", tasks: 3 },
  { dia: "Sex", tasks: 5 },
  { dia: "Sáb", tasks: 1 },
  { dia: "Dom", tasks: 0 },
];

const dadosRadio = [
  {
    name: "Produtividade",
    value: 78,
  },
];

const usuariosAtivos = [
  { nome: "Ana Costa", status: "Online", descricao: "Revisando relatórios" },
  { nome: "João Silva", status: "Online", descricao: "Organizando arquivos" },
  { nome: "Carlos Souza", status: "Online", descricao: "Respondendo e-mails" },
  {
    nome: "Mariana Lima",
    status: "Online",
    descricao: "Atualizando dashboard",
  },
  { nome: "Fernanda Rocha", status: "Online", descricao: "Preparando reunião" },
  {
    nome: "Lucas Almeida",
    status: "Online",
    descricao: "Gerando PDF de fichas",
  },
  { nome: "Bruna Martins", status: "Online", descricao: "Editando formulário" },
  {
    nome: "Rafael Torres",
    status: "Online",
    descricao: "Analisando produtividade",
  },
  { nome: "Paulo Henrique", status: "Online", descricao: "Lendo documentação" },
  { nome: "Juliana Melo", status: "Online", descricao: "Criando nova ficha" },
];

const ultimasTasks = [
  {
    usuario: "Ana Costa",
    descricao: "Atualizar relatórios semanais",
    data: "30/05/2025",
    prioridade: "Alta",
    progresso: 80,
    tipo: "Wireframe",
  },
  {
    usuario: "João Silva",
    descricao: "Revisar tarefas pendentes",
    data: "29/05/2025",
    prioridade: "Média",
    progresso: 60,
    tipo: "Graphics",
  },
  {
    usuario: "Carlos Souza",
    descricao: "Planejar reunião de equipe",
    data: "29/05/2025",
    prioridade: "Baixa",
    progresso: 100,
    tipo: "Wireframe",
  },
  {
    usuario: "Mariana Lima",
    descricao: "Analisar feedbacks dos clientes",
    data: "28/05/2025",
    prioridade: "Alta",
    progresso: 40,
    tipo: "Graphics",
  },
  {
    usuario: "Fernanda Rocha",
    descricao: "Organizar arquivos do projeto",
    data: "28/05/2025",
    prioridade: "Média",
    progresso: 20,
    tipo: "Wireframe",
  },
];

const totalHoras = dados.reduce((soma, dia) => soma + dia.horas, 0);
const totalTasks = dadosLinha.reduce((soma, dia) => soma + dia.tasks, 0);

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard">
      <div className="flex flex-col lg:flex-row sm:flex-col md:flex-row gap-6 w-full">
        {/* Coluna principal */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Gráficos */}
          <div className="w-full flex flex-col xl:grid xl:grid-cols-[550px_1fr] gap-6">
            <GraphicsCard
              tipo="bar"
              titulo="Horas Trabalhadas na Semana"
              valor={`${totalHoras}h`}
              rotulo="Total semanal"
              dados={dados}
              dataKey="horas"
              labelKey="dia"
              fillColor="#FACC15"
              altura={325}
            />
            <div className="flex flex-col gap-4">
              <GraphicsCard
                tipo="radial"
                titulo="Produtividade"
                valor={`78%`}
                rotulo="de produtividade"
                dados={dadosRadio}
                dataKey="value"
                fillColor="#6EE7B7"
                invertido={true}
                altura={90}
              />
              <GraphicsCard
                tipo="line"
                titulo="Tasks Completadas"
                valor={`${totalTasks}`}
                rotulo="Total da semana"
                dados={dadosLinha}
                dataKey="tasks"
                labelKey="dia"
                fillColor="#FACC15"
                invertido={true}
                altura={90}
              />
            </div>
          </div>

          {/* Últimas Tasks */}
          <div className="bg-white rounded-2xl shadow-md p-4 w-full">
            <h2 className="text-gray-700 text-lg font-semibold mb-4">
              Últimas Tasks Criadas
            </h2>

            <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 border-b pb-2 mb-2">
              <span>Tarefa</span>
              <span>Responsável</span>
              <span>Prioridade</span>
              <span>Tipo</span>
              <span>Progresso</span>
            </div>

            <div className="flex flex-col gap-3">
              {ultimasTasks.map((task, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 items-center text-sm text-gray-700"
                >
                  <span className="truncate">{task.descricao}</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        task.usuario
                      )}&background=random&size=32`}
                      alt={task.usuario}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="truncate">{task.usuario}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${
                      task.prioridade === "Alta"
                        ? "bg-red-100 text-red-600"
                        : task.prioridade === "Média"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.prioridade}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${
                      task.tipo === "Wireframe"
                        ? "bg-blue-100 text-blue-600"
                        : task.tipo === "Graphics"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {task.tipo}
                  </span>

                  <div className="flex flex-col gap-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-300 h-2 rounded-full"
                        style={{ width: `${task.progresso}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {task.progresso}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[300px] shrink-0">
          <div className="bg-white rounded-2xl shadow-md p-4 h-fit">
            <h2 className="text-gray-700 text-lg font-semibold mb-4">
              Usuários Ativos
            </h2>
            <ul className="space-y-3">
              {usuariosAtivos.map((user, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between text-sm text-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.nome
                      )}&background=random&size=32`}
                      alt={user.nome}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{user.nome}</p>
                      <p className="text-xs text-gray-500">{user.descricao}</p>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium text-xs pt-1">
                    {user.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
