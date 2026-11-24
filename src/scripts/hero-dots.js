// Puntitos "vivos" de la portada fucsia.
// - Una ola suave de brillo recorre la grilla todo el tiempo.
// - Algunos puntos titilan solos.
// Con "reducir movimiento" se dibuja una sola vez, quieto. Se pausa cuando la portada no está en pantalla.
const lienzo = document.querySelector('[data-hero-dots]')
if (lienzo) {
  const ctx = lienzo.getContext('2d')
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fallback = document.querySelector('[data-hero-dots-fallback]')
  if (fallback) fallback.style.display = 'none'

  let paso = 9
  let puntos = []
  let w = 0, h = 0
  let visible = true
  let corriendo = false

  const azar = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
    return s - Math.floor(s)
  }

  function armar() {
    const dpr = Math.min(devicePixelRatio || 1, 2)
    w = lienzo.clientWidth
    h = lienzo.clientHeight
    lienzo.width = Math.round(w * dpr)
    lienzo.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    paso = w < 640 ? 10 : 9
    puntos = []
    for (let y = paso / 2; y < h; y += paso)
      for (let x = paso / 2; x < w; x += paso) {
        // Igual que la textura de antes: más presentes abajo, se apagan hacia arriba
        const base = Math.max(0, Math.min(1, (y / h - 0.12) / 0.75))
        if (base <= 0.02) continue
        const r = azar(x, y)
        puntos.push({ x, y, base, chispa: r < 0.05, fase: r * Math.PI * 2 * 40, vel: 0.6 + azar(y, x) * 1.2 })
      }
  }

  function dibujar(t) {
    ctx.clearRect(0, 0, w, h)
    const s = t / 1000
    for (const p of puntos) {
      // Dos olas cruzadas, lentas, que dan la sensación de "respirar"
      const ola =
        0.5 + 0.5 * Math.sin(p.x * 0.011 + p.y * 0.016 - s * 1.5) * Math.cos(p.x * 0.005 - p.y * 0.009 + s * 0.8)
      let a = p.base * (0.05 + 0.55 * ola * ola)
      const lado = 1.5

      if (p.chispa) a = Math.max(a, (0.15 + 0.85 * p.base) * (0.2 + 0.75 * (0.5 + 0.5 * Math.sin(s * p.vel + p.fase))))

      if (a < 0.03) continue
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
      ctx.fillRect(p.x - lado / 2, p.y - lado / 2, lado, lado)
    }
    if (!quieto && visible) requestAnimationFrame(dibujar)
    else corriendo = false
  }

  function arrancar() {
    if (corriendo || quieto) return
    corriendo = true
    requestAnimationFrame(dibujar)
  }

  armar()
  if (quieto) dibujar(0)
  else arrancar()

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible) arrancar()
  }).observe(lienzo)

  let ancho = w
  new ResizeObserver(() => {
    if (Math.abs(lienzo.clientWidth - ancho) > 1 || Math.abs(lienzo.clientHeight - h) > 80) {
      ancho = lienzo.clientWidth
      armar()
      if (quieto) dibujar(0)
    }
  }).observe(lienzo)
}
