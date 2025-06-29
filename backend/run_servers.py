import subprocess
import sys
import os
import time

def start_servers():
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Start ML model server (Flask)
    print("Starting ML Model server on port 5000...")
    ml_process = subprocess.Popen(['python', 'ml_api.py'], 
                                cwd=current_dir,
                                creationflags=subprocess.CREATE_NEW_CONSOLE)
    
    # Wait a bit for ML server to start
    time.sleep(2)
    
    # Start Gemini server
    print("Starting Gemini server on port 8001...")
    gemini_process = subprocess.Popen(['python', 'gemini_api.py'], 
                                    cwd=current_dir,
                                    creationflags=subprocess.CREATE_NEW_CONSOLE)
    
    print("\nBoth servers are running!")
    print("ML Model: http://localhost:5000")
    print("Gemini: http://localhost:8001")
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        ml_process.terminate()
        gemini_process.terminate()

if __name__ == "__main__":
    start_servers() 