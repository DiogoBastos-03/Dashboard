import type { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  children: ReactNode;
};

export default function PageContainer({ title, children }: PageContainerProps) {
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-full">
      <div className="w-full bg-white flex justify-between items-center px-4 py-4">
        <h1 className="text-sm text-gray-500">{title}</h1>
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          {dataAtual}
        </span>
      </div>

      <div className="px-4 py-6">
        {children}
      </div>
    </section>
  );
}
