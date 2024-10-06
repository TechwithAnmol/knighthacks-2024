import streamlit as st
import sounddevice as sd
import numpy as np
import whisper
import warnings
from pandasai import SmartDataframe
from pandasai.llm import OpenAI
import pandas as pd
import time

# Suppress warnings
warnings.filterwarnings("ignore")

# Load the Whisper model
whisper_model = whisper.load_model("base")

# Load your CSV file into a Pandas DataFrame
df = pd.read_csv("loan.csv")  # Replace with the correct path to your CSV file

# Set up the LLM and SmartDataFrame for PandasAI
llm = OpenAI(api_token="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")  # Use your own OpenAI API key here
sdf = SmartDataframe(df, config={"llm": llm})

# Parameters for recording
samplerate = 16000  # Whisper works best with 16kHz audio
duration = 7  # Record for 7 seconds

# Streamlit app layout
st.title("Audio-PandasAI Web App")

st.header("Loan Dataset Overview")
st.dataframe(df.head())

if st.button("Record Audio and Analyze"):
    with st.spinner(f"Recording for {duration} seconds..."):
        # Step 1: Record audio
        audio = sd.rec(int(samplerate * duration), samplerate=samplerate, channels=1, dtype=np.float32)
        sd.wait()  # Wait until the recording is finished
        audio = np.squeeze(audio)

    with st.spinner("Transcribing audio..."):
        # Step 2: Transcribe the audio using Whisper
        transcription = whisper_model.transcribe(audio)['text']
        st.success("Transcription completed!")
        st.subheader("Transcription:")
        st.write(transcription)

    with st.spinner("Querying PandasAI..."):
        # Step 3: Pass the transcription to PandasAI for analysis
        response = sdf.chat(transcription)
        st.success("PandasAI response received!")
        st.subheader("PandasAI Response:")
        st.write(response)