import { test, expect } from "@playwright/test";

test("planejamento persiste, impede sobreposição e pode ser removido", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.locator(".booking-form");
  async function fill(time: string) {
    await form
      .getByLabel("Seu momento de cuidado")
      .selectOption("Cuidados com a pele");
    await form.getByLabel("Com quem?").selectOption("Marina Oliveira");
    await form.getByLabel("Data desejada").fill("2099-01-01");
    await form.getByLabel("Horário desejado").fill(time);
    await form.getByRole("button", { name: "Planejar meu cuidado" }).click();
  }
  await fill("10:00");
  await expect(form.getByRole("status")).toContainText("Planejamento salvo");
  await fill("10:30");
  await expect(form.getByRole("status")).toContainText("coincide");
  await page.goto("/minha-area");
  await expect(page.locator(".booking-list li")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".booking-list li")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Remover planejamento de Cuidados com a pele",
    })
    .click();
  await page.getByRole("button", { name: "Manter", exact: true }).click();
  await expect(page.locator(".booking-list li")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Remover planejamento de Cuidados com a pele",
    })
    .click();
  await page.getByRole("button", { name: "Sim, remover" }).click();
  await page.reload();
  await expect(page.locator(".booking-list li")).toHaveCount(0);
});

test("cuidados persistem e pontos não duplicam ao marcar e desmarcar", async ({
  page,
}) => {
  await page.goto("/minha-area");
  const habit = page.getByLabel("Fiz uma pausa para descansar");
  await habit.check();
  await expect(page.locator(".care-stats article").nth(2)).toContainText("10");
  await page.reload();
  await expect(habit).toBeChecked();
  await habit.uncheck();
  await expect(
    page.locator(".care-stats article").nth(2).locator("strong"),
  ).toHaveText("0");
  await habit.check();
  await expect(
    page.locator(".care-stats article").nth(2).locator("strong"),
  ).toHaveText("10");
  await page.setViewportSize({ width: 320, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test("datas passadas são rejeitadas e dados incompatíveis são preservados", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.locator(".booking-form");
  await form
    .getByLabel("Seu momento de cuidado")
    .selectOption("Massagem relaxante");
  await form.getByLabel("Com quem?").selectOption("Camila Santos");
  await form.getByLabel("Data desejada").fill("2020-01-01");
  await form.getByLabel("Horário desejado").fill("10:00");
  await form.getByRole("button", { name: "Planejar meu cuidado" }).click();
  await expect(form.getByRole("status")).toContainText("futuros");
  await page.evaluate(() =>
    localStorage.setItem("estetica-care-v1", "invalid"),
  );
  await page.goto("/minha-area");
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "preservados",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("estetica-care-v1")),
  ).toBe("invalid");
});

test("registros de dias anteriores não contam como cuidados de hoje", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem(
      "estetica-care-v1",
      JSON.stringify({
        version: 1,
        bookings: [],
        checks: { "2020-01-01": ["pausa"] },
      }),
    ),
  );
  await page.goto("/minha-area");
  await expect(
    page.getByLabel("Fiz uma pausa para descansar"),
  ).not.toBeChecked();
  await expect(
    page.locator(".care-stats article").nth(1).locator("strong"),
  ).toHaveText("0 / 3");
  await expect(
    page.locator(".care-stats article").nth(2).locator("strong"),
  ).toHaveText("10");
});

test("armazenamento bloqueado não mostra sucesso nem cria planos", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Armazenamento bloqueado pelo navegador.");
    };
  });
  await page.goto("/");
  const form = page.locator(".booking-form");
  await form
    .getByLabel("Seu momento de cuidado")
    .selectOption("Massagem relaxante");
  await form.getByLabel("Com quem?").selectOption("Camila Santos");
  await form.getByLabel("Data desejada").fill("2099-01-01");
  await form.getByLabel("Horário desejado").fill("10:00");
  await form.getByRole("button", { name: "Planejar meu cuidado" }).click();
  await expect(form.getByRole("status")).toContainText("bloqueado");
  await page.goto("/minha-area");
  await expect(page.locator(".booking-list li")).toHaveCount(0);
});
