import chromadb
from chunk import extract_text, chunk_text

# Create a ChromaDB client that saves data locally
client = chromadb.PersistentClient(path="./chroma_db")

# Create a collection — think of this like a folder 
# inside the filing cabinet specifically for I-765 data
collection = client.get_or_create_collection(name="immigration_docs")

# Extract and chunk the PDF
text = extract_text("/Users/siyajariwala/Desktop/ai-identity/ai-identity/rag/i-765instr.pdf")
chunks = chunk_text(text)

# Store each chunk in ChromaDB
# Each chunk needs a unique ID
for i, chunk in enumerate(chunks):
    collection.add(
        documents=[chunk],
        ids=[f"i765-chunk-{i}"]
    )

print(f"Stored {len(chunks)} chunks in ChromaDB!")
print("Testing a search...")

# Test it — search for something
results = collection.query(
    query_texts=["how to apply for work authorization"],
    n_results=2
)

print(f"\nTop result:\n{results['documents'][0][0]}")