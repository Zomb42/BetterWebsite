document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('essay-file');
    const essayList = document.getElementById('essay-list');
    const emptyState = document.getElementById('essay-empty');
    const kicker = document.getElementById('essay-kicker');
    const title = document.getElementById('essay-title');
    const meta = document.getElementById('essay-meta');
    const body = document.getElementById('essay-body');

    async function loadPublishedEssays() {
        try {
            const manifestResponse = await fetch('essays/manifest.json');
            if (!manifestResponse.ok) {
                return;
            }

            const essays = await manifestResponse.json();
            essays.forEach(async function(essayMeta) {
                const essayResponse = await fetch('essays/' + essayMeta.file);
                if (!essayResponse.ok) {
                    return;
                }

                const parsed = splitEssayText(await essayResponse.text(), essayMeta.title || essayMeta.file);
                addEssayToList({
                    title: essayMeta.title || parsed.title,
                    paragraphs: parsed.paragraphs,
                    date: essayMeta.date,
                    filename: essayMeta.file,
                    source: essayMeta.source || 'Published Essay'
                });
            });
        } catch (error) {
            // Opening the HTML file directly can block fetch; importing drafts still works.
        }
    }

    function splitEssayText(text, fallbackTitle) {
        const lines = text.replace(/\r\n/g, '\n').split('\n');
        const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);
        const parsedTitle = firstContentIndex >= 0 ? lines[firstContentIndex].trim().replace(/^#\s*/, '') : fallbackTitle;
        const remainingText = firstContentIndex >= 0 ? lines.slice(firstContentIndex + 1).join('\n') : '';
        const paragraphs = remainingText
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

        return {
            title: parsedTitle || fallbackTitle,
            paragraphs: paragraphs.length ? paragraphs : ['This essay is empty after the title.']
        };
    }

    function appendInlineFormatting(element, text) {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);

        parts.forEach((part) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const strong = document.createElement('strong');
                strong.textContent = part.slice(2, -2);
                element.appendChild(strong);
                return;
            }

            element.appendChild(document.createTextNode(part));
        });
    }

    function createEssayBlock(paragraph) {
        const headingMatch = paragraph.match(/^(#{2,3})\s+(.+)$/);
        if (headingMatch) {
            const heading = document.createElement(headingMatch[1].length === 2 ? 'h3' : 'h4');
            appendInlineFormatting(heading, headingMatch[2]);
            return heading;
        }

        const p = document.createElement('p');
        appendInlineFormatting(p, paragraph);
        return p;
    }

    function renderEssay(essay) {
        kicker.textContent = essay.source || 'Essay';
        title.textContent = essay.title;
        meta.textContent = essay.date || essay.filename || 'Imported from a plain text file';
        body.innerHTML = '';

        essay.paragraphs.forEach((paragraph) => {
            body.appendChild(createEssayBlock(paragraph));
        });
    }

    function addEssayToList(essay) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'essay-list-item';

        const label = document.createElement('span');
        label.textContent = essay.title;

        const detail = document.createElement('small');
        detail.textContent = essay.date || essay.filename || 'Draft';

        button.appendChild(label);
        button.appendChild(detail);
        button.addEventListener('click', function() {
            renderEssay(essay);
        });

        essayList.prepend(button);
        emptyState.classList.add('d-none');
    }

    loadPublishedEssays();

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', function() {
            const parsed = splitEssayText(String(reader.result || ''), file.name.replace(/\.txt$/i, ''));
            const essay = {
                title: parsed.title,
                paragraphs: parsed.paragraphs,
                filename: file.name,
                source: 'Imported Draft'
            };

            addEssayToList(essay);
            renderEssay(essay);
            fileInput.value = '';
        });
        reader.readAsText(file);
    });
});
