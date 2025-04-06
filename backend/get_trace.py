from langsmith import Client
import os
from dotenv import load_dotenv

load_dotenv()
os.environ['LANGSMITH_API_KEY'] = os.getenv('LANGSMITH_API_KEY')

def get_latest_trace_url():
    try:
        client = Client()
        runs = client.list_runs(
            project_name="pr-sandy-paperwork-72",
            execution_order=1,
            limit=1
        )
        print(runs)
        latest_run = next(runs, None)
        print(latest_run)
        if latest_run:
            public_url = f"https://smith.langchain.com/public/{latest_run.id}"
            print(public_url)
            return public_url
        else:
            return "No recent trace found."
    except Exception as e:
        return f"Error fetching trace: {str(e)}"