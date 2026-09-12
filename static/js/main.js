document.addEventListener("DOMContentLoaded", () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach((link) => {
        if (!link.rel.includes("noopener")) {
            link.rel = `${link.rel} noopener noreferrer`.trim();
        }
    });

    // Terminal-style typing effect for the final cybersecurity status line
    const statusLine = document.querySelector(
        ".terminal-body .output.accent"
    );

    if (statusLine) {
        const finalText = statusLine.textContent.trim();

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!reducedMotion) {
            statusLine.textContent = "";

            const cursor = document.createElement("span");
            cursor.className = "cyber-cursor";
            cursor.setAttribute("aria-hidden", "true");

            let index = 0;

            const typeNextCharacter = () => {
                if (index < finalText.length) {
                    statusLine.append(finalText.charAt(index));
                    index += 1;

                    window.setTimeout(
                        typeNextCharacter,
                        42
                    );

                    return;
                }

                statusLine.append(cursor);
            };

            window.setTimeout(
                typeNextCharacter,
                650
            );
        }
    }
});