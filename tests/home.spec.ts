import { test, expect } from "@playwright/test";

test.describe("ホームページ (LP)", () => {
  test("ヒーローのキャッチコピーが表示される", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /集客につながる/ }),
    ).toBeVisible();
    await expect(page.getByText("ホームページを。")).toBeVisible();
  });

  test("ヒーローに月額価格が大きく表示される", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("3,980").first()).toBeVisible();
  });

  test("CTAボタンから /contact フォームページに遷移する", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /お問い合わせ/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/(contact|#contact)$/);
  });

  test("制作実績のサンプルが外部URLに飛ぶ", async ({ page }) => {
    await page.goto("/");
    const sample = page.getByRole("link", { name: /鈴木工務店/ }).first();
    await expect(sample).toBeVisible();
    await expect(sample).toHaveAttribute(
      "href",
      "https://koumuten-suzuki.vercel.app/",
    );
    await expect(sample).toHaveAttribute("target", "_blank");
    await expect(sample).toHaveAttribute("rel", /noopener/);
  });

  test("制作実績の架空表記が掲載されている", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText(
        /掲載中の制作実績.*サンプル.*実在する企業さまのサイトではございません/,
      ),
    ).toBeVisible();
  });

  test("ホーム内の主要セクション(works/about/faq/contact) アンカーが存在する", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("#works")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#faq")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator("#service")).toBeVisible();
    await expect(page.locator("#price")).toBeVisible();
  });

  test("ヘッダーのナビゲーションがホームアンカーに統一されている", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.locator("header");
    for (const anchor of ["#service", "#price", "#works", "#faq", "#contact"]) {
      await expect(
        nav.locator(`a[href="/${anchor}"]`).first(),
      ).toBeVisible();
    }
  });
});

test.describe("/works リダイレクト", () => {
  test("/works は /#works に301 でリダイレクトされる", async ({ page }) => {
    const response = await page.goto("/works");
    // After redirect, the final URL should be the home page anchor.
    expect(page.url()).toMatch(/\/#?works?$|\/$/);
    expect(response?.status()).toBeLessThan(400);
  });
});

test.describe("/about (長文の代表手記)", () => {
  test("AboutEssay の章タイトルが表示される", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("代表の手記。")).toBeVisible();
    await expect(page.getByText(/紹介と口コミだけでは/).first()).toBeVisible();
  });
});

test.describe("特定商取引法ページ", () => {
  test("プレースホルダー文字列が残っていない", async ({ page }) => {
    await page.goto("/legal/commerce");
    const body = page.locator("body");
    await expect(body).not.toContainText("[代表者名]");
    await expect(body).not.toContainText("[電話番号]");
    await expect(body).not.toContainText("[ドメイン]");
  });

  test("代表者名と電話番号が他ページと一致している", async ({ page }) => {
    await page.goto("/legal/commerce");
    await expect(page.getByText("横澤 大輝")).toBeVisible();
    await expect(page.getByText("080-1553-6788").first()).toBeVisible();
  });
});

test.describe("ブランド表記", () => {
  test("ヘッダー・フッターにドラシルデジタル(カナ + ローマ字)が表示される", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("ドラシルデジタル").first()).toBeVisible();
    await expect(page.getByText("Drasil Digital").first()).toBeVisible();
  });

  test("旧ブランド表記が一切残っていない", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).not.toContainText("湘南ウェブラボ");
    await expect(page.locator("body")).not.toContainText("Shonan Web Lab");
  });
});
