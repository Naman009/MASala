# langsmith_logs.py

import json
from pathlib import Path
from langsmith import Client

# Set up LangSmith client
client = Client(
    api_url="https://api.smith.langchain.com",
    api_key="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"
)

# Fetch and format logs
def get_recent_runs(project_name="pr-sandy-paperwork-72", limit=5):
    runs = client.list_runs(
        project_name=project_name,
        execution_order=1,
        limit=limit
    )

    formatted = []
    for run in runs:
        formatted.append({
            "name": run.name,
            "start_time": run.start_time.isoformat(),
            "end_time": run.end_time.isoformat() if run.end_time else None,
            "latency": (run.end_time - run.start_time).total_seconds() if run.end_time and run.start_time else None,
            "input": run.inputs,
            "output": run.outputs,
            "run_type": run.run_type,
            "status": run.status
        })

    return formatted

# Optional: for quick testing
if __name__ == "__main__":
    logs = get_recent_runs(limit=10)
