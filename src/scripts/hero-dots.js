// Puntitos "vivos" de la portada fucsia.
// - Los puntos se mecen apenas (se corren 2-3 px), como un campo con viento.
// - Una ola de brillo los recorre en diagonal.
// - Algunos titilan solos y crecen un poco cuando brillan.
// Con "reducir movimiento" se dibuja una sola vez, quieto. Se pausa cuando la portada no está en pantalla.
// Es liviano: ~3.000 puntos en celular y ~15.000 en una pantalla grande, dibujados como cuadraditos.
const lienzo = document.querySelector('[data-hero-dots]')
if (lienzo) {
  const ctx = lienzo.getContext('2d')
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fallback = document.querySelector('[data-hero-dots-fallback]')
  if (fallback) fallback.style.display = 'none'

  // Cuánto se mueve todo. Si querés más o menos movimiento, tocá estos números.
  const VAIVEN = 2.4 // px que se corre cada punto
  const VELOCIDAD_OLA = 2.1 // qué tan rápido pasa la ola de brillo
  const CHISPAS = 0.07 // proporción de puntos que titilan solos

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
    paso = w < 640 ? 11 : 9
    puntos = []
    for (let y = paso / 2; y < h; y += paso)
      for (let x = paso / 2; x < w; x += paso) {
        // Más presentes abajo, se apagan hacia arriba
        const base = Math.max(0, Math.min(1, (y / h - 0.1) / 0.72))
        if (base <= 0.02) continue
        const r = azar(x, y)
        puntos.push({ x, y, base, chispa: r < CHISPAS, fase: r * 900, vel: 1.2 + azar(y, x) * 2.2 })
      }
  }

  function dibujar(t) {
    ctx.clearRect(0, 0, w, h)
    const s = t / 1000
    for (const p of puntos) {
      // Vaivén: cada fila y columna se mece con un desfase distinto
      const x = p.x + Math.sin(p.y * 0.021 + s * 1.3) * VAIVEN
      const y = p.y + Math.cos(p.x * 0.017 + s * 1.1) * VAIVEN

      // Ola de brillo en diagonal
      const ola = 0.5 + 0.5 * Math.sin(p.x * 0.010 + p.y * 0.014 - s * VELOCIDAD_OLA)
      let a = p.base * (0.06 + 0.5 * ola * ola)
      let lado = 1.5

      if (p.chispa) {
        const brillo = 0.5 + 0.5 * Math.sin(s * p.vel + p.fase)
        const b = brillo * brillo
        a = Math.max(a, (0.2 + 0.8 * p.base) * (0.15 + 0.85 * b))
        lado = 1.5 + b * 1.1
      }
      if (a < 0.03) continue
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
      ctx.fillRect(x - lado / 2, y - lado / 2, lado, lado)
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
