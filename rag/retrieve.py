import chromadb

# Open the same cabinet we filled in store.py
client = chromadb.PersistentClient(path="./chroma_db")
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
    question = "how do I apply for work authorization?"
    context = retrieve_context(question)
    print("Retrieved context:")
    print(context)