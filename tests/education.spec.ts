import { test, expect } from "@playwright/test";
import { guides } from "../src/data/education";

test("biblioteca busca sem acentos, combina filtros e limpa resultados vazios", async ({
  page,
}) => {
  await page.goto("/conteudos");
  await expect(page.locator(".education-grid article")).toHaveCount(8);
  await page.getByLabel("O que você quer aprender?").fill("PÊLE");
  await expect(page.locator(".education-grid article")).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Cuidar da pele sem buscar perfeição" }),
  ).toBeVisible();
  await page.getByLabel("O que você quer aprender?").fill("");
  await page.getByRole("button", { name: "Saúde mental", exact: true }).click();
  await expect(page.locator(".education-grid article")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Saúde mental", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Fase da vida").selectOption("Juventude");
  await expect(page.locator(".education-grid article")).toHaveCount(1);
  await page.getByLabel("O que você quer aprender?").fill("xyzsemresultado");
  await expect(page.locator(".education-grid article")).toHaveCount(0);
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.locator(".education-grid article")).toHaveCount(8);
});

test("cada guia tem leitura, referências e passos práticos; slug inválido retorna 404", async ({
  page,
}) => {
  for (const guide of guides) {
    const response = await page.goto(`/conteudos/${guide.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      guide.title,
    );
    await expect(page.locator(".practical-steps li")).toHaveCount(3);
    await expect(page.locator(".guide-sources a")).toHaveCount(
      guide.sources.length,
    );
    await expect(
      page.getByRole("link", { name: "Acompanhar meus cuidados" }),
    ).toHaveAttribute("href", "/minha-area");
  }
  const response = await page.goto("/conteudos/nao-existe");
  expect(response?.status()).toBe(404);
});

test("apoio e biblioteca funcionam no celular e distinguem emergência de escuta", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const path of [
    "/",
    "/conteudos",
    "/conteudos/envelhecer-com-autonomia",
    "/apoio",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  await expect(
    page.getByRole("link", { name: "Ligar para 188" }),
  ).toHaveAttribute("href", "tel:188");
  await expect(
    page
      .locator(".urgent-support")
      .getByRole("link", { name: "192", exact: true }),
  ).toHaveAttribute("href", "tel:192");
  await expect(page.locator(".urgent-support")).toContainText(
    "não substitui atendimento de emergência",
  );
});
