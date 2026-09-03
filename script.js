// ==========================================
//  KRONOS CORTEX - SIMULADOR DE CONSEJO
// ==========================================

// ----- 1. DATOS DE LOS 8 PILARES -----
const pilaresData = [
    { id: 'council', icono: '🧠', nombre: 'KronosCouncil', desc: 'Agentes adversariales (RedTeam Hume)' },
    { id: 'veto', icono: '⛔', nombre: 'KronosVeto', desc: 'Kill Switch (Bloqueo de riesgos)' },
    { id: 'shield', icono: '🛡️', nombre: 'KronosShield', desc: 'Seguridad Edge + Honeypot' },
    { id: 'lineage', icono: '🌳', nombre: 'KronosLineage', desc: 'Procedencia Merkle (Estado T-1)' },
    { id: 'helm', icono: '🎙️', nombre: 'KronosHelm', desc: 'Control por voz y biométricos' },
    { id: 'quantum', icono: '🌀', nombre: 'KronosQuantum', desc: 'KMS Post-Cuántico (Dilithium)' },
    { id: 'actuator', icono: '⚙️', nombre: 'KronosActuator', desc: 'Ejecución autorizada' },
    { id: 'health', icono: '❤️', nombre: 'KronosHealth', desc: 'Detección de deriva (sanity checks)' }
];

// ----- 2. RENDERIZAR PILARES -----
function renderizarPilares() {
    const grid = document.getElementById('gridPilares');
    if (!grid) return;
    grid.innerHTML = pilaresData.map(p => `
        <div class="card-pilar" data-id="${p.id}">
            <span class="icono">${p.icono}</span>
            <h3>${p.nombre}</h3>
            <p>${p.desc}</p>
        </div>
    `).join('');
}

// ----- 3. ESTRELLAS FUGACES (Canvas) -----
function iniciarEstrellas() {
    const canvas = document.getElementById('estrellasCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function redimensionar() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', redimensionar);
    redimensionar();

    const meteoros = [];
    for (let i = 0; i < 18; i++) {
        meteoros.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
            vy: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
            tam: Math.random() * 1.8 + 0.5,
            brillo: Math.random() * 0.6 + 0.3,
            color: Math.random() > 0.6 ? '#ffd700' : '#00d4ff'
        });
    }
    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        meteoros.forEach(m => {
            m.x += m.vx * 0.5;
            m.y += m.vy * 0.5;
            if (m.x < 0 || m.x > canvas.width) m.vx *= -1;
            if (m.y < 0 || m.y > canvas.height) m.vy *= -1;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.vx * 18, m.y - m.vy * 18);
            ctx.strokeStyle = m.color + Math.floor(m.brillo * 50).toString(16).padStart(2, '0');
            ctx.lineWidth = m.tam * 0.6;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.tam * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = m.color;
            ctx.shadowColor = m.color;
            ctx.shadowBlur = 20;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        requestAnimationFrame(dibujar);
    }
    dibujar();
}

// ----- 4. SIMULADOR DEL CONSEJO (3 Rondas) -----
const logElement = document.getElementById('logConsejo');
const veredictoElement = document.getElementById('veredictoFinal');
const firmaElement = document.getElementById('firmaFinal');

function simularDeliberacion() {
    // Limpiar y mostrar inicio
    logElement.innerHTML = `<p>🔄 Iniciando Protocolo de 3 Rondas...</p>`;
    veredictoElement.textContent = '⏳ Deliberando...';
    veredictoElement.style.color = '#ffd700';
    firmaElement.textContent = 'Firma: ---';
    document.getElementById('btnDeliberar').disabled = true;

    const agentes = ['🧠 Estrategia', '⚖️ Riesgo', '📜 Legal', '🤖 RedTeam'];
    let logTexto = '<p><span class="ronda">▶ RONDA 1:</span> Análisis independiente...</p>';
    
    // Ronda 1
    setTimeout(() => {
        logTexto += `<p>  ${agentes[0]}: Recomienda APROBAR (Verde 0)</p>`;
        logTexto += `<p>  ${agentes[1]}: Recomienda APROBAR (Verde 0)</p>`;
        logTexto += `<p>  ${agentes[2]}: Recomienda RECHAZAR (Rojo 1) - Riesgo Legal</p>`;
        logTexto += `<p>  ${agentes[3]}: Atacando punto débil... (RedTeam activo)</p>`;
        logElement.innerHTML = logTexto;
    }, 1200);

    // Ronda 2 (Cross-examination)
    setTimeout(() => {
        logTexto += `<p><span class="ronda">▶ RONDA 2:</span> Interrogatorio cruzado (RedTeam desafía)</p>`;
        logTexto += `<p>  🤖 RedTeam: "El agente Legal no consideró la cláusula LFPDPPP Art. 16"</p>`;
        logTexto += `<p>  📜 Legal: "Corrección aceptada. Ajustando metadatos..."</p>`;
        logElement.innerHTML = logTexto;
    }, 2500);

    // Ronda 3 (Síntesis y Veredicto)
    setTimeout(() => {
        // Lógica pseudo-aleatoria (pero con peso a "Verde 0" para que no siempre sea negativo)
        const random = Math.random();
        let verdict, color, firma;
        if (random < 0.35) {
            verdict = '🔴 ROJO 1 (VETADO)';
            color = '#ff2244';
            firma = `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
        } else {
            verdict = '🟢 VERDE 0 (APROBADO)';
            color = '#00ff88';
            firma = `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
        }

        logTexto += `<p><span class="ronda">▶ RONDA 3:</span> Síntesis final. Generando Decision Trace...</p>`;
        logTexto += `<p class="veredicto">⚡ Veredicto: ${verdict}</p>`;
        logTexto += `<p>🔐 Firma Criptográfica (Dual RSA/Dilithium): ${firma}</p>`;
        logElement.innerHTML = logTexto;

        veredictoElement.textContent = verdict;
        veredictoElement.style.color = color;
        firmaElement.textContent = `Firma: ${firma}`;
        document.getElementById('btnDeliberar').disabled = false;
    }, 4000);
}

// ----- 5. KILL SWITCH (KronosVeto) -----
function activarVeto() {
    logElement.innerHTML = `<p>⛔ <span style="color:#ff2244; font-weight:bold;">KRONOSVETO ACTIVADO</span></p>`;
    logElement.innerHTML += `<p>🛑 Kill Switch ejecutado. Bloqueando acciones que violan políticas de riesgo.</p>`;
    logElement.innerHTML += `<p>🔒 Sistema en cuarentena. Requiere autorización manual.</p>`;
    veredictoElement.textContent = '⛔ VETADO (Kill Switch)';
    veredictoElement.style.color = '#ff2244';
    firmaElement.textContent = 'Firma: EMERGENCY_OVERRIDE';
}

// ----- 6. INICIALIZAR -----
document.addEventListener('DOMContentLoaded', () => {
    renderizarPilares();
    iniciarEstrellas();

    // Botones
    document.getElementById('btnDeliberar').addEventListener('click', simularDeliberacion);
    document.getElementById('btnVeto').addEventListener('click', activarVeto);

    // Actualizar hash de integridad simulado
    setInterval(() => {
        const hash = document.getElementById('hashIntegridad');
        if (hash) {
            const chars = '0123456789ABCDEF';
            let newHash = '0x';
            for (let i = 0; i < 8; i++) newHash += chars[Math.floor(Math.random() * 16)];
            newHash += '...';
            for (let i = 0; i < 4; i++) newHash += chars[Math.floor(Math.random() * 16)];
            hash.textContent = newHash;
        }
    }, 5000);

    console.log('🧠 Kronos Cortex activado. 8 Pilares en línea.');
    console.log('🔒 Protocolo de Accountability listo.');
});