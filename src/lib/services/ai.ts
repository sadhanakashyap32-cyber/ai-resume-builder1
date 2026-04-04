export async function refineContent(section: string, userInput: string) {
  try {
    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ section, userInput }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to refine content");
    }

    const data = await response.json();
    return data.content;
  } catch (error: any) {
    console.error("AI Service Error:", error.message);
    throw error;
  }
}
