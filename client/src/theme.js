// colorway/tones for the app
export const colorTokens = {
    grey: {
        0:  "#000000",
        10: "#1b1b1f",
        20: "#303034",
        25: "#3b3b3f",
        30: "#47464a",
        35: "#525256",
        40: "#5e5e62",
        50: "#77767a",
        60: "#919094",
        70: "#acaaaf",
        80: "#c8c6ca",
        90: "#e4e1e6",
        95: "#f2f0f4",
        98: "#fbf8fd",
        99: "#fefbff",
        100:"#ffffff",
    },
    grey_variant: {
        0:  "#000000",
        10: "#1a1b23",        
        20: "#2f3038",
        25: "#3a3b43",
        30: "#45464f",
        35: "#51525b",
        40: "#5d5e67",
        50: "#767680",
        60: "#90909a",
        70: "#aaaab4",
        80: "#c6c5d0",
        90: "#e2e1ec",
        95: "#f1f0fa",
        98: "#faf8ff",
        99: "#fefbff",
        100:"#ffffff",
    },
    primary: {
        0:  "#000000",
        10: "#E05E00",
        20: "#F56600",
        25: "#FF700A",
        30: "#FF7C1F",
        35: "#FF8833",
        40: "#FF9447",
        50: "#FFA05C",
        60: "#FFAC70",
        70: "#FFB885",
        80: "#FFC499",
        90: "#FFCFAD",
        95: "#FFDBC2",
        98: "#FFE7D6",
        99: "#FFF3EB",
        100:"#ffffff",
    }
};
  
// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
        mode: mode,
        ...(mode === "dark"
            ? {
                primary: {
                    main:       colorTokens.primary[80],
                    container:  colorTokens.primary[30],
                },
                on_primary: {
                    main:       colorTokens.primary[20],
                    container:  colorTokens.primary[90],
                },
                background: {
                    main:       colorTokens.grey[10],
                },
                on_background: {
                    main:       colorTokens.grey[90],
                },
                surface: {
                    main:       colorTokens.grey[10],
                    variant:    colorTokens.grey_variant[30],
                },
                on_surface: {
                    main:       colorTokens.grey[90],
                    variant:    colorTokens.grey_variant[80],
                },
                outline: {
                    main:       colorTokens.grey[60],
                },
            } : {
                primary: {
                    main:       colorTokens.primary[40],
                    container:  colorTokens.primary[90],
                },
                on_primary: {
                    main:       colorTokens.primary[100],
                    container:  colorTokens.primary[10],
                },
                background: {
                    main:       colorTokens.grey[99],
                },
                on_background: {
                    main:       colorTokens.grey[10],
                },
                surface: {
                    main:       colorTokens.grey[99],
                    variant:    colorTokens.grey_variant[90],
                },
                on_surface: {
                    main:       colorTokens.grey[10],
                    variant:    colorTokens.grey_variant[30],
                },
                outline: {
                    main:       colorTokens.grey_variant[50],
                },
            }),
        },
        typography: {
            fontFamily: ["Roboto Mono", "sans-serif"].join(","),
            h1: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontSize: 14,
            },
            body: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontWeight: 400,
                fontSize: 18,
            },
            tableHeader: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontWeight: 400,
                fontSize: 12,
            },
            tableBody: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontWeight: 400,
                fontSize: 11,
            },
            secondary: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontWeight: 400,
                fontSize: 16,
            },
            button: {
                fontFamily: ["Roboto Mono", "sans-serif"].join(","),
                fontWeight: 700,
                fontSize: 16,
            },
        },
    };
};