import os
from apify_client import ApifyClient
from dotenv import load_dotenv

load_dotenv()

APIFY_TOKEN = os.getenv("APIFY_API_TOKEN")
if not APIFY_TOKEN:
    raise ValueError("APIFY_API_TOKEN is not set in environment variables.")

client = ApifyClient(APIFY_TOKEN)

def scrape_webpage(url: str):
    """
    Scrapes the text content of a webpage using the Web Scraper Actor.
    """
    run_input = {
        "startUrls": [{"url": url}],
        "useChrome": False,
        "pageFunction": "async () => { return { title: document.title, text: document.body.innerText }; }"
    }
    
    run = client.actor("apify/web-scraper").call(run_input=run_input)
    
    results = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        results.append(item)
    return results

def search_google(query: str, max_items: int = 5):
    """
    Performs a Google search and returns the top results.
    """
    run_input = {
        "queries": query,
        "resultsPerPage": max_items,
    }
    
    run = client.actor("apify/google-search-scraper").call(run_input=run_input)
    
    results = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        results.append(item)
    return results

def scrape_instagram_profile(username: str, max_items: int = 10):
    """
    Scrapes an Instagram profile and its recent posts using an Apify Actor.
    """
    run_input = {
        "username": [username],
        "resultsLimit": max_items,
    }
    
    run = client.actor("apify/instagram-profile-scraper").call(run_input=run_input)
    
    results = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        results.append(item)
    return results
