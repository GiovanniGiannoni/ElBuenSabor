import React, { useEffect, useState } from "react";
import { products } from "./data/listProducts";
import { CategoryFilters } from "./CategoryFilters"; // subcategorías
import { ProductsList } from "./ProductsList";
import { Product } from "./types/products";
import { ModalProduct } from "./modal/ModalProduct";
import { Categoria } from "../../models/Categoria";
import { fetchCategorias } from "../../services/CategoriaServicio";
import { Category } from "./category/Category";

export const ProductsGrid: React.FC = () => {
  const [selectedParentCategory, setSelectedParentCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetchCategorias().then(setCategorias).catch(console.error);
  }, []);

  // Categorías padre
  const categoriasPadre = categorias.filter((cat) => !cat.getcategoriaPadre());

  // Subcategorías según el padre seleccionado
  const subcategorias =
    selectedParentCategory === null
      ? []
      : categorias
          .filter(
            (cat) =>
              cat.getcategoriaPadre() && cat.getcategoriaPadre()?.getcategoriaNombre() === selectedParentCategory,
          )
          .map((cat) => cat.getcategoriaNombre());

  const filteredProducts =
    selectedSubCategory === "All" ? products : products.filter((p) => p.category === selectedSubCategory.toLowerCase());

  return (
    <section className="flex flex-col sm:items-start w-full">
      {/* Categorías padre */}
      <Category
        categorias={categoriasPadre}
        selected={selectedParentCategory}
        onSelect={(cat) => {
          setSelectedParentCategory(cat);
          setSelectedSubCategory("All");
        }}
      />

      {/* Subcategorías */}
      {selectedParentCategory && (
        <CategoryFilters
          categories={["All", ...subcategorias]}
          selected={selectedSubCategory}
          onSelect={(cat) => setSelectedSubCategory(cat)}
        />
      )}

      {/* Productos */}
      <ProductsList
        products={filteredProducts}
        onSelectProduct={(product) => setSelectedProduct(product)}
        categoryKey={selectedSubCategory}
      />

      {/* Modal */}
      {selectedProduct && (
        <ModalProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => {
            console.log("Agregar al carrito:", p);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
};
