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

type Props = {
  tipo: "bar" | "line" | "radial";
  titulo: string;
  valor?: string;
  rotulo?: string;
  dados: any[];
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
  const renderGrafico = () => {
    switch (tipo) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={altura}>
            <BarChart data={dados}>
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
            <LineChart data={dados}>
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
                  data={dados}
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
      style={{ height: altura + 130 }}
    >
      <h2 className="text-gray-600 text-lg font-semibold mb-2">{titulo}</h2>

      <div
        className={
          invertido ? "flex flex-col-reverse gap-2" : "flex flex-col gap-2"
        }
      >
        {renderGrafico()}

        {tipo !== "radial" && (valor || rotulo) && (
          <div className="flex flex-col">
            {valor && (
              <span className="text-3xl font-bold text-gray-800">{valor}</span>
            )}
            {rotulo && <span className="text-sm text-gray-400">{rotulo}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
