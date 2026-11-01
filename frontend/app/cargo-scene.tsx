"use client";

import { CSSProperties, useEffect, useId, useRef, useState } from "react";
import CargoProduct from "./cargo-product";

const entries = [
  {
    commodity: "文具",
    step: "证据来源",
    detail: "原始资料入仓",
    kind: "stationery",
    x: 17,
    y: 17,
    color: "#61e4f0",
  },
  {
    commodity: "家电",
    step: "用户反馈研究",
    detail: "梳理用户声音",
    kind: "appliance",
    x: 83,
    y: 17,
    color: "#b0a0ff",
  },
  {
    commodity: "零部件",
    step: "产品机会",
    detail: "寻找可验证方向",
    kind: "parts",
    x: 11,
    y: 45,
    color: "#65edba",
  },
  {
    commodity: "五金工具",
    step: "产品方案与规格",
    detail: "比较方案边界",
    kind: "tools",
    x: 89,
    y: 45,
    color: "#ffd082",
  },
  {
    commodity: "电子组件",
    step: "成本与风险",
    detail: "核算成本与风险",
    kind: "component",
    x: 18,
    y: 73,
    color: "#79baff",
  },
  {
    commodity: "视觉样件",
    step: "概念图片",
    detail: "查看内部概念素材",
    kind: "visual",
    x: 82,
    y: 73,
    color: "#fda4d8",
  },
  {
    commodity: "样品箱",
    step: "样品与交接",
    detail: "记录样品事实",
    kind: "sample",
    x: 38,
    y: 87,
    color: "#7ceac8",
  },
  {
    commodity: "包装材料",
    step: "内部交接资料",
    detail: "整理内部草稿",
    kind: "package",
    x: 62,
    y: 87,
    color: "#f4cc8d",
  },
] as const;

function Atmosphere({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0,
      width = 1,
      height = 1,
      visible = true,
      previous = 0,
      time = 0;
    const points = Array.from({ length: 48 }, (_, index) => ({
      x: ((index * 71 + 17) % 101) / 101,
      y: ((index * 37 + 11) % 97) / 97,
      radius: index % 5 === 0 ? 1.6 : 0.8,
      speed: 0.35 + (index % 5) * 0.14,
    }));
    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const x =
          (point.x * width + Math.sin(time * 0.14 + i) * 14 + width) % width;
        const y =
          ((((point.y - time * 0.009 * point.speed) % 1) + 1) % 1) * height;
        ctx!.fillStyle = i % 3 === 0 ? "#b5a3ff" : "#7bedf5";
        ctx!.globalAlpha = 0.3 + (Math.sin(time + i) + 1) * 0.2;
        ctx!.beginPath();
        ctx!.arc(x, y, point.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    function tick(now: number) {
      if (now - previous > 32) {
        time += Math.min((now - previous) / 1000, 0.08);
        previous = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      draw();
      if (running && visible && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    const resize = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resize.observe(canvas);
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [running]);
  return (
    <canvas ref={canvasRef} className="cargo-atmosphere" aria-hidden="true" />
  );
}

function Container() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="cargo-container__visual"
      viewBox="0 0 640 400"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`${id}-side`}
          x1="90"
          y1="110"
          x2="440"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#259ab2" />
          <stop offset=".5" stopColor="#155d82" />
          <stop offset="1" stopColor="#183858" />
        </linearGradient>
        <linearGradient
          id={`${id}-top`}
          x1="180"
          y1="65"
          x2="430"
          y2="185"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#76e5e2" />
          <stop offset="1" stopColor="#287f9f" />
        </linearGradient>
        <linearGradient id={`${id}-end`}>
          <stop stopColor="#163956" />
          <stop offset="1" stopColor="#34528c" />
        </linearGradient>
        <linearGradient id={`${id}-light`}>
          <stop stopColor="#68fff5" />
          <stop offset=".5" stopColor="#93c9ff" />
          <stop offset="1" stopColor="#b69cff" />
        </linearGradient>
      </defs>
      <g className="cargo-container__hover">
        <path
          d="m94 130 76-55 376 43-76 56Z"
          fill={`url(#${id}-top)`}
          stroke="#93f0f3"
          strokeWidth="1.5"
        />
        {Array.from({ length: 18 }, (_, i) => (
          <path
            key={i}
            d={`M${108 + i * 20} ${132 + i * 2.34}l76-55`}
            stroke="#164a64"
            strokeWidth="5"
            opacity=".32"
          />
        ))}
        <path
          d="m94 130 376 44v170L94 298Z"
          fill={`url(#${id}-side)`}
          stroke="#62c9da"
          strokeWidth="2"
        />
        {Array.from({ length: 18 }, (_, i) => (
          <g key={i}>
            <path
              d={`M${111 + i * 20} ${136 + i * 2.34}v159`}
              stroke="#082b50"
              strokeWidth="8"
              opacity=".38"
            />
            <path
              d={`M${107 + i * 20} ${136 + i * 2.34}v159`}
              stroke="#82e3ed"
              strokeWidth="1.8"
              opacity=".36"
            />
          </g>
        ))}
        <path
          d="m470 174 76-56v166l-76 60Z"
          fill={`url(#${id}-end)`}
          stroke="#8ba9e3"
          strokeWidth="2"
        />
        <path
          d="m477 182 62-46v144l-62 48Z"
          fill="#182e56"
          stroke="#758fba"
          strokeWidth="2"
        />
        <path d="m508 159 0 145" stroke="#8faedc" strokeWidth="2" />
        <path d="m491 179 0 130m33-154v128" stroke="#bfd1df" strokeWidth="3" />
        <path d="m486 236 10-8m23-16 10-8" stroke="#ffe1a1" strokeWidth="5" />
        <path
          d="m94 130 376 44 76-56M94 298l376 46 76-60"
          fill="none"
          stroke={`url(#${id}-light)`}
          strokeWidth="3"
        />
        <path
          d="m100 142 363 42m-363 105 363 44"
          stroke="#68eef8"
          strokeWidth="1.5"
          opacity=".65"
        />
        {[
          [94, 130],
          [94, 288],
          [457, 173],
          [457, 323],
          [534, 120],
          [534, 270],
        ].map(([x, y], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width="12"
            height="13"
            rx="2"
            fill="#e8d4a5"
            stroke="#98784f"
          />
        ))}
        <g
          transform="rotate(6.8 160 217)"
          fill="#ecfcff"
          fontFamily="'Segoe UI', sans-serif"
        >
          <text
            x="141"
            y="210"
            fontSize="35"
            fontWeight="800"
            letterSpacing="1.5"
          >
            LAUNCHCASE
          </text>
          <text x="143" y="234" fontSize="9" letterSpacing="4" fill="#9ce9f3">
            CROSS-BORDER COMMERCE
          </text>
          <path d="M143 251h120" stroke="#88e9ee" strokeWidth="1" />
          <text x="143" y="268" fontSize="9" letterSpacing="2" fill="#c8e8f1">
            从灵感 到远方
          </text>
        </g>
        <path
          className="cargo-container__glint"
          d="m145 136 24 3v162l-24-3Z"
          fill="#d0ffff"
          opacity=".18"
        />
      </g>
    </svg>
  );
}

export default function CargoScene({
  onStep,
}: {
  onStep: (step: string) => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerFrame = useRef(0);
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [departing, setDeparting] = useState(false);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  const running = !paused && !reduced && inView && visible && !departing;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    const visibility = () => setVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    update();
    visibility();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    if (stage.current) observer.observe(stage.current);
    return () => {
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
      cancelAnimationFrame(pointerFrame.current);
    };
  }, []);
  const enter = (step: string) => {
    if (timer.current) return;
    if (paused || reduced) {
      onStep(step);
      return;
    }
    setDeparting(true);
    timer.current = setTimeout(() => {
      timer.current = null;
      onStep(step);
      setDeparting(false);
    }, 380);
  };
  const highlight = active === null ? null : entries[active];
  return (
    <div
      ref={stage}
      className={`cargo-scene cargo-scene--cinematic${departing ? " is-departing" : ""}`}
      data-motion={running ? "running" : "paused"}
      aria-label="产品开发流程货柜"
      onPointerMove={(event) => {
        if (!running || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4;
        cancelAnimationFrame(pointerFrame.current);
        pointerFrame.current = requestAnimationFrame(() => {
          stage.current?.style.setProperty("--pointer-x", `${x}deg`);
          stage.current?.style.setProperty("--pointer-y", `${y}deg`);
        });
      }}
      onPointerLeave={() => {
        cancelAnimationFrame(pointerFrame.current);
        stage.current?.style.setProperty("--pointer-x", "0deg");
        stage.current?.style.setProperty("--pointer-y", "0deg");
      }}
    >
      <div className="cargo-aurora cargo-aurora--blue" aria-hidden="true" />
      <div className="cargo-aurora cargo-aurora--violet" aria-hidden="true" />
      <Atmosphere running={running} />
      <div className="cargo-scene__top">
        <span className="cargo-scene__label">
          <i /> 跨境产品航站 <small>PRODUCT VOYAGE / 03</small>
        </span>
        <button
          className="cargo-motion"
          aria-label="暂停动效"
          aria-pressed={paused || reduced}
          disabled={reduced}
          onClick={() => setPaused(!paused)}
        >
          <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
          {reduced ? "已减少动效" : paused ? "继续动效" : "暂停动效"}
        </button>
      </div>
      <div className="cargo-dock">
        <svg
          className="cargo-routes"
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {entries.map((entry, index) => {
            const route = `M${entry.x * 10} ${entry.y * 6.2}Q500 ${entry.y < 45 ? 100 : 530} 500 300`;
            return (
              <g
                key={entry.step}
                className={`cargo-route${active === index ? " is-active" : ""}`}
                style={
                  {
                    "--route-color": entry.color,
                    "--route-delay": `${index * -1.3}s`,
                  } as CSSProperties
                }
              >
                <path className="cargo-route__track" d={route} />
                <path className="cargo-route__spark" d={route} />
              </g>
            );
          })}
        </svg>
        <div className="cargo-landing" aria-hidden="true">
          <i />
          <i />
          <i />
          <span />
        </div>
        <button
          className="cargo-container"
          aria-label="产品开发总览"
          onClick={() => enter("总览")}
        >
          <Container />
          <span className="cargo-container__foot">
            <strong>产品开发总览</strong>
            <span>开启产品航程 ↗</span>
          </span>
        </button>
        <div className="cargo-scene__readout" aria-hidden="true">
          <span>
            {highlight
              ? "正在探索 / " + highlight.commodity
              : "每一个好产品 都值得远行"}
          </span>
          <strong>{highlight?.step || "探索周围商品 开启产品流程"}</strong>
        </div>
        {entries.map((entry, index) => (
          <button
            key={entry.step}
            className={`cargo-pickup cargo-pickup--${entry.kind}${active === index ? " is-active" : ""}`}
            style={
              {
                "--pickup-x": `${entry.x}%`,
                "--pickup-y": `${entry.y}%`,
                "--pickup-accent": entry.color,
                "--float-delay": `${index * -0.8}s`,
                "--reveal-delay": `${index * 65 + 100}ms`,
              } as CSSProperties
            }
            aria-label={entry.commodity + " · " + entry.step}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            onClick={() => enter(entry.step)}
          >
            <span className="cargo-pickup__index">
              {String(index + 1).padStart(2, "0")} <i />
            </span>
            <span className="cargo-product" aria-hidden="true">
              <CargoProduct kind={entry.kind} />
            </span>
            <span className="cargo-pickup__copy">
              <small>{entry.commodity}</small>
              <strong>{entry.step}</strong>
              <span>{entry.detail}</span>
            </span>
            <span className="cargo-pickup__enter" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div className="cargo-scene__bottom">
        <span>
          <i /> 点击商品进入对应步骤
        </span>
        <span>08 道流程 · 01 条产品旅程</span>
      </div>
      <div className="cargo-warp" aria-hidden="true" />
    </div>
  );
}
