



def preprocess_text(text: str) -> str:

    replacements = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u2265": ">=",
        "\u2264": "<=",
        "\u00b1": "+/-",
        "\u00d7": "x",
        "\u00f7": "/",
        "\u221e": "infinity",
        "\u2211": "sum",
        "\u221a": "sqrt",
        "\u2713": "✓",
        "\u2717": "✗",
        "\u2714": "✓",
        "\u2718": "✗",
        "\u00a9": "(c)",
        "\u00ae": "(r)",
        "\u2122": "(tm)",
        "\u2192": "->",
        "\u2190": "<-",
        "\u2194": "<->",
        "\u2022": "•",
        "\u25cf": "•",
        "\u25cb": "o"
    }

    for original, replacement in replacements.items():
        text = text.replace(original, replacement)
    return text