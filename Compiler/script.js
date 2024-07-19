document.addEventListener("DOMContentLoaded", function() {
    // Initialize CodeMirror for HTML
    const htmlCodeEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
        mode: "htmlmixed",
        theme: "dracula", // Optional theme
        lineNumbers: true,
        autoCloseTags: true,
        extraKeys: { "Ctrl-Space": "autocomplete" }, // Enable autocomplete on Ctrl-Space
        lineWrapping: false, // Ensure line wrapping is turned off if not needed
        styleActiveLine: true // Highlight the active line
    });

    // Initialize CodeMirror for CSS
    const cssCodeEditor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {
        mode: "css",
        theme: "dracula", // Optional theme
        lineNumbers: true,
        autoCloseBrackets: true,
        extraKeys: { "Ctrl-Space": "autocomplete" } // Enable autocomplete on Ctrl-Space
    });

    // Initialize CodeMirror for JavaScript
    const jsCodeEditor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {
        mode: "javascript",
        theme: "dracula", // Optional theme
        lineNumbers: true,
        autoCloseBrackets: true,
        extraKeys: { "Ctrl-Space": "autocomplete" } // Enable autocomplete on Ctrl-Space
    });

    const htmlCode = document.getElementById("htmlCode");
    const cssCode = document.getElementById("cssCode");
    const jsCode = document.getElementById("jsCode");
    const preview = document.getElementById("preview");
    const openPreviewButton = document.getElementById("openPreview");

    function updatePreview() {
        const html = htmlCodeEditor.getValue();
        const css = `<style>${cssCodeEditor.getValue()}</style>`;
        const js = `<script>${jsCodeEditor.getValue()}<\/script>`;
        const previewContent = html + css + js;

        preview.contentDocument.open();
        preview.contentDocument.write(previewContent);
        preview.contentDocument.close();
    }

    function openPreviewInNewTab() {
        const html = htmlCodeEditor.getValue();
        const css = `<style>${cssCodeEditor.getValue()}</style>`;
        const js = `<script>${jsCodeEditor.getValue()}<\/script>`;
        const previewContent = html + css + js;
        const newTab = window.open();
        newTab.document.open();
        newTab.document.write(previewContent);
        newTab.document.close();
    }

    // Attach event listeners to update the preview on changes
    htmlCodeEditor.on("change", updatePreview);
    cssCodeEditor.on("change", updatePreview);
    jsCodeEditor.on("change", updatePreview);

    // Attach event listener to open preview in a new tab
    openPreviewButton.addEventListener("click", openPreviewInNewTab);

    // Initial call to display content if any pre-existing code
    updatePreview();
});
