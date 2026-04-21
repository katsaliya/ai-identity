from pathlib import Path

import chromadb

_RAG_DIR = Path(__file__).resolve().parent
_CHROMA_PATH = _RAG_DIR / "chroma_db"

# Open the same cabinet we filled in store.py (path works no matter where the app is started)
client = chromadb.PersistentClient(path=str(_CHROMA_PATH))
collection = client.get_or_create_collection(name="immigration_docs")

def retrieve_context(user_question, n_results=3):
    # Search the cabinet for the most relevant chunks
    results = collection.query(
        query_texts=[user_question],
        n_results=n_results
    )
    
    # Grab the chunks and join them into one block of text
    chunks = results["documents"][0]
    context = "\n\n".join(chunks)
    return context

# Test it
if __name__ == "__main__":
    question = "how do I apply for a green card?"
    context = retrieve_context(question)
    print("Retrieved context:")
    print(context)