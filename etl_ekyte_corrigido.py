import requests
import pandas as pd
from sqlalchemy import create_engine

API_KEY = "ced8f27bc1bc5abffb9fee3d4a98f26cb8e7b8a2655bfed2ac8cacb347a9038d"
HEADERS = {"Content-Type": "application/json"}
BASE_URLS = {
    "tasks": "https://api.ekyte.com/v1.1/tasks",
    "projects": "https://api.ekyte.com/v1.1/projects",
    "tickets": "https://api.ekyte.com/v1.1/tickets",
    "members": "https://api.ekyte.com/v1.0/members",
    "workspaces": "https://api.ekyte.com/v1.0/workspaces",
    "time_trackings": "https://api.ekyte.com/v1.0/time-trackings",
    "insights": "https://api.ekyte.com/v1.0/insights"
}

DB_URI = "postgresql://postgres:TxFEUjXbqEfbaawTVmdE@postgres:5432/metabase"
engine = create_engine(DB_URI)

def fetch_and_store(endpoint_name):
    url = BASE_URLS[endpoint_name]
    page = 1
    all_data = []

    while True:
        full_url = f"{url}?apiKey={API_KEY}&page={page}"
        print(f"🔄 Buscando dados de: {full_url}")
        response = requests.get(full_url, headers=HEADERS)

        if response.status_code != 200:
            print(f"⚠️ Erro ({response.status_code}) ao buscar /{endpoint_name}:")
            break

        data = response.json().get("data")
        if not data:
            print(f"⚠️ Nenhum dado retornado de {endpoint_name}")
            break

        all_data.extend(data)
        paging = response.json().get("paging", {})
        if "totalPages" in paging and page >= paging["totalPages"]:
            break
        page += 1

    if all_data:
        df = pd.DataFrame(all_data)
        print(f"💾 Salvando {len(df)} registros na tabela '{endpoint_name}'...")
        df.to_sql(endpoint_name, engine, if_exists='replace', index=False)
        print(f"✅ Dados de {endpoint_name} salvos com sucesso.")
    else:
        print(f"⚠️ Nenhum dado para salvar em {endpoint_name}.")

if __name__ == "__main__":
    for name in BASE_URLS.keys():
        fetch_and_store(name)
