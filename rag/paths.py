"""Shared paths for RAG scripts (works on any machine)."""

from pathlib import Path

RAG_DIR = Path(__file__).resolve().parent
I765_PDF = RAG_DIR / "i-765instr.pdf"
I485_PDF = RAG_DIR / "i-485instr.pdf"
I821_PDF = RAG_DIR / "i-821instr.pdf"
CHROMA_DIR = RAG_DIR / "chroma_db"
