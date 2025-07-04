from fpdf import FPDF
import os
from typing import Dict, Any
from datetime import datetime
from app.core.utils.text_preprocessing import preprocess_text

class EnhancedPDFGenerator(FPDF):
    def __init__(self):
        super().__init__()
        self.set_margins(20, 20, 20)
        self.set_auto_page_break(auto=True, margin=25)
        
    def header(self):
        if self.page_no() == 1:
            # border
            self.set_fill_color(41, 128, 185) 
            self.rect(10, 10, 190, 3, 'F')
            
            # title section
            self.set_fill_color(248, 249, 250)
            self.rect(15, 20, 180, 25, 'F')
            
            # main title
            self.set_font('Arial', 'B', 20)
            self.set_text_color(44, 62, 80) 
            self.set_y(25)
            self.cell(0, 12, 'Learning Material', 0, 1, 'C')
            
            # subtitle
            self.set_font('Arial', '', 10)
            self.set_text_color(108, 117, 125)  # Gray
            current_date = datetime.now().strftime("%B %d, %Y")

            
            # text color
            self.set_text_color(0, 0, 0)
            self.ln(15)
        else:
            # header
            self.set_fill_color(41, 128, 185)
            self.rect(10, 10, 190, 2, 'F')
            self.ln(10)


    def footer(self):
        self.set_y(-20)
        
        # footer line
        self.set_fill_color(233, 236, 239)
        self.rect(15, -18, 180, 0.5, 'F')
        
        # page number
        self.set_font('Arial', 'I', 9)
        self.set_text_color(108, 117, 125)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
        # reset text color
        self.set_text_color(0, 0, 0)
    
    def add_section_header(self, title: str, color_rgb: tuple = (52, 73, 94)):
        """Add a styled section header"""
        self.ln(8)
        
        # background header
        self.set_fill_color(*color_rgb)
        self.rect(self.get_x(), self.get_y(), 170, 12, 'F')
        
        # header text
        self.set_font('Arial', 'B', 14)
        self.set_text_color(255, 255, 255)  # White text
        self.cell(0, 12, title, 0, 1, 'L')
        
        # reset text color
        self.set_text_color(0, 0, 0)
        self.ln(5)
    
    def add_content_block(self, text: str, font_size: int = 11):
        """Add formatted content block with proper spacing"""
        self.set_font('Arial', '', font_size)
        self.set_text_color(33, 37, 41)  
        # subtitle background
        y_start = self.get_y()
        text_height = self.get_string_width(text) / 170 * font_size + 20
        
        self.set_fill_color(253, 253, 253)
        self.rect(self.get_x(), y_start, 170, text_height, 'F')
        
        # content padding
        self.set_x(self.get_x() + 5)
        self.multi_cell(160, 7, text)
        self.ln(8)
    
    def add_answer_item(self, number: int, text: str):
        """Add a styled answer item"""
        x_pos = self.get_x()
        y_pos = self.get_y()
        
        # Circle background
        self.set_fill_color(52, 152, 219) 
        self.ellipse(x_pos, y_pos + 1, 8, 8, 'F')
        
        # Number in circle
        self.set_font('Arial', 'B', 10)
        self.set_text_color(255, 255, 255)
        self.set_xy(x_pos + 2.5, y_pos + 2)
        self.cell(3, 4, str(number), 0, 0, 'C')
        
        # Answer text
        self.set_font('Arial', '', 11)
        self.set_text_color(33, 37, 41)
        self.set_xy(x_pos + 12, y_pos)
        
        # Calculate available width
        available_width = 170 - 12
        self.multi_cell(available_width, 6, text)
        self.ln(4)
    
    def add_decorative_separator(self):
        """Add a decorative separator line"""
        self.ln(5)
        # Gradient-like effect with multiple rectangles
        colors = [(233, 236, 239), (206, 212, 218), (173, 181, 189)]
        for i, color in enumerate(colors):
            self.set_fill_color(*color)
            self.rect(20 + i * 50, self.get_y(), 50, 1, 'F')
        self.ln(8)


def generate_enhanced_pdf(content: Dict[str, Any], filename: str) -> str:
    """Generate an enhanced PDF with professional styling"""
    pdf = EnhancedPDFGenerator()
    pdf.add_page()
    
    # Main content section
    main_content = content.get("main_content", "")
    if main_content:
        pdf.add_section_header("Content Overview", (52, 73, 94))
        sanitized_content = preprocess_text(main_content)
        pdf.add_content_block(sanitized_content)
        
        pdf.add_decorative_separator()
    
    # Answers section
    answers = content.get("answers", [])
    if answers:
        pdf.add_section_header("Detailed Answers", (39, 174, 96))  
        
        for idx, answer in enumerate(answers, start=1):
            sanitized_answer = preprocess_text(answer)
            pdf.add_answer_item(idx, sanitized_answer)
    
    # Additional sections if present
    if content.get("summary"):
        pdf.add_decorative_separator()
        pdf.add_section_header("Summary", (230, 126, 34))  
    
    if content.get("references"):
        pdf.add_decorative_separator()
        pdf.add_section_header("References", (155, 89, 182))
        for ref in content["references"]:
            pdf.add_content_block(f"• {preprocess_text(ref)}", 10)
    
    # Create output directory
    output_dir = os.path.abspath("generated_pdfs")
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate filename with timestamp if not provided
    if not filename.endswith('.pdf'):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{filename}_{timestamp}.pdf"
    
    pdf_output_path = os.path.join(output_dir, filename)
    
    try:
        pdf.output(pdf_output_path)
        print(f"Enhanced PDF successfully saved to: {pdf_output_path}")
        
        # Verify file creation
        if os.path.exists(pdf_output_path):
            file_size = os.path.getsize(pdf_output_path)
            print(f"File size: {file_size:,} bytes")
        else:
            print("Error: PDF file was not created.")
            
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")
        return None
    
    return pdf_output_path


def generate_pdf(content: Dict[str, Any], filename: str) -> str:
    """Wrapper function for backward compatibility"""
    return generate_enhanced_pdf(content, filename)
