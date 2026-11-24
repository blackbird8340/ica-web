// Fondo de puntos del cierre (idea de styles/luma-fondo-puntos), con los colores de ICA.
// Una grilla de puntitos donde un "ruido" suave da forma, y algunos de color que se prenden y apagan.
// Un barrido de luz cruza el mapa despacio. Con "reducir movimiento" todo queda quieto. Se pausa cuando no está en pantalla.
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
        const color = azar(x * 0.37, y * 0.91) < 0.08 ? COLORES[Math.floor(azar(y, x) * COLORES.length)] : null
        puntos.push({ x, y, color, fase: azar(x, y * 3) * Math.PI * 2, vel: 0.8 + azar(y * 2, x) * 1.6 })
      }
  }

  function dibujar(t) {
    ctx.clearRect(0, 0, lienzo.clientWidth, lienzo.clientHeight)
    const s = t / 1000
    // Barrido de luz: una franja ancha que cruza el mapa en diagonal, cada ~9 segundos
    const ciclo = ancho + lienzo.clientHeight + 600
    const frente = ((s * 140) % ciclo) - 300
    for (const p of puntos) {
      let brillo
      if (p.color) {
        const b = 0.5 + 0.5 * Math.sin(s * p.vel + p.fase)
        brillo = quieto ? 0.6 : 0.2 + 0.7 * b * b
      } else {
        const d = Math.abs(p.x + p.y * 0.6 - frente)
        const luz = quieto ? 0 : Math.max(0, 1 - d / 260)
        brillo = 0.09 + 0.22 * luz * luz
      }
      ctx.fillStyle = `rgba(${p.color ?? '255,255,255'},${brillo.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.color ? RADIO * 1.15 : RADIO, 0, Math.PI * 2)
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
