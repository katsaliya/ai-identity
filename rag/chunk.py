from pypdf import PdfReader
def extract_text(pdf_path):
    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text()
    return full_text

def chunk_text(text, chunk_size= 500, overlap =50):
    chunks = [ ]        #creating an empty list to store the chunks
    start = 0
    while start < len(text):        #keep to chunk until the end of the text is reached
        end= start + chunk_size     #grab 500 characters starting from the current position
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap
    return chunks

text = extract_text("/Users/siyajariwala/Desktop/ai-identity/ai-identity/rag/i-765instr.pdf")
chunks = chunk_text(text)       #split the text into overlapping chunks 

print(f"Total chunks created: {len(chunks)}")
print(f"\nExample chunk 1:\n{chunks[0]}")
print(f"\nExample chunk 2:\n{chunks[1]}")
