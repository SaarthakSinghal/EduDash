import pandas as pd
import PyPDF2

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text

# Function to parse extracted text into structured data
def parse_text_to_data(text):
    lines = text.split("\n")
    data = []
    for line in lines:
        parts = line.split()
        if len(parts) >= 7:  # Ensure valid row format
            data.append(parts)
    return data

# Function to save data to CSV
def save_to_csv(data, output_csv):
    columns = ["Academic Year", "Enrollment No.", "Student Name", "Semester", "Section", "Roll No.", "Course Code", "Course Name"]
    df = pd.DataFrame(data, columns=columns)
    df.to_csv(output_csv, index=False)

# File paths
pdf_path = "C:\\Users\\Saarthak\\Documents\\AttachmentIII_Semester_-_Student_Circula[1].pdf"
csv_path = "output.csv"

# Extract and process data
text = extract_text_from_pdf(pdf_path)
data = parse_text_to_data(text)
save_to_csv(data, csv_path)

print(f"CSV file saved as {csv_path}")
