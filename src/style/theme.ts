export interface ThemeStyle {
  container: {
    center: boolean;
    padding: string;
    screens: {
      "2xl": string;
      [key: string]: string;
    };
    [key: string]: boolean | string | { [key: string]: string };
  };
  extend: {
    colors: {
      border: string;
      input: string;
      ring: string;
      background: string;
      foreground: string;
      primary: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      secondary: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      destructive: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      muted: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      accent: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      popover: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      card: {
        DEFAULT: string;
        foreground: string;
        [key: string]: string;
      };
      [key: string]: string | { [key: string]: string };
    };
    borderRadius: {
      lg: string;
      md: string;
      sm: string;
      [key: string]: string;
    };
    keyframes: {
      "accordion-down": {
        from: { height: string };
        to: { height: string };
      };
      "accordion-up": {
        from: { height: string };
        to: { height: string };
      };
      [key: string]: {
        from: { [key: string]: string };
        to: { [key: string]: string };
      };
    };
    animation: {
      "accordion-down": string;
      "accordion-up": string;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

const theme: ThemeStyle = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};

export default theme;
