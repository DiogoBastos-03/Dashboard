import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Menu } from "@headlessui/react";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

type Periodo = "semana" | "mes" | "semestre";

const opcoes: { label: string; valor: Periodo }[] = [
  { label: "Semana", valor: "semana" },
  { label: "Mês", valor: "mes" },
  { label: "Semestre", valor: "semestre" },
];

type Props = {
  tipo: "bar" | "line" | "radial";
  titulo: string;
  valor?: string;
  rotulo?: string;
  dados: any[] | { semana: any[]; mes: any[]; semestre: any[] };
  dataKey: string;
  labelKey?: string;
  fillColor?: string;
  invertido?: boolean;
  altura?: number;
};


export default function GraphicsCard({
  tipo,
  titulo,
  valor,
  rotulo,
  dados,
  dataKey,
  labelKey = "label",
  fillColor = "#3B82F6",
  invertido = false,
  altura = 180,
}: Props) {
  const [periodo, setPeriodo] = useState<Periodo>("semana");

  const dadosFiltrados =
  tipo === "bar"
    ? (dados as { [key in Periodo]: any[] })[periodo]
    : (dados as any[]);


  const renderGrafico = () => {
    switch (tipo) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={altura}>
            <BarChart data={dadosFiltrados}>
              <XAxis dataKey={labelKey} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar
                dataKey={dataKey}
                fill={fillColor}
                radius={[8, 8, 0, 0]}
                background={{ fill: "#F3F4F6" }}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={altura}>
            <LineChart data={dadosFiltrados}>
              <XAxis dataKey={labelKey} axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={fillColor}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "radial":
        return (
          <div className="flex items-center justify-between gap-4">
            {(valor || rotulo) && (
              <div className="flex flex-col">
                {valor && (
                  <span className="text-3xl font-bold text-gray-800">
                    {valor}
                  </span>
                )}
                {rotulo && (
                  <span className="text-sm text-gray-400">{rotulo}</span>
                )}
              </div>
            )}

            <div className="w-[120px] h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="65%"
                  outerRadius="100%"
                  barSize={30}
                  data={dadosFiltrados}
                  startAngle={90}
                  endAngle={450}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    dataKey={dataKey}
                    angleAxisId={0}
                    background={{ fill: "#E5E7EB" }}
                    cornerRadius={15}
                    fill={fillColor}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 w-full overflow-hidden"
      style={{ height: altura + 185 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex flex-col gap-2 mb-4 w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-gray-600 text-lg font-semibold">{titulo}</h2>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="rounded-md bg-gray-100 p-2 hover:bg-gray-200 transition">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full px-4 py-2 text-sm text-left ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Exportar
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full px-4 py-2 text-sm text-left ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        Editar
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`w-full px-4 py-2 text-sm text-left ${
                          active ? "bg-gray-100 text-red-600" : "text-red-500"
                        }`}
                      >
                        Remover
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>

          {/* Barra de seleção apenas para gráfico de barras */}
          {tipo === "bar" && (
            <div className="flex bg-gray-100 rounded-md p-1 w-full gap-1">
              {opcoes.map((opcao) => (
                <button
                  key={opcao.valor}
                  onClick={() => setPeriodo(opcao.valor)}
                  className={`flex-1 py-1 rounded-md text-sm transition text-center ${
                    periodo === opcao.valor
                      ? "bg-white text-gray-800 shadow"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={invertido ? "flex flex-col-reverse gap-2" : "flex flex-col gap-2"}>
        {renderGrafico()}

        {tipo !== "radial" && (valor || rotulo) && (
          <div className="flex flex-col">
            {valor && <span className="text-3xl font-bold text-gray-800">{valor}</span>}
            {rotulo && <span className="text-sm text-gray-400">{rotulo}</span>}
          </div>
        )}
      </div>
    </div>
  );
}