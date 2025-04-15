"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "@/components/search"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 使用容器宽度而不是窗口宽度，防止在移动设备上超宽
    const container = canvas.parentElement
    canvas.width = container ? container.clientWidth : window.innerWidth
    canvas.height = 400

    const particles: Particle[] = []
    // 根据屏幕宽度动态调整粒子数量，在移动设备上减少粒子数量以提高性能
    const particleCount = window.innerWidth < 768 ? 50 : 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          "rgba(147, 51, 234, 0.7)", // Purple
          "rgba(6, 182, 212, 0.7)", // Cyan
          "rgba(59, 130, 246, 0.7)", // Blue
          "rgba(236, 72, 153, 0.7)", // Pink
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    function connectParticles() {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // 根据屏幕宽度动态调整连接距离，在移动设备上减少连接距离
          const connectionDistance = window.innerWidth < 768 ? 70 : 100
          
          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    animate()

    const handleResize = () => {
      // 使用容器宽度而不是窗口宽度，确保在移动设备上不会超宽
      const container = canvas.parentElement
      canvas.width = container ? container.clientWidth : window.innerWidth
      canvas.height = 400
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative overflow-hidden w-full">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ height: "400px", width: "100%" }} />

      <div
        className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center"
        style={{ height: "400px" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          LuminaChain Explorer
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Explore the transparent, cross-chain blockchain ecosystem with 1-minute block times and advanced data cloning
        </p>

        <div className="w-full max-w-2xl mb-8">
          <Search />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
            Start Mining
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}

