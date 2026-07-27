import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  paper: "#F8F5F0",
  paperDeep: "#EFE9DF",
  ink: "#231A12",
  inkSoft: "#4D3A26",
  wood: "#7A5230",
  woodDeep: "#4D3018",
  brass: "#B8860B",
  stone: "#8C7A66",
  line: "#D9CFC0",
};

export default async function OpengraphImage() {
  const notoJpBold = await readFile(
    join(process.cwd(), "assets/NotoSansJP-Bold.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: COLORS.paper,
          backgroundImage: `linear-gradient(180deg, ${COLORS.paper} 0%, ${COLORS.paperDeep} 100%)`,
          padding: "72px 88px",
          position: "relative",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 88,
            right: 88,
            height: 1,
            backgroundColor: COLORS.line,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 88,
            right: 88,
            height: 1,
            backgroundColor: COLORS.line,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 36,
            color: COLORS.woodDeep,
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontStyle: "italic",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 36,
              height: 1,
              backgroundColor: COLORS.wood,
            }}
          />
          <span>Est. 2026 — A craft web studio</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: COLORS.woodDeep,
              fontSize: 26,
              letterSpacing: "0.3em",
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 28,
                height: 1,
                backgroundColor: COLORS.wood,
              }}
            />
            <span>地方の工務店専門</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: COLORS.ink,
              fontSize: 96,
              lineHeight: 1.2,
              letterSpacing: "0.02em",
              fontWeight: 700,
            }}
          >
            <span>集客につながる</span>
            <span style={{ color: COLORS.brass, marginTop: 8 }}>
              ホームページを。
            </span>
          </div>

          <div
            style={{
              marginTop: 44,
              color: COLORS.inkSoft,
              fontSize: 30,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
            }}
          >
            初期費用 ¥22,000 / 月額運用費 ¥3,980 — すべて込み。
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: COLORS.ink,
                fontSize: 40,
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              {SITE_CONFIG.name}
            </span>
            <span
              style={{
                marginTop: 8,
                color: COLORS.wood,
                fontSize: 22,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}
            >
              {SITE_CONFIG.nameEn}
            </span>
          </div>
          <span
            style={{
              color: COLORS.stone,
              fontSize: 22,
              letterSpacing: "0.18em",
              fontStyle: "italic",
            }}
          >
            drasil.jp
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: notoJpBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
