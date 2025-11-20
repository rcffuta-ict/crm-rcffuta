export function unslugify(text: string | null | undefined): string {
    if (!text) return "";

    return text
        .toString() // Ensure it's a string
        .toLowerCase() // Convert to lowercase first to normalize
        .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of every word
}
