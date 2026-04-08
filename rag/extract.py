# importing necessary libraries
from pypdf import PdfReader
reader = PdfReader("/Users/siyajariwala/Desktop/ai-identity/ai-identity/rag/i-765instr.pdf")

# extracting text from each page of the PDF
full_text = ""
for page in reader.pages:
    full_text += page.extract_text()
 
print(full_text[:2000])  # print first 2000 characters just to check
print(f"\n\nTotal pages: {len(reader.pages)}")
print(f"Total characters: {len(full_text)}")
