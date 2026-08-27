from pathlib import Path
import shutil
from PIL import Image, ImageOps
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject, NameObject

root = Path(__file__).resolve().parents[2]
pdf = root / 'output/pdf/curriculo-ismael-correa.pdf'
download = pdf.with_suffix('.download')
source = Path('C:/Users/ismael.correa/Downloads/perfil.jpg')
backup = root / 'output/pdf/curriculo-ismael-correa-before-photo-20260827.pdf'
reader = PdfReader(backup if backup.exists() else pdf)
original_text = [p.extract_text() for p in reader.pages]
writer = PdfWriter(clone_from=reader)
old = writer.pages[0].images[0]
photo = ImageOps.fit(ImageOps.exif_transpose(Image.open(source)).convert('RGB'), old.image.size, method=Image.Resampling.LANCZOS)
original_object = old.indirect_reference.get_object()
replacement = DecodedStreamObject()
for key, value in original_object.items():
    if key not in ('/Filter', '/DecodeParms', '/Length'):
        replacement[key] = value
replacement.set_data(photo.tobytes())
replacement = replacement.flate_encode()
replacement.indirect_reference = old.indirect_reference
writer._objects[old.indirect_reference.idnum - 1] = replacement
candidate = root / 'tmp/pdfs/curriculo-new-photo.pdf'
writer.write(candidate)
check = PdfReader(candidate)
assert [p.extract_text() for p in check.pages] == original_text
assert len(check.pages) == len(reader.pages)
if not backup.exists():
    shutil.copy2(pdf, backup)
shutil.copy2(candidate, pdf)
shutil.copy2(pdf, download)
assert pdf.read_bytes() == download.read_bytes()
print('Updated PDF and .download; text preserved; backup:', backup)
