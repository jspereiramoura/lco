import type { AppDispatch } from "../store";
import { hideLoader, showLoader } from "../store/slices/globalLoaderSlice";
import apiClient from "./utils/apiClient";

const delay = (ms = 100) => new Promise(res => setTimeout(res, ms));

export async function runSeed(dispatch: AppDispatch) {
  function logMessage(message: string) {
    console.log(message);
    dispatch(showLoader(message));
  }

  try {
    logMessage("🔄 Apagando categorias vazias existentes...");
    const res = await apiClient.get("/categories/");

    for (const category of res.data) {
      try {
        await delay();
        await apiClient.delete(`/categories/${category.id}`);
        logMessage(`✔ Categoria "${category.name}" deletada`);
      } catch {
        logMessage(`⚠ Não foi possível deletar "${category.name}"`);
      }
    }

    logMessage("📥 Carregando arquivo de seed...");
    const response = await fetch("/data.json");
    const categories = await response.json();

    for (const category of categories) {
      try {
        logMessage(`✨ Criando categoria - "${category.name}"...`);
        const res = await apiClient.post("/categories", {
          name: `${category.name} ${Math.floor(Math.random() * 1000)}`,
          image: category.image
        });

        const categoryId = res.data.id;

        for (const product of category.products || []) {
          try {
            logMessage(`🛒 Criando produto "${product.title}"...`);
            await apiClient.post("/products", {
              ...product,
              title: `${product.title} - ${Math.floor(Math.random() * 1000)}`,
              categoryId
            });
            await delay();
          } catch {
            logMessage(
              `⚠ Não foi possível inseriar o produto: "${product.title}"`
            );
          }
        }
      } catch {
        logMessage(
          `⚠ Não foi possível inseriar a categoria: "${category.name}"`
        );
      }
    }

    logMessage("✅ Todos os dados foram processados com sucesso!");
    await delay(800);
  } catch {
    dispatch(showLoader(`❌ Erro ao executar seed`));
  } finally {
    dispatch(hideLoader());
    window?.location?.reload();
  }
}
