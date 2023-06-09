import tweepy
from hdfs import InsecureClient

# Twitter API credentials
consumer_key = "4WW3Lb5J8vc8NO6FWAr0h0c1A"
consumer_secret = "d0kh3cWDbfpqm3sl4Ft274DqRQbGogkJaGzMprCAo2u0IPIdtD"
access_token = "1270342846911057923-FBZumgMPJ6bDLeTQH8TOmmnowvcM7G"
access_token_secret = "SHrZmhE7QEzpgt4xZwW3oGAxQvrG8kZLOfWq6uqFmYFethhu"

# HDFS settings
hdfs_host = "localhost"
hdfs_port = 9000
hdfs_user = "hdfs"
hdfs_path = "/tweets.txt"

keyword = "باجوہ"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

tweets = api.search_tweets(q=keyword, lang="ur", count=100)

tweet_data = ""
for tweet in tweets:
    tweet_data += tweet.text + "\n"

# Save tweets to HDFS
client = InsecureClient(f"http://{hdfs_host}:{hdfs_port}", user=hdfs_user)
with client.write(hdfs_path, overwrite=True) as writer:
    writer.write(tweet_data)

print("Saved successfully!")
