import chromadb

from chunk import chunk_text, extract_text
from paths import CHROMA_DIR, I765_PDF, I485_PDF, I821_PDF

# Create a ChromaDB client that saves data locally
client = chromadb.PersistentClient(path=str(CHROMA_DIR))

# Fresh ingest each run (avoids duplicate-ID errors if you re-run this script)
try:
    client.delete_collection("immigration_docs")
except Exception:
    pass
collection = client.get_or_create_collection(name="immigration_docs")

pdfs = [I765_PDF, I485_PDF, I821_PDF]
for pdf in pdfs:
    print(f"Starting to process {pdf.name}...")
    text = extract_text(str(pdf))
    print(f"Extracted {len(text)} characters")
    chunks = chunk_text(text)
    for i, chunk in enumerate(chunks):
        collection.add(
            documents=[chunk],
            ids=[f"{pdf.stem}-{i}"],
        )
    print(f"Stored {len(chunks)} chunks from {pdf.name} in ChromaDB.")
    print("\nAll 3 forms stored!")
    print("Testing a search...")

# Test it — search for something
results = collection.query(
    query_texts=["what documents do I need for I-485 adjustment of status?"],
    n_results=2,
)

print(f"\nTop result:\n{results['documents'][0][0]}")
