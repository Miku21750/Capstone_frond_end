from fastapi import FastAPI, UploadFile, File
import uvicorn
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from PIL import Image
import json
from fastapi.middleware.cors import CORSMiddleware

model = tf.keras.models.load_model("model/skin_disease_model.h5")

with open("penyakit_info.json", "r") as f:
    penyakit_info = json.load(f)

class_names = [
    "Acne", "Cellulitis", "Impetigo", "Eczema", "Athlete’s Foot", 
    "Nail Fungus", "Ringworm", "Cutaneous Larva Migrans", 
    "Chickenpox", "Shingles"
]

app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = Image.open(file.file).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    pred = model.predict(img_array)[0]
    class_idx = np.argmax(pred)
    confidence = float(pred[class_idx])
    predicted_label = class_names[class_idx]

    info = next((item for item in penyakit_info if item["penyakit_en"] == predicted_label), None)
    
    response = {
        "prediction": predicted_label,
        "confidence": confidence,
        "penjelasan": info["penjelasan"] if info else "-",
        "obat": info["obat"] if info else "-",
        "cara_pakai": info["cara_pakai"] if info else "-"
    }
    return response

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)