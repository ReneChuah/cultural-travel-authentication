"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

const STORAGE_KEY = "Roamio.aibubble.pos"
const SIZE = 56
const EDGE = 12
const TAP_THRESHOLD = 6

type Pos = { x: number; y: number }

export function AiBubble() {
  const router = useRouter()
  const [pos, setPos] = useState<Pos | null>(null)
  const [dragging, setDragging] = useState(false)
  const posRef = useRef<Pos>({ x: 0, y: 0 })
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, offsetX: 0, offsetY: 0 })

  function clamp(x: number, y: number): Pos {
    const maxX = window.innerWidth - SIZE - EDGE
    const maxY = window.innerHeight - SIZE - EDGE
    return {
      x: Math.min(Math.max(EDGE, x), Math.max(EDGE, maxX)),
      y: Math.min(Math.max(EDGE, y), Math.max(EDGE, maxY)),
    }
  }

  useEffect(() => {
    let next: Pos
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      next = saved
        ? clamp(JSON.parse(saved).x, JSON.parse(saved).y)
        : clamp(window.innerWidth - SIZE - 20, window.innerHeight - SIZE - 130)
    } catch {
      next = clamp(window.innerWidth - SIZE - 20, window.innerHeight - SIZE - 130)
    }
    posRef.current = next
    setPos(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - posRef.current.x,
      offsetY: e.clientY - posRef.current.y,
    }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current.active) return
    if (Math.hypot(e.clientX - drag.current.startX, e.clientY - drag.current.startY) > TAP_THRESHOLD) {
      drag.current.moved = true
    }
    const next = clamp(e.clientX - drag.current.offsetX, e.clientY - drag.current.offsetY)
    posRef.current = next
    setPos(next)
  }

  function onPointerUp() {
    if (!drag.current.active) return
    drag.current.active = false
    setDragging(false)
    if (drag.current.moved) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posRef.current))
      } catch {}
    } else {
      router.push("/ai-chat")
    }
  }

  if (!pos) return null

  return (
    <button
      type="button"
      aria-label="Ask AI — drag to reposition, tap to open chat"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: pos.x, top: pos.y, width: SIZE, height: SIZE, touchAction: "none" }}
      className={`fixed z-50 flex items-center justify-center rounded-full bg-primary font-serif text-base font-bold tracking-wide text-primary-foreground transition-transform ${
        dragging ? "scale-110 cursor-grabbing" : "cursor-grab active:scale-95"
      }`}
    >
      AI
    </button>
  )
}
