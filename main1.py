import sounddevice as sd
import numpy as np
import whisper
import torch
import warnings
import pandas as pd
import matplotlib.pyplot as plt
from pandasai import Agent
import os

# Suppress warnings
warnings.filterwarnings("ignore")

# Load the Whisper model
whisper_model = whisper.load_model("base")

# Parameters for recording
samplerate = 16000  # Whisper works best with 16kHz audio
duration = 7  # Record for 7 seconds

# Set up the API key for PandasAI agent
os.environ["PANDASAI_API_KEY"] = "$2a$10$/rsFnPd5i5d0XhS.Nvs1fOKlfA1gYADp76sf23sgrbozEqVJKfm5m"  # Use the default placeholder key from PandasAI

# Function to record audio
def record_audio(duration, samplerate):
    print(f"Recording for {duration} seconds...")
    audio = sd.rec(int(samplerate * duration), samplerate=samplerate, channels=1, dtype=np.float32)
    sd.wait()  # Wait until the recording is finished
    return np.squeeze(audio)

# Function to transcribe audio to text using Whisper
def transcribe_audio(audio):
    result = whisper_model.transcribe(audio)
    return result['text']

# Function to interact with PandasAI using Agent based on transcribed input
def query_pandasai(transcription):
    # Load your CSV file into a Pandas DataFrame
    df = pd.read_csv("loan.csv")  # Replace with the correct path to your CSV file

    # Set up the PandasAI agent
    agent = Agent(df)
    
    # Pass the transcription as a query to the PandasAI agent
    response = agent.chat(transcription)

    # Print the PandasAI agent's response
    print(f"Response from PandasAI: {response}")
    
    # Handle visualizations
    try:
        # If a figure was created, save it as viz.jpg
        if plt.get_fignums():  # Check if any figures are created
            plt.savefig("viz.jpg", format='jpg')  # Save the figure as viz.jpg
            plt.close('all')  # Close all figures after saving
            print("Visualization saved as viz.jpg")
    except Exception as e:
        print(f"An error occurred while saving the visualization: {e}")

# Main function
def main():
    try:
        # Step 1: Record audio
        audio = record_audio(duration, samplerate)

        # Step 2: Transcribe the audio using Whisper
        transcription = transcribe_audio(audio)
        print(f"Transcription: {transcription}")

        # Step 3: Pass the transcription to PandasAI agent for analysis
        query_pandasai(transcription)
    
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()


# # Working with a bug of visualization
# import sounddevice as sd
# import numpy as np
# import whisper
# import torch
# import warnings
# from pandasai import SmartDataframe
# from pandasai.llm import OpenAI
# import pandas as pd

# # Suppress warnings
# warnings.filterwarnings("ignore")

# # Load the Whisper model
# whisper_model = whisper.load_model("base")

# # Parameters for recording
# samplerate = 16000  # Whisper works best with 16kHz audio
# duration = 7  # Record for 7 seconds

# # Function to record audio
# def record_audio(duration, samplerate):
#     print(f"Recording for {duration} seconds...")
#     audio = sd.rec(int(samplerate * duration), samplerate=samplerate, channels=1, dtype=np.float32)
#     sd.wait()  # Wait until the recording is finished
#     return np.squeeze(audio)

# # Function to transcribe audio to text using Whisper
# def transcribe_audio(audio):
#     result = whisper_model.transcribe(audio)
#     return result['text']

# # Function to interact with PandasAI based on transcribed input
# def query_pandasai(transcription):
#     # Load your CSV file into a Pandas DataFrame
#     df = pd.read_csv("loan.csv")  # Replace with the correct path to your CSV file
    
#     # Set up the LLM and SmartDataFrame for PandasAI
#     llm = OpenAI(api_token="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")  # Use your own OpenAI API key here
#     sdf = SmartDataframe(df, config={"llm": llm})
    
#     # Pass the transcription as a query to PandasAI
#     response = sdf.chat(transcription)
    
#     # Print the PandasAI response
#     print(f"Response from PandasAI: {response}")

# # Main function
# def main():
#     # Step 1: Record audio
#     audio = record_audio(duration, samplerate)

#     # Step 2: Transcribe the audio using Whisper
#     transcription = transcribe_audio(audio)
#     print(f"Transcription: {transcription}")

#     # Step 3: Pass the transcription to PandasAI for analysis
#     query_pandasai(transcription)

# if __name__ == "__main__":
#     main()
