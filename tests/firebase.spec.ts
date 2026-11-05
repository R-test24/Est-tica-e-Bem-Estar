import { test, expect } from "@playwright/test";

test("cadastro, sessão, dados por usuário, saída e retorno sem vazamento local", async ({
  page,
}) => {
  const email = `care-${Date.now()}@example.com`;
  await page.goto("/minha-area");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Entre na sua conta",
  );
  await page.goto("/cadastro");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("Senha12345!");
  await page.getByLabel("Confirme a senha").fill("Senha12345!");
  await page.getByRole("button", { name: "Criar minha conta" }).click();
  await page.waitForURL("**/minha-area");
  await page.getByLabel("Fiz uma pausa para descansar").check();
  await expect(
    page.locator(".care-stats article").nth(2).locator("strong"),
  ).toHaveText("10");
  await page.reload();
  await expect(page.getByLabel("Fiz uma pausa para descansar")).toBeChecked();
  await page.goto("/");
  const form = page.locator(".booking-form");
  await form
    .getByLabel("Seu momento de cuidado")
    .selectOption("Cuidados com a pele");
  await form.getByLabel("Com quem?").selectOption("Marina Oliveira");
  await form.getByLabel("Data desejada").fill("2099-01-01");
  await form.getByLabel("Horário desejado").fill("10:00");
  await form.getByRole("button", { name: "Planejar meu cuidado" }).click();
  await expect(form.getByRole("status")).toContainText("salvo na sua conta");
  await page.goto("/minha-area");
  await expect(page.locator(".booking-list li")).toHaveCount(1);
  await page.getByRole("button", { name: "Sair da conta" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "Entre na sua conta",
  );
  await expect(page.locator(".booking-list li")).toHaveCount(0);
  await page.goto("/cadastro");
  await page
    .getByLabel("E-mail", { exact: true })
    .fill(`other-${Date.now()}@example.com`);
  await page.getByLabel("Senha", { exact: true }).fill("Senha12345!");
  await page.getByLabel("Confirme a senha").fill("Senha12345!");
  await page.getByRole("button", { name: "Criar minha conta" }).click();
  await page.waitForURL("**/minha-area");
  await expect(
    page.getByLabel("Fiz uma pausa para descansar"),
  ).not.toBeChecked();
  await expect(page.locator(".booking-list li")).toHaveCount(0);
  await page.getByRole("button", { name: "Sair da conta" }).click();
  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("Senha12345!");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.waitForURL("**/minha-area");
  await expect(page.getByLabel("Fiz uma pausa para descansar")).toBeChecked();
  await expect(page.locator(".booking-list li")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Remover planejamento de Cuidados com a pele",
    })
    .click();
  await page.getByRole("button", { name: "Sim, remover" }).click();
  await expect(page.locator(".booking-list li")).toHaveCount(0);
});

test("@auth recuperação de senha usa resposta genérica", async ({ page }) => {
  await page.goto("/recuperar-senha");
  await page
    .getByLabel("E-mail", { exact: true })
    .fill(`unknown-${Date.now()}@example.com`);
  await page.getByRole("button", { name: "Enviar instruções" }).click();
  await expect(page.getByRole("status")).toContainText("Se houver uma conta");
});

test("@auth cadastro, sessão persistente, logout e login no emulador", async ({
  page,
}) => {
  const email = `session-${Date.now()}@example.com`;
  await page.goto("/cadastro");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("Senha12345!");
  await page.getByLabel("Confirme a senha").fill("Senha12345!");
  await page.getByRole("button", { name: "Criar minha conta" }).click();
  await page.waitForURL("**/minha-area");
  await expect(
    page.getByRole("button", { name: "Sair da conta" }),
  ).toBeVisible();
  await page.goto("/conteudos");
  await page.reload();
  await page.getByRole("button", { name: "Sair da conta" }).click();
  await expect(
    page
      .locator("#main-nav")
      .getByRole("link", { name: "Entrar", exact: true }),
  ).toBeVisible();
  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("Senha12345!");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await page.waitForURL("**/minha-area");
  await expect(
    page.getByRole("button", { name: "Sair da conta" }),
  ).toBeVisible();
});
