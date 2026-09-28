<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MID90S (2018) | Experiência Interativa & Guia JS</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;800&family=Permanent+Marker&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        /* ==========================================================================
           1. VARIÁVEIS E ESTILOS BASE (ESTÉTICA GRUNGE SKATE 90S)
           ========================================================================== */
        :root {
            --bg-asphalt: #0d0d0f;
            --bg-matte-black: #151518;
            --bg-card: #1c1c21;
            --accent-red-dark: #8b0000;
            --accent-red-vivid: #c01a1a;
            --accent-red-bright: #e63946;
            --accent-yellow-tape: #e6b800;
            --text-white: #ffffff;
            --text-light-gray: #e2e8f0;
            --text-muted: #8e8ea0;
            --border-grunge: #2a2a35;
            --shadow-xerox: 5px 5px 0px rgba(139, 0, 0, 0.4);
            --shadow-xerox-black: 6px 6px 0px #000000;
            
            --font-impact: 'Bebas Neue', sans-serif;
            --font-street: 'Permanent Marker', cursive;
            --font-mono: 'Space Mono', monospace;
            --font-body: 'Inter', sans-serif;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-asphalt);
            color: var(--text-light-gray);
            font-family: var(--font-body);
            line-height: 1.6;
            overflow-x: hidden;
            position: relative;
        }

        /* Scanlines & Ruído VHS Base */
        .vhs-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0, 0, 0, 0.4) 50%,
                rgba(0, 0, 0, 0.4)
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 90;
            opacity: 0.25;
            transition: opacity 0.3s ease;
        }

        /* EFEITO VHS INTENSO (Ativado via JS ao clicar em 'Entrar na Crew') */
        body.vhs-active .vhs-overlay {
            opacity: 0.8;
            animation: vhsFlicker 0.15s infinite;
        }

        body.vhs-active {
            animation: vhsGlitch 0.3s infinite alternate;
            filter: contrast(130%) saturate(140%) hue-rotate(-5deg);
        }

        @keyframes vhsFlicker {
            0% { opacity: 0.75; }
            50% { opacity: 0.95; }
            100% { opacity: 0.8; }
        }

        @keyframes vhsGlitch {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-3px, 2px); }
            40% { transform: translate(3px, -1px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(2px, 1px); }
            100% { transform: translate(0, 0); }
        }

        /* Indicador HUD VHS Play/Rec */
        #vhs-hud {
            position: fixed;
            top: 25px;
            right: 25px;
            z-index: 999;
            background: rgba(0, 0, 0, 0.85);
            border: 2px solid var(--accent-red-vivid);
            padding: 8px 16px;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: #00ff66;
            display: none;
            align-items: center;
            gap: 10px;
            box-shadow: 4px 4px 0px #000;
        }

        .rec-dot {
            width: 12px;
            height: 12px;
            background-color: #ff0000;
            border-radius: 50%;
            animation: blink 0.8s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.1; }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-asphalt);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--accent-red-dark);
        }

        /* Header / Nav */
        .header {
            position: sticky;
            top: 0;
            z-index: 80;
            background-color: rgba(13, 13, 15, 0.95);
            border-bottom: 2px solid var(--accent-red-dark);
            backdrop-filter: blur(8px);
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0.8rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            text-decoration: none;
        }

        .logo-tag {
            background-color: var(--accent-red-vivid);
            color: var(--text-white);
            font-family: var(--font-mono);
            font-size: 0.7rem;
            font-weight: bold;
            padding: 0.2rem 0.5rem;
            text-transform: uppercase;
            box-shadow: 2px 2px 0px #000;
        }

        .logo-text {
            font-family: var(--font-impact);
            font-size: 2.2rem;
            color: var(--text-white);
            letter-spacing: 2px;
        }

        .nav-links {
            display: flex;
            gap: 1.5rem;
            list-style: none;
        }

        .nav-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 0.85rem;
            text-transform: uppercase;
            transition: color 0.2s;
        }

        .nav-links a:hover {
            color: var(--accent-red-bright);
        }

        /* Hero Section */
        .hero {
            position: relative;
            padding: 6rem 1.5rem 5rem;
            min-height: 85vh;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 2px solid var(--border-grunge);
            background: linear-gradient(180deg, rgba(13, 13, 15, 0.75) 0%, rgba(21, 21, 24, 0.95) 100%),
                        url('https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat;
        }

        .hero-content {
            max-width: 900px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            z-index: 10;
        }

        .vhs-badge {
            background: #000;
            border: 1px solid var(--accent-red-dark);
            padding: 0.4rem 1rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--accent-yellow-tape);
            box-shadow: var(--shadow-xerox-black);
            letter-spacing: 2px;
        }

        .title-huge {
            font-family: var(--font-impact);
            font-size: clamp(3rem, 8vw, 6rem);
            line-height: 0.95;
            color: var(--text-white);
            text-transform: uppercase;
            letter-spacing: 4px;
            text-shadow: 4px 4px 0px var(--accent-red-dark), 7px 7px 0px #000;
        }

        .title-huge span {
            color: var(--accent-red-vivid);
            display: block;
            font-family: var(--font-street);
            font-size: clamp(2rem, 5vw, 4rem);
            text-shadow: 3px 3px 0px #000;
            letter-spacing: 1px;
            margin-top: 0.5rem;
        }

        .hero-description {
            font-size: 1.1rem;
            color: var(--text-light-gray);
            max-width: 750px;
            line-height: 1.7;
            background: rgba(0,0,0,0.7);
            padding: 1.2rem;
            border-left: 4px solid var(--accent-red-vivid);
            box-shadow: var(--shadow-xerox-black);
        }

        /* Botões Estilo Skate Punk */
        .btn-grunge {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            background-color: var(--accent-red-dark);
            color: var(--text-white);
            font-family: var(--font-impact);
            font-size: 1.4rem;
            letter-spacing: 2px;
            padding: 0.8rem 2rem;
            text-decoration: none;
            text-transform: uppercase;
            border: 2px solid #000;
            box-shadow: var(--shadow-xerox-black);
            transition: all 0.15s ease;
            cursor: pointer;
        }

        .btn-grunge:hover {
            background-color: var(--accent-red-vivid);
            transform: translate(-3px, -3px);
            box-shadow: 8px 8px 0px #000;
        }

        .btn-grunge-yellow {
            background-color: var(--accent-yellow-tape);
            color: #000;
            font-weight: bold;
        }

        .btn-grunge-yellow:hover {
            background-color: #ffd700;
        }

        /* Seções e Grid */
        .section-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4.5rem 1.5rem;
        }

        .section-header {
            margin-bottom: 3rem;
            text-align: center;
        }

        .section-title {
            font-family: var(--font-impact);
            font-size: clamp(2.5rem, 5vw, 3.8rem);
            color: var(--text-white);
            text-transform: uppercase;
            letter-spacing: 3px;
            display: inline-block;
            border-bottom: 4px solid var(--accent-red-dark);
            padding-bottom: 0.2rem;
        }

        .section-subtitle {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-muted);
            text-transform: uppercase;
            margin-top: 0.5rem;
        }

        .grid-2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
        }

        .grunge-card {
            background-color: var(--bg-matte-black);
            border: 2px solid var(--border-grunge);
            padding: 2rem;
            position: relative;
            box-shadow: var(--shadow-xerox-black);
        }

        .grunge-card-title {
            font-family: var(--font-impact);
            font-size: 1.8rem;
            color: var(--text-white);
            margin-bottom: 1rem;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        /* K7 Player Simulado */
        .k7-player {
            background: #111113;
            border: 2px solid #333;
            padding: 1.2rem;
            margin-top: 1.5rem;
            box-shadow: inset 0 0 10px #000;
        }

        .k7-title {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--accent-yellow-tape);
            margin-bottom: 0.8rem;
            display: flex;
            justify-content: space-between;
        }

        .k7-controls {
            display: flex;
            gap: 0.8rem;
            align-items: center;
        }

        .btn-k7 {
            background: #222;
            border: 1px solid #444;
            color: #fff;
            padding: 0.5rem 1rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-k7:hover {
            background: var(--accent-red-dark);
            border-color: var(--accent-red-vivid);
        }

        /* Galeria e Filtros */
        .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }

        .btn-filter {
            background: #1a1a1f;
            border: 1px solid var(--border-grunge);
            color: var(--text-muted);
            padding: 0.5rem 1.2rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.2s;
        }

        .btn-filter.active, .btn-filter:hover {
            background: var(--accent-red-vivid);
            color: #fff;
            border-color: #000;
            box-shadow: 3px 3px 0px #000;
        }

        .grid-4 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 1.5rem;
        }

        .polaroid-card {
            background-color: #1a1a1e;
            border: 1px solid #333;
            padding: 0.8rem;
            box-shadow: var(--shadow-xerox-black);
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .polaroid-card.hidden {
            display: none;
        }

        .polaroid-img-wrapper {
            aspect-ratio: 4/3;
            overflow: hidden;
            background-color: #000;
            border: 1px solid #222;
            margin-bottom: 0.8rem;
        }

        .polaroid-img-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: contrast(110%) grayscale(25%);
            transition: filter 0.3s ease;
        }

        .polaroid-card:hover .polaroid-img-wrapper img {
            filter: contrast(125%) grayscale(0%);
        }

        .polaroid-caption {
            font-family: var(--font-street);
            font-size: 1.2rem;
            color: var(--text-white);
        }

        .polaroid-role {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-muted);
        }

        /* Seção Final - Crew & Críticas */
        .crew-section {
            background-color: var(--bg-matte-black);
            border-top: 2px solid var(--border-grunge);
            border-bottom: 2px solid var(--border-grunge);
            padding: 4.5rem 1.5rem;
        }

        .crew-counter-box {
            background-color: #000;
            border: 2px solid var(--accent-red-vivid);
            padding: 1.5rem;
            text-align: center;
            margin-bottom: 1.5rem;
            box-shadow: var(--shadow-xerox-black);
        }

        .counter-number {
            font-family: var(--font-impact);
            font-size: 3.5rem;
            color: var(--accent-yellow-tape);
            line-height: 1;
        }

        .testimonial-card {
            background-color: #111114;
            border-left: 3px solid var(--accent-red-vivid);
            padding: 1rem 1.2rem;
            margin-bottom: 1rem;
            font-family: var(--font-mono);
            font-size: 0.85rem;
        }

        .testimonial-author {
            color: var(--accent-yellow-tape);
            font-size: 0.75rem;
            margin-top: 0.4rem;
        }

        /* Modal VHS Customizado */
        .modal-vhs-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            backdrop-filter: blur(5px);
        }

        .modal-vhs-content {
            background: #15151a;
            border: 3px solid var(--accent-red-vivid);
            max-width: 600px;
            width: 100%;
            padding: 2.5rem;
            box-shadow: 10px 10px 0px #000;
            position: relative;
            text-align: center;
        }

        .modal-vhs-title {
            font-family: var(--font-impact);
            font-size: 3rem;
            color: var(--text-white);
            letter-spacing: 2px;
            margin-bottom: 1rem;
            text-shadow: 3px 3px 0px var(--accent-red-dark);
        }

        .modal-vhs-body {
            font-family: var(--font-mono);
            font-size: 0.95rem;
            color: var(--text-light-gray);
            line-height: 1.7;
            margin-bottom: 2rem;
            background: #000;
            padding: 1.2rem;
            border: 1px dashed var(--accent-red-dark);
        }

        /* Seção do Visualizador do Script JS */
        .code-section {
            background-color: #0a0a0c;
            padding: 4.5rem 1.5rem;
        }

        .code-box {
            max-width: 1100px;
            margin: 0 auto;
            background-color: #111115;
            border: 2px solid var(--accent-red-vivid);
            box-shadow: 8px 8px 0px #000;
            overflow: hidden;
        }

        .code-box-header {
            background-color: #1c1c24;
            padding: 0.8rem 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #333;
        }

        .code-box-title {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--accent-yellow-tape);
            font-weight: bold;
        }

        pre code {
            display: block;
            padding: 1.5rem;
            max-height: 500px;
            overflow-y: auto;
            font-family: 'Space Mono', monospace;
            font-size: 0.8rem;
            color: #d1d5db;
            line-height: 1.5;
            background-color: #0b0b0e;
        }

        /* Footer */
        .footer {
            background-color: #070709;
            border-top: 2px solid var(--border-grunge);
            padding: 3rem 1.5rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--text-muted);
            text-align: center;
        }
    </style>
</head>
<body>

    <!-- Overlay VHS & HUD Status -->
    <div class="vhs-overlay"></div>
    <div id="vhs-hud">
        <div class="rec-dot"></div>
        <span id="vhs-hud-text">PLAY 📼 00:19:96</span>
    </div>

    <header class="header">
        <div class="header-container">
            <a href="#" class="logo">
                <span class="logo-tag">REC ● 1996</span>
                <span class="logo-text">MID90S</span>
            </a>
            <ul class="nav-links">
                <li><a href="#sobre">/ Sobre</a></li>
                <li><a href="#galeria">/ Galeria</a></li>
                <li><a href="#crew">/ A Crew</a></li>
                <li><a href="#script-js">/ Script.js</a></li>
            </ul>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <div class="vhs-badge">
                <i class="fa-solid fa-tape"></i> A24 FILMS | SUPER 16MM | DIR. JONAH HILL
            </div>

            <h1 class="title-huge">
                MID90S: CULTURA E SKATE
                <span>Jornada de Amadurecimento em Los Angeles</span>
            </h1>

            <p class="hero-description">
                Acompanhe o jovem Stevie durante um verão transformador nos anos 90 em Los Angeles. Fugindo de um ambiente familiar sufocante, ele encontra na cultura do skate de rua e em um grupo de jovens desajustados o seu verdadeiro refúgio e identidade.
            </p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 1rem;">
                <button id="btn-entrar-crew" class="btn-grunge btn-grunge-yellow">
                    <i class="fa-solid fa-skull"></i> Entrar na Crew
                </button>
                <a href="#script-js" class="btn-grunge">
                    <i class="fa-solid fa-code"></i> Ver Código JS
                </a>
            </div>
        </div>
    </section>

    <section id="sobre" class="section-container">
        <div class="section-header">
            <h2 class="section-title">SOBRE O FILME</h2>
            <p class="section-subtitle">// HISTÓRIA, SKATE & ESTÉTICA ANALÓGICA DOS ANOS 90</p>
        </div>

        <div class="grid-2">
            <!-- Coluna 1 -->
            <div class="grunge-card">
                <h3 class="grunge-card-title">
                    <i class="fa-solid fa-compact-disc" style="color: var(--accent-red-vivid);"></i>
                    História & Trilha Sonora
                </h3>
                <p style="color: var(--text-light-gray); margin-bottom: 1rem;">
                    <em>Mid90s</em> captura a essência crua da adolescência. Com uma trilha sonora marcante cheia de <strong>Hip-Hop clássico (Wu-Tang Clan, Cypress Hill, A Tribe Called Quest)</strong> e composições originais de Trent Reznor & Atticus Ross, o filme é um portal do tempo para a era das fitas cassete.
                </p>

                <!-- Simulador Tocador de Fita K7 -->
                <div class="k7-player">
                    <div class="k7-title">
                        <span id="k7-track-name">Track 01: Protect Ya Neck - Wu-Tang Clan</span>
                        <span id="k7-status" style="color: #00ff66;">[STOPPED]</span>
                    </div>
                    <div class="k7-controls">
                        <button class="btn-k7" id="btn-k7-play"><i class="fa-solid fa-play"></i> Play</button>
                        <button class="btn-k7" id="btn-k7-next"><i class="fa-solid fa-forward"></i> Próxima</button>
                    </div>
                </div>
            </div>

            <!-- Coluna 2 -->
            <div class="grunge-card">
                <h3 class="grunge-card-title">
                    <i class="fa-solid fa-video" style="color: var(--accent-red-vivid);"></i>
                    Skate de Rua & Fitas VHS
                </h3>
                <p style="color: var(--text-light-gray); margin-bottom: 1rem;">
                    Filmado inteiramente em **película Super 16mm** e exibido no formato **4:3 (quadrado)**, o diretor Jonah Hill homenageia os vídeos caseiros de skate que circulavam em fitas VHS na década de 90. O filme celebra a liberdade, os tombos e a fraternidade dos calçadões de L.A.
                </p>
                <div style="background: #000; padding: 1rem; border-left: 3px solid var(--accent-yellow-tape); font-family: var(--font-mono); font-size: 0.8rem;">
                    Format: Super 16mm Color Film<br>
                    Aspect Ratio: 1.33 : 1 (4:3 Classic TV)<br>
                    Sound: Analog Cassette Tape Master
                </div>
            </div>
        </div>
    </section>

    <section id="galeria" style="background-color: var(--bg-matte-black); border-top: 1px solid var(--border-grunge); border-bottom: 1px solid var(--border-grunge);">
        <div class="section-container">
            <div class="section-header">
                <h2 class="section-title">GALERIA DE CENAS & PERSONAGENS</h2>
                <p class="section-subtitle">// USE OS FILTROS PARA NAVEGAR PELO FANZINE</p>
            </div>

            <!-- Botões de Filtro -->
            <div class="filter-buttons">
                <button class="btn-filter active" data-filter="all">Todos</button>
                <button class="btn-filter" data-filter="stevie">Stevie</button>
                <button class="btn-filter" data-filter="crew">A Crew</button>
                <button class="btn-filter" data-filter="la">Los Angeles 90s</button>
            </div>

            <!-- Grid Galeria -->
            <div class="grid-4">
                <div class="polaroid-card" data-category="stevie">
                    <div class="polaroid-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=600&auto=format&fit=crop" alt="Stevie">
                    </div>
                    <div class="polaroid-caption">Stevie "Sunburn"</div>
                    <div class="polaroid-role">O garoto aprendendo a manobrar</div>
                </div>

                <div class="polaroid-card" data-category="crew">
                    <div class="polaroid-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?q=80&w=600&auto=format&fit=crop" alt="Ray">
                    </div>
                    <div class="polaroid-caption">Ray & Fuckshit</div>
                    <div class="polaroid-role">Liderança na Motor Avenue</div>
                </div>

                <div class="polaroid-card" data-category="la">
                    <div class="polaroid-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?q=80&w=600&auto=format&fit=crop" alt="Pista LA">
                    </div>
                    <div class="polaroid-caption">Courthouse LA</div>
                    <div class="polaroid-role">Pista lendária de skate</div>
                </div>

                <div class="polaroid-card" data-category="crew">
                    <div class="polaroid-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop" alt="Fourth Grade">
                    </div>
                    <div class="polaroid-caption">Fourth Grade</div>
                    <div class="polaroid-role">O câmera da fita VHS</div>
                </div>
            </div>
        </div>
    </section>

    <section id="crew" class="crew-section">
        <div class="section-container" style="padding-top: 0; padding-bottom: 0;">
            <div class="grid-2">
                <!-- Coluna 1: Entrar na Crew -->
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                    <div class="crew-counter-box" style="width: 100%;">
                        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                            SKATERS REGISTRADOS NA CREW
                        </div>
                        <div class="counter-number" id="crew-counter">4,892</div>
                        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-red-bright); margin-top: 0.5rem;">
                            ● STATUS: VAGAS ABERTAS EM LA
                        </div>
                    </div>

                    <button id="btn-entrar-crew-2" class="btn-grunge btn-grunge-yellow" style="width: 100%; justify-content: center;">
                        <i class="fa-solid fa-hand-fist"></i> QUERO ENTRAR NA CREW
                    </button>
                </div>

                <!-- Coluna 2: Críticas e Depoimentos -->
                <div>
                    <h3 class="grunge-card-title" style="margin-bottom: 1.5rem;">
                        <i class="fa-solid fa-quote-left" style="color: var(--accent-red-vivid);"></i>
                        Depoimentos & Críticas
                    </h3>

                    <div class="testimonial-card">
                        "Uma cápsula do tempo visceral. O filme captura a essência perfeita do skate antes da era da internet."
                        <div class="testimonial-author">// Rolling Stone Magazine</div>
                    </div>

                    <div class="testimonial-card">
                        "Stevie lembra todo mundo do primeiro tombo no asfalto e da sensação indescritível de acertar um Ollie."
                        <div class="testimonial-author">// Skate Magazine 1996</div>
                    </div>

                    <div class="testimonial-card">
                        "A trilha sonora em fita cassette é 10/10. Puro Hip-Hop underground de L.A."
                        <div class="testimonial-author">// Fã de Mid90s</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="script-js" class="code-section">
        <div class="section-header">
            <h2 class="section-title">ARQUIVO SCRIPT.JS</h2>
            <p class="section-subtitle">// CÓDIGO JAVASCRIPT COMPLETO E PRONTO PARA COPIAR</p>
        </div>

        <div class="code-box">
            <div class="code-box-header">
                <span class="code-box-title">
                    <i class="fa-solid fa-file-code"></i> script.js
                </span>
                <button class="btn-k7" id="btn-copy-js" style="background: var(--accent-red-dark); border: none;">
                    <i class="fa-regular fa-copy"></i> Copiar script.js
                </button>
            </div>
            <pre><code id="jsCodeText">/* ==========================================================================
   SCRIPT.JS - INTERATIVIDADE RETRÔ MID90S (EFEITO VHS & CONTROLES)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. WEB AUDIO API - Som de clique analógico/Fita VHS (Sem arquivos externos)
    function playVHSSound() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();

            // Ruído branco rápido (Simula o cabeçote da fita VHS)
            const bufferSize = ctx.sampleRate * 0.15;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 800;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start();
        } catch (e) {
            console.log('Audio Context não suportado no navegador.');
        }
    }

    // 2. BOTÃO 'ENTRAR NA CREW' - Ativa efeito VHS & Modal com Gírias
    const btnCrew1 = document.getElementById('btn-entrar-crew');
    const btnCrew2 = document.getElementById('btn-entrar-crew-2');
    const modalBackdrop = document.getElementById('modal-vhs');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const vhsHud = document.getElementById('vhs-hud');
    const crewCounter = document.getElementById('crew-counter');

    function triggerCrewExperience() {
        playVHSSound();

        // Ativa Efeito VHS e HUD na Tela
        document.body.classList.add('vhs-active');
        if (vhsHud) vhsHud.style.display = 'flex';

        // Incrementar Contador da Crew
        if (crewCounter) {
            let count = parseInt(crewCounter.innerText.replace(',', ''));
            crewCounter.innerText = (count + 1).toLocaleString();
        }

        // Abrir Modal após pequeno delay do Glitch
        setTimeout(() => {
            if (modalBackdrop) modalBackdrop.style.display = 'flex';
        }, 400);
    }

    if (btnCrew1) btnCrew1.addEventListener('click', triggerCrewExperience);
    if (btnCrew2) btnCrew2.addEventListener('click', triggerCrewExperience);

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            playVHSSound();
            document.body.classList.remove('vhs-active');
            if (vhsHud) vhsHud.style.display = 'none';
            if (modalBackdrop) modalBackdrop.style.display = 'none';
        });
    }

    // 3. TOCADOR DE FITA K7 INTERATIVO
    const k7Playlist = [
        "Track 01: Protect Ya Neck - Wu-Tang Clan",
        "Track 02: 93 'til Infinity - Souls of Mischief",
        "Track 03: Passin' Me By - The Pharcyde",
        "Track 04: Mid90s Original Theme - Trent Reznor"
    ];
    let currentTrackIndex = 0;
    let isPlaying = false;

    const k7TrackName = document.getElementById('k7-track-name');
    const k7Status = document.getElementById('k7-status');
    const btnK7Play = document.getElementById('btn-k7-play');
    const btnK7Next = document.getElementById('btn-k7-next');

    if (btnK7Play) {
        btnK7Play.addEventListener('click', () => {
            playVHSSound();
            isPlaying = !isPlaying;
            if (isPlaying) {
                k7Status.innerText = '[PLAYING 📼]';
                k7Status.style.color = '#00ff66';
                btnK7Play.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            } else {
                k7Status.innerText = '[PAUSED]';
                k7Status.style.color = '#ffcc00';
                btnK7Play.innerHTML = '<i class="fa-solid fa-play"></i> Play';
            }
        });
    }

    if (btnK7Next) {
        btnK7Next.addEventListener('click', () => {
            playVHSSound();
            currentTrackIndex = (currentTrackIndex + 1) % k7Playlist.length;
            if (k7TrackName) k7TrackName.innerText = k7Playlist[currentTrackIndex];
        });
    }

    // 4. FILTROS DE GALERIA
    const filterButtons = document.querySelectorAll('.btn-filter');
    const polaroidCards = document.querySelectorAll('.polaroid-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playVHSSound();
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            polaroidCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});</code></pre>
        </div>
    </section>

    <div id="modal-vhs" class="modal-vhs-backdrop">
        <div class="modal-vhs-content">
            <h2 class="modal-vhs-title">SALVE, MANO! 🛹📼</h2>
            <div class="modal-vhs-body">
                "Você agora é oficialmente parte do bando! Pega o carrinho e cola na pista de Los Angeles. No Olho da Rua, se você cair feio no asfalto, levanta, sacode a poeira e tenta a manobra de novo. BORA DISSIPAR ESSA ENERGIA!"
            </div>
            <button id="btn-close-modal" class="btn-grunge btn-grunge-yellow">
                <i class="fa-solid fa-check"></i> MANDOU BEM (FECHAR)
            </button>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        © 2026 Mid90s Interactive Project. Desenvolvido para fins pedagógicos e estudo de front-end.
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // Web Audio API para Som Analógico
            function playVHSSound() {
                try {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    const ctx = new AudioCtx();

                    const bufferSize = ctx.sampleRate * 0.12;
                    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                    const data = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        data[i] = Math.random() * 2 - 1;
                    }

                    const noise = ctx.createBufferSource();
                    noise.buffer = buffer;

                    const filter = ctx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.value = 900;

                    const gain = ctx.createGain();
                    gain.gain.setValueAtTime(0.25, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

                    noise.connect(filter);
                    filter.connect(gain);
                    gain.connect(ctx.destination);

                    noise.start();
                } catch (e) {
                    console.log('Audio Context não suportado.');
                }
            }

            // Ativação da Crew e Glitch VHS
            const btnCrew1 = document.getElementById('btn-entrar-crew');
            const btnCrew2 = document.getElementById('btn-entrar-crew-2');
            const modalBackdrop = document.getElementById('modal-vhs');
            const btnCloseModal = document.getElementById('btn-close-modal');
            const vhsHud = document.getElementById('vhs-hud');
            const crewCounter = document.getElementById('crew-counter');

            function triggerCrewExperience() {
                playVHSSound();

                document.body.classList.add('vhs-active');
                if (vhsHud) vhsHud.style.display = 'flex';

                if (crewCounter) {
                    let count = parseInt(crewCounter.innerText.replace(',', ''));
                    crewCounter.innerText = (count + 1).toLocaleString();
                }

                setTimeout(() => {
                    if (modalBackdrop) modalBackdrop.style.display = 'flex';
                }, 350);
            }

            if (btnCrew1) btnCrew1.addEventListener('click', triggerCrewExperience);
            if (btnCrew2) btnCrew2.addEventListener('click', triggerCrewExperience);

            if (btnCloseModal) {
                btnCloseModal.addEventListener('click', () => {
                    playVHSSound();
                    document.body.classList.remove('vhs-active');
                    if (vhsHud) vhsHud.style.display = 'none';
                    if (modalBackdrop) modalBackdrop.style.display = 'none';
                });
            }

            // Tocador de Fita K7
            const k7Playlist = [
                "Track 01: Protect Ya Neck - Wu-Tang Clan",
                "Track 02: 93 'til Infinity - Souls of Mischief",
                "Track 03: Passin' Me By - The Pharcyde",
                "Track 04: Mid90s Original Theme - Trent Reznor"
            ];
            let currentTrackIndex = 0;
            let isPlaying = false;

            const k7TrackName = document.getElementById('k7-track-name');
            const k7Status = document.getElementById('k7-status');
            const btnK7Play = document.getElementById('btn-k7-play');
            const btnK7Next = document.getElementById('btn-k7-next');

            if (btnK7Play) {
                btnK7Play.addEventListener('click', () => {
                    playVHSSound();
                    isPlaying = !isPlaying;
                    if (isPlaying) {
                        k7Status.innerText = '[PLAYING 📼]';
                        k7Status.style.color = '#00ff66';
                        btnK7Play.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
                    } else {
                        k7Status.innerText = '[PAUSED]';
                        k7Status.style.color = '#ffcc00';
                        btnK7Play.innerHTML = '<i class="fa-solid fa-play"></i> Play';
                    }
                });
            }

            if (btnK7Next) {
                btnK7Next.addEventListener('click', () => {
                    playVHSSound();
                    currentTrackIndex = (currentTrackIndex + 1) % k7Playlist.length;
                    if (k7TrackName) k7TrackName.innerText = k7Playlist[currentTrackIndex];
                });
            }

            // Filtros da Galeria
            const filterButtons = document.querySelectorAll('.btn-filter');
            const polaroidCards = document.querySelectorAll('.polaroid-card');

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    playVHSSound();
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    polaroidCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        if (filterValue === 'all' || category === filterValue) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                });
            });

            // Copiar Código JS
            const btnCopyJS = document.getElementById('btn-copy-js');
            if (btnCopyJS) {
                btnCopyJS.addEventListener('click', () => {
                    const jsText = document.getElementById('jsCodeText').innerText;
                    const textarea = document.createElement('textarea');
                    textarea.value = jsText;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);

                    const originalHTML = btnCopyJS.innerHTML;
                    btnCopyJS.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
                    btnCopyJS.style.backgroundColor = '#00ff66';
                    btnCopyJS.style.color = '#000';

                    setTimeout(() => {
                        btnCopyJS.innerHTML = originalHTML;
                        btnCopyJS.style.backgroundColor = 'var(--accent-red-dark)';
                        btnCopyJS.style.color = '#fff';
                    }, 2000);
                });
            }
        });
    </script>
</body>
</html>
