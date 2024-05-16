import { useEffect, useRef } from "react";

/**
 * Custom hook to handle form submission using the Enter key.
 * @param {() => void} callback - The callback function to be executed when the Enter key is pressed.
 * @param {string} formKey - The unique key identifying the form.
 */
export const useEnterKeySubmit = (callback: () => void, formKey: string) => {
  // Ref to keep track of the last focused element
  const lastFocusedElement = useRef<EventTarget | null>(null);

  useEffect(() => {
    // Get the form element by its unique key
    const form = document.getElementById(formKey);
    if (!form) return;

    /**
     * Event handler for focusin event.
     * Tracks the element that currently has focus within the form.
     * @param {FocusEvent} event - The focusin event.
     */
    const handleFocusIn = (event: FocusEvent) => {
      if (form.contains(event.target as Node)) {
        lastFocusedElement.current = event.target;
      } else {
        lastFocusedElement.current = null;
      }
    };

    /**
     * Event handler for keydown event.
     * Submits the form when the Enter key is pressed, unless the focus is on a textarea.
     * @param {KeyboardEvent} event - The keydown event.
     */
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore Enter key presses in textareas
      if ((event.target as HTMLElement).tagName === "TEXTAREA") {
        return;
      }
      // Check if the Enter key is pressed
      if (event.keyCode === 13 || event.key === "Enter") {
        if (
          lastFocusedElement.current &&
          form.contains(lastFocusedElement.current as Node)
        ) {
          event.preventDefault();
          callback();
        }
      }
    };

    // Attach event listeners
    document.addEventListener("focusin", handleFocusIn);
    window.addEventListener("keydown", handleKeyPress);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback, formKey]);

  return null;
};
