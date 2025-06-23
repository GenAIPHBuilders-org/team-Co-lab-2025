import sys
import os

from app.core.rag_memory import RAGMemory

if __name__ == "__main__":
    rag = RAGMemory()
    # Retrieve all entries (up to 5 by default)
    entries = rag.retrieve()
    print("Retrieved entries from RAG:")
    for entry in entries:
        print(entry)