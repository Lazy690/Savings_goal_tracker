import json

# This is your default/reset state
reset_data = {
    "Add": [],
    "Take": [],
    "Dept": [],
    "UpdateTotalsave": [
        {
            "totalsaved": "0",
            "timestamp": "0"
        }
    ]
}

# Overwrite the JSON file
with open("db.json", "w") as f:
    json.dump(reset_data, f, indent=4)

print("JSON file has been reset.")
