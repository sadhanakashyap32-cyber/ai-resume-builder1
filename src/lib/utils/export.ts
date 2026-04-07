/**
 * PDF Export Utility
 *
 * Uses the browser's native print dialog to generate a PDF.
 * This approach is:
 *   - More reliable than html2canvas (no color-space issues with Tailwind v4 oklch)
 *   - Produces real vector text (fully ATS-readable)
 *   - Zero dependency on canvas or external libraries at runtime
 */
export async function exportToPDF(elementId: string, filename: string = "resume.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Force light mode during print so resume is always standard
  const isDarkMode = document.documentElement.classList.contains("dark");
  if (isDarkMode) {
    document.documentElement.classList.remove("dark");
  }

  // Clone element into a dedicated print container
  const clone = element.cloneNode(true) as HTMLElement;
  const printContainer = document.createElement("div");
  printContainer.id = "pdf-print-container";
  printContainer.appendChild(clone);

  // Inject print-only CSS that hides the rest of the application
  const style = document.createElement("style");
  style.id = "pdf-print-styles";
  style.innerHTML = `
    @media print {
      body > * { display: none !important; }
      body > #pdf-print-container { 
        display: block !important; 
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 210mm !important;
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      @page { 
        size: A4 portrait; 
        margin: 0; 
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(printContainer);

  // Briefly hijack the document title to set the default PDF save name
  const originalTitle = document.title;
  document.title = filename.replace(".pdf", "");

  // Small delay ensures the DOM is painted and cloned images are tracked
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    window.print();
  } finally {
    // Cleanup DOM and restore original state
    if (isDarkMode) document.documentElement.classList.add("dark");
    document.title = originalTitle;
    document.head.removeChild(style);
    document.body.removeChild(printContainer);
  }
}
