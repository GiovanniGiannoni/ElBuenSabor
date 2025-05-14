import React from "react";
import { Categoria } from "../../../models/Categoria";

interface CategoryProps {
  categorias: Categoria[];
  selected: string | null;
  onSelect: (cat: string) => void;
}

export const Category: React.FC<CategoryProps> = ({ categorias, selected, onSelect }) => {
  return (
    <div className="flex gap-4 flex-wrap my-4">
      {categorias.map((categoria) => {
        const nombre = categoria.getcategoriaNombre();
        const imagen = categoria.getcategoriaImagen() || "https://via.placeholder.com/150";

        return (
          <>
            <button
              key={categoria.getcategoriaId()}
              onClick={() => onSelect(nombre)}
              className={`flex flex-col items-center p-2 rounded-full shadow-md transition-transform hover:scale-105 duration-300 cursor-pointer ${
                selected === nombre ? "bg-orange-500 text-white" : "bg-white text-black"
              }`}>
              <img
                src={imagen}
                alt={nombre}
                className={`bg-white w-20 h-20 object-cover p-2 rounded-full mb-2 border-4 border-orange-500 ${
                  selected === nombre ? "border-white" : "border-orange-500"
                }`}
              />
              <span
                className={`text-sm font-extrabold text-center max-w-[80px] h-[40px] overflow-hidden text-ellipsis break-words leading-tight`}>
                {nombre}
              </span>
            </button>
          </>
        );
      })}
    </div>
  );
};
