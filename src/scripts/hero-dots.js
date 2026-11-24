// Puntitos de la portada fucsia, en la línea del cierre oscuro (styles/luma-fondo-puntos) pero con
// otro dibujo: los puntos forman curvas de nivel, como un mapa topográfico.
// - Algunos puntos (blanco y rosas claros) se prenden y apagan.
// - Un barrido de brillo cruza los puntos en diagonal, como en el footer. El fondo no se mueve.
// Con "reducir movimiento" queda quieto. Se pausa cuando la portada no está en pantalla.
// Liviano: los puntos quietos se dibujan una sola vez; en cada cuadro solo se redibujan los que titilan.
const lienzo = document.querySelector('[data-hero-dots]')
if (lienzo) {
  const ctx = lienzo.getContext('2d')
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fallback = document.querySelector('[data-hero-dots-fallback]')
  if (fallback) fallback.style.display = 'none'

  // Para ajustar: cuántos titilan y qué tan rápido
  const CHISPAS = 0.07 // proporción de puntos que titilan
  const RAPIDEZ = [0.9, 2.6] // velocidad mínima y máxima del titileo
  const COLORES = ['255,255,255', '253,232,255', '251,207,232'] // blanco, lila muy claro, rosa claro
  const PASO = 8
  const CURVAS = 7 // cuántas curvas de nivel entran en el dibujo
  const GROSOR = 0.12 // qué tan gruesas son las curvas
  const RADIO = 1.2

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
  // Altura del "terreno"; los puntos van donde la altura cae justo en una curva de nivel
  const altura = (x, y) => ruido(x * 0.0032 + 40, y * 0.0032 + 13) * 0.72 + ruido(x * 0.009 + 7, y * 0.009 + 3) * 0.28
  const enCurva = (x, y) => {
    const v = altura(x, y) * CURVAS
    return Math.abs(v - Math.round(v)) < GROSOR
  }

  const capa = document.createElement('canvas') // puntos quietos, dibujados una vez
  const cctx = capa.getContext('2d')
  let chispas = []
  let fijos = []
  let w = 0, h = 0, dpr = 1
  let visible = true
  let corriendo = false

  function armar() {
    dpr = Math.min(devicePixelRatio || 1, 2)
    w = lienzo.clientWidth
    h = lienzo.clientHeight
    for (const c of [lienzo, capa]) {
      c.width = Math.round(w * dpr)
      c.height = Math.round(h * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cctx.clearRect(0, 0, w, h)
    cctx.fillStyle = 'rgba(255,255,255,0.2)'
    chispas = []
    fijos = []
    for (let y = PASO / 2; y < h; y += PASO)
      for (let x = PASO / 2; x < w; x += PASO) {
        if (!enCurva(x, y)) continue
        if (azar(x * 0.37, y * 0.91) < CHISPAS) {
          chispas.push({
            x, y,
            color: COLORES[Math.floor(azar(y, x) * COLORES.length)],
            fase: azar(x, y * 3) * Math.PI * 2,
            vel: RAPIDEZ[0] + azar(y * 2, x) * (RAPIDEZ[1] - RAPIDEZ[0]),
          })
        } else {
          fijos.push(x, y)
          cctx.beginPath()
          cctx.arc(x, y, RADIO, 0, Math.PI * 2)
          cctx.fill()
        }
      }
  }

  function dibujar(t) {
    const s = t / 1000
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(capa, 0, 0, w, h)

    // Barrido de brillo: una franja que cruza en diagonal cada ~8 segundos
    if (!quieto) {
      const ciclo = w + h * 0.6 + 600
      const frente = ((s * 150) % ciclo) - 300
      for (let i = 0; i < fijos.length; i += 2) {
        const x = fijos[i], y = fijos[i + 1]
        const d = Math.abs(x + y * 0.6 - frente)
        if (d > 240) continue
        const luz = 1 - d / 240
        ctx.fillStyle = `rgba(255,255,255,${(0.55 * luz * luz).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, y, RADIO + luz * 0.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    for (const p of chispas) {
      const b = quieto ? 0.6 : 0.5 + 0.5 * Math.sin(s * p.vel + p.fase)
      const brillo = 0.2 + 0.78 * b * b
      ctx.fillStyle = `rgba(${p.color},${brillo.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, RADIO + b * 0.7, 0, Math.PI * 2)
      ctx.fill()
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
