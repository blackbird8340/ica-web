// Fondo de puntos del cierre (idea de styles/luma-fondo-puntos), con los colores de ICA.
// Una grilla de puntitos donde un "ruido" suave da forma, y algunos de color que se prenden y apagan.
// Con "reducir movimiento" los puntos de color quedan quietos. Se pausa cuando no está en pantalla.
const lienzo = document.querySelector('[data-dots]')
if (lienzo) {
  const ctx = lienzo.getContext('2d')
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
  const PASO = 13
  const RADIO = 1.15
  const COLORES = ['232,121,249', '217,70,239', '249,168,212']

  const azar = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
    return s - Math.floor(s)
  }
  const suave = (t) => t * t * (3 - 2 * t)
  const ruido = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y)
    const xf = suave(x - xi), yf = suave(y - yi)
    const a = azar(xi, yi), b = azar(xi + 1, yi), c = azar(xi, yi + 1), d = azar(xi + 1, yi + 1)
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
  }
  const tierra = (x, y) => ruido(x * 0.006, y * 0.006) * 0.65 + ruido(x * 0.018, y * 0.018) * 0.35

  let puntos = []
  let visible = false
  let corriendo = false
  let ancho = 0

  function armar() {
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const w = lienzo.clientWidth, h = lienzo.clientHeight
    ancho = w
    lienzo.width = w * dpr
    lienzo.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    puntos = []
    for (let y = PASO / 2; y < h; y += PASO)
      for (let x = PASO / 2; x < w; x += PASO) {
        if (tierra(x, y) < 0.52) continue
        const color = azar(x * 0.37, y * 0.91) < 0.05 ? COLORES[Math.floor(azar(y, x) * COLORES.length)] : null
        puntos.push({ x, y, color, fase: azar(x, y * 3) * Math.PI * 2, vel: 0.4 + azar(y * 2, x) * 0.8 })
      }
  }

  function dibujar(t) {
    ctx.clearRect(0, 0, lienzo.clientWidth, lienzo.clientHeight)
    for (const p of puntos) {
      const brillo = p.color
        ? quieto ? 0.6 : 0.25 + 0.5 * (0.5 + 0.5 * Math.sin((t / 1000) * p.vel + p.fase))
        : 0.1
      ctx.fillStyle = `rgba(${p.color ?? '255,255,255'},${brillo})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, RADIO, 0, Math.PI * 2)
      ctx.fill()
    }
    if (!quieto && visible) requestAnimationFrame(dibujar)
    else corriendo = false
  }

  function arrancar() {
    if (corriendo) return
    corriendo = true
    requestAnimationFrame(dibujar)
  }

  armar()
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible) arrancar()
  }).observe(lienzo)
  if (quieto) dibujar(0)

  new ResizeObserver(() => {
    if (lienzo.clientWidth !== ancho || lienzo.height === 0) {
      armar()
      if (quieto || !visible) dibujar(0)
    }
  }).observe(lienzo)
}
