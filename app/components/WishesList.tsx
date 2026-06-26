"use client";

import { useEffect, useRef, useState } from "react";

interface Wish {
  _id?: string;
  name: string;
  attendance?: string;
  guests?: number;
  message: string;
  createdAt?: string;
}

interface RowWish {
  id: number;
  name: string;
  message: string;
}

const PRESET_WISHES = [
  { name: "Gia đình", message: "Chúc hai bạn trăm năm hạnh phúc!" },
  { name: "Bạn bè", message: "Mãi mãi yêu thương và đồng hành bên nhau nhé!" },
  { name: "Đồng nghiệp", message: "Chúc vợ chồng son sẻ, sớm có em bé đáng yêu!" },
  { name: "Họ hàng", message: "Hạnh phúc trọn vẹn, bên nhau trọn đời!" },
  { name: "Bạn thân", message: "Chúc mừng ngày trọng đại của hai bạn!" },
  { name: "Người thân", message: "Tình yêu đẹp nhất là cùng nhau đi hết cuộc đời!" },
  { name: "Bạn học", message: "Chúc hai bạn luôn nở nụ cười trên môi!" },
  { name: "Anh em", message: "Trăm năm hòa hợp, vạn sự như ý!" },
  { name: "Cô dì chú bác", message: "Chúc con cháu sớm có quý tử / quý nữ!" },
  { name: "Bạn cũ", message: "Hạnh phúc viên mãn, đầu lâu bạc phần!" },
];

const WISH_LIFETIME_MS = 6000;
const WISH_SPAWN_MS = 2800;
const MAX_VISIBLE_ROWS = 3;
const LOCAL_WISHES_KEY = "wedding-wishes";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

export function FloatingHearts({ active = true }: { active?: boolean }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const heartIdRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    const spawnHeart = () => {
      const heart: FloatingHeart = {
        id: ++heartIdRef.current,
        left: Math.random() * 96,
        size: 14 + Math.random() * 22,
        duration: 4.5 + Math.random() * 3.5,
        delay: Math.random() * 0.8,
        drift: (Math.random() - 0.5) * 100,
        opacity: 0.55 + Math.random() * 0.45,
      };

      setHearts((prev) => [...prev, heart].slice(-50));

      setTimeout(() => {
        setHearts((prev) => prev.filter((item) => item.id !== heart.id));
      }, (heart.duration + heart.delay) * 1000 + 200);
    };

    for (let i = 0; i < 18; i++) {
      setTimeout(spawnHeart, i * 120);
    }

    const interval = setInterval(spawnHeart, 280);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart absolute"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            ["--heart-drift" as string]: `${heart.drift}px`,
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full fill-[#ef4444] drop-shadow-md">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

const WishesList = () => {
  const [rowWishes, setRowWishes] = useState<RowWish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const wishIdRef = useRef(0);
  const presetIndexRef = useRef(0);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showStatus = (text: string) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatusMessage(text);
    statusTimerRef.current = setTimeout(() => setStatusMessage(""), 2800);
  };

  const spawnWish = (wish: { name: string; message: string }) => {
    const id = ++wishIdRef.current;

    setRowWishes((prev) => {
      const next = [...prev, { id, ...wish }];
      return next.slice(-MAX_VISIBLE_ROWS);
    });

    setTimeout(() => {
      setRowWishes((prev) => prev.filter((item) => item.id !== id));
    }, WISH_LIFETIME_MS);
  };

  const saveWishLocally = (wish: { name: string; message: string }) => {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCAL_WISHES_KEY) || "[]") as Wish[];
      stored.push({
        name: wish.name,
        message: wish.message,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem(LOCAL_WISHES_KEY, JSON.stringify(stored.slice(-50)));
    } catch (error) {
      console.error("Error saving wish locally:", error);
    }
  };

  const loadLocalWishes = (): Wish[] => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_WISHES_KEY) || "[]") as Wish[];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      spawnWish(PRESET_WISHES[0]);
      presetIndexRef.current = 1;
    }, 400);

    const interval = setInterval(() => {
      const wish = PRESET_WISHES[presetIndexRef.current % PRESET_WISHES.length];
      presetIndexRef.current += 1;
      spawnWish(wish);
    }, WISH_SPAWN_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const loadSavedWishes = async () => {
    const localWishes = loadLocalWishes();

    try {
      const response = await fetch("/api/get?page=1&limit=10");
      if (response.ok) {
        const data = await response.json();
        const apiWishes: Wish[] = data.wishes ?? [];
        const merged = [...apiWishes, ...localWishes].slice(0, 5);

        merged.forEach((wish, index) => {
          setTimeout(() => {
            spawnWish({ name: wish.name, message: wish.message });
          }, index * 900);
        });
        return;
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }

    localWishes.slice(0, 5).forEach((wish, index) => {
      setTimeout(() => {
        spawnWish({ name: wish.name, message: wish.message });
      }, index * 900);
    });
  };

  useEffect(() => {
    loadSavedWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      showStatus("Vui lòng nhập đủ thông tin");
      return;
    }

    setLoading(true);

    const wishData = {
      name: name.trim(),
      message: message.trim(),
    };

    let savedToServer = false;

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: wishData.name,
          attendance: "Hadir",
          guests: 1,
          message: wishData.message,
        }),
      });

      savedToServer = response.ok;
    } catch (error) {
      console.error(error);
    }

    if (!savedToServer) {
      saveWishLocally(wishData);
    }

    spawnWish(wishData);
    setName("");
    setMessage("");
    showStatus("Gửi thành công!");
    setLoading(false);
  };

  return (
    <div className="relative z-10 mt-3 flex flex-col gap-4">
      <div className="pointer-events-none flex min-h-[100px] flex-col justify-start gap-2">
        {rowWishes.map((wish) => (
          <div
            key={wish.id}
            className="wish-row-item w-full shrink-0 rounded-lg bg-white/85 px-3 py-2 text-[#4a1a22] shadow-md backdrop-blur-sm"
          >
            <p className="font-legan text-sm font-semibold">{wish.name}</p>
            <p className="mt-0.5 text-xs leading-relaxed line-clamp-2">{wish.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn"
          className="block w-full rounded-md border border-white/20 bg-white/10 p-2 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Nhập lời chúc của bạn..."
          className="block w-full rounded-md border border-white/20 bg-white/10 p-2 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-md bg-white py-2 text-sm font-legan text-black disabled:opacity-60"
          >
            {loading ? "Đang gửi..." : "Gửi lời chúc"}
          </button>
          {statusMessage && (
            <span className="text-xs font-legan text-green-300 whitespace-nowrap animate-[fadeIn_0.4s_ease]">
              {statusMessage}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default WishesList;
