document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // -------------------------------------------------------
    // External-link safety
    // -------------------------------------------------------
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        const rel = new Set((link.rel || "").split(/\s+/).filter(Boolean));
        rel.add("noopener");
        rel.add("noreferrer");
        link.rel = Array.from(rel).join(" ");
    });

    // -------------------------------------------------------
    // Reveal-on-scroll
    // -------------------------------------------------------
    const revealItems = document.querySelectorAll(".reveal");

    if (!reducedMotion && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("visible"));
    }

    // -------------------------------------------------------
    // Live clock in profile console
    // -------------------------------------------------------
    const clock = document.getElementById("live-clock");

    function updateClock() {
        if (!clock) return;

        const now = new Date();

        clock.textContent = now.toLocaleTimeString("en-CA", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }

    updateClock();
    window.setInterval(updateClock, 1000);

    // -------------------------------------------------------
    // Rotating low-key security telemetry messages
    // -------------------------------------------------------
    const consoleOutput = document.getElementById("console-output");

    if (consoleOutput && !reducedMotion) {
        const messages = [
            "[OK] Defensive security profile initialized",
            "[OK] Security+ credential loaded",
            "[OK] Windows / Linux skillset indexed",
            "[OK] Network analysis tools available",
            "[..] Monitoring Winter 2027 opportunities",
        ];

        let messageIndex = 0;

        window.setInterval(() => {
            const lines = consoleOutput.querySelectorAll("p");

            if (!lines.length) return;

            const target = lines[lines.length - 1];
            target.innerHTML = "";

            const status = document.createElement("span");
            status.textContent = "[..]";
            target.append(status);

            target.append(
                document.createTextNode(
                    ` ${messages[messageIndex].replace(/^\[[^\]]+\]\s*/, "")}`
                )
            );

            const cursor = document.createElement("span");
            cursor.className = "console-cursor";
            target.append(cursor);

            messageIndex = (messageIndex + 1) % messages.length;
        }, 4200);
    }

    // -------------------------------------------------------
    // Cyber network visualization
    // -------------------------------------------------------
    const canvas = document.getElementById("network-canvas");

    if (canvas && !reducedMotion) {
        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        let animationFrame = null;

        const nodeCount = 26;
        const nodes = [];
        const packets = [];

        function randomBetween(min, max) {
            return Math.random() * (max - min) + min;
        }

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();

            width = Math.max(rect.width, 1);
            height = Math.max(rect.height, 1);

            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        }

        function createNodes() {
            nodes.length = 0;

            for (let i = 0; i < nodeCount; i += 1) {
                nodes.push({
                    x: randomBetween(width * 0.05, width * 0.96),
                    y: randomBetween(height * 0.06, height * 0.94),
                    radius: randomBetween(1.2, 2.4),
                    phase: randomBetween(0, Math.PI * 2),
                    speed: randomBetween(0.00035, 0.00075),
                });
            }
        }

        function buildPackets() {
            packets.length = 0;

            for (let i = 0; i < 7; i += 1) {
                const startIndex = Math.floor(Math.random() * nodes.length);
                let endIndex = Math.floor(Math.random() * nodes.length);

                if (endIndex === startIndex) {
                    endIndex = (endIndex + 1) % nodes.length;
                }

                packets.push({
                    startIndex,
                    endIndex,
                    progress: Math.random(),
                    speed: randomBetween(0.0012, 0.003),
                });
            }
        }

        function drawConnections(time) {
            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const a = nodes[i];
                    const b = nodes[j];

                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 175) continue;

                    const alpha = (1 - distance / 175) * 0.11;

                    ctx.strokeStyle = `rgba(116, 227, 255, ${alpha})`;
                    ctx.lineWidth = 0.7;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }

            nodes.forEach((node) => {
                const pulse =
                    0.45 + Math.sin(time * node.speed + node.phase) * 0.25;

                ctx.fillStyle = `rgba(116, 227, 255, ${pulse})`;

                ctx.beginPath();
                ctx.arc(
                    node.x,
                    node.y,
                    node.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fill();

                ctx.strokeStyle =
                    `rgba(116, 227, 255, ${pulse * 0.28})`;

                ctx.beginPath();
                ctx.arc(
                    node.x,
                    node.y,
                    node.radius + 5,
                    0,
                    Math.PI * 2
                );
                ctx.stroke();
            });
        }

        function drawPackets() {
            packets.forEach((packet) => {
                const start = nodes[packet.startIndex];
                const end = nodes[packet.endIndex];

                if (!start || !end) return;

                packet.progress += packet.speed;

                if (packet.progress > 1) {
                    packet.progress = 0;
                    packet.startIndex = packet.endIndex;

                    packet.endIndex = Math.floor(
                        Math.random() * nodes.length
                    );

                    if (packet.endIndex === packet.startIndex) {
                        packet.endIndex =
                            (packet.endIndex + 1) % nodes.length;
                    }
                }

                const x =
                    start.x +
                    (end.x - start.x) * packet.progress;

                const y =
                    start.y +
                    (end.y - start.y) * packet.progress;

                ctx.fillStyle = "rgba(137, 247, 177, 0.9)";

                ctx.beginPath();
                ctx.arc(x, y, 1.7, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle =
                    "rgba(137, 247, 177, 0.18)";

                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.stroke();
            });
        }

        function animate(time) {
            ctx.clearRect(0, 0, width, height);

            drawConnections(time);
            drawPackets();

            animationFrame =
                window.requestAnimationFrame(animate);
        }

        function initializeNetwork() {
            resizeCanvas();
            createNodes();
            buildPackets();

            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }

            animationFrame =
                window.requestAnimationFrame(animate);
        }

        let resizeTimer = null;

        window.addEventListener(
            "resize",
            () => {
                window.clearTimeout(resizeTimer);

                resizeTimer = window.setTimeout(
                    initializeNetwork,
                    160
                );
            },
            { passive: true }
        );

        initializeNetwork();
    }
});