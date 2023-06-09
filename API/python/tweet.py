import json
import tweepy
import pandas as pd
import sys

class MyStreamListener(tweepy.Stream):

    df = pd.DataFrame(columns=['tweets', 'timestamp','type','title'])
    target = 500
    count = 0

    def on_status(self, status):
        dict = status._json
        self.add_to_df(dict)
        if(self.count == self.target):
            
            self.df.to_csv("./data/tweets.csv")
            exit()
        else:
            self.count = self.count + 1
            # print(self.count)

    def on_error(self, status_code):
        print(status_code)

    def add_to_df(self, dict):
        print("\n")
        if(dict['truncated'] == True):
            tweet = pd.DataFrame(
                {'tweets': dict['extended_tweet']['full_text'], 'timestamp': dict['created_at'],"type":"Tweet","title":"User: " + dict["user"]["screen_name"]}, index=[self.count])
        else:
            if(dict.get("retweeted_status") and dict["retweeted_status"].get("extended_tweet")):
                tweet = pd.DataFrame({'tweets': dict['retweeted_status']['extended_tweet']['full_text'], 'timestamp': dict['created_at'],"type":"Tweet","title":"User: " + dict["user"]["screen_name"]}, index=[self.count])
            else:
                tweet = pd.DataFrame({'tweets': dict['text'], 'timestamp': dict['created_at'],"type":"Tweet","title":"User: " + dict["user"]["screen_name"]}, index=[self.count])
        self.df = pd.concat([self.df, tweet])

consumer_key = "4WW3Lb5J8vc8NO6FWAr0h0c1A"
consumer_secret = "d0kh3cWDbfpqm3sl4Ft274DqRQbGogkJaGzMprCAo2u0IPIdtD"
access_token = "1270342846911057923-FBZumgMPJ6bDLeTQH8TOmmnowvcM7G"
access_token_secret = "SHrZmhE7QEzpgt4xZwW3oGAxQvrG8kZLOfWq6uqFmYFethhu"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

if (not api):
    print("Authentication failed!")
    sys.exit(-1)

myStreamListener = MyStreamListener(
    consumer_key, consumer_secret, access_token, access_token_secret)
myStreamListener.filter(track=['آ,أ,ا,ب,پ,ت,ٹ,ث,,ج,چ,ح,خ,,د,ڈ,ذ,ر,ڑ,ز,ژ,,س,ش,ص,ض,ط,ظ,ع,غ,,ف,ق,ک,گ,ل,م,,ن,ں,و,ؤ,ۂ,ۃ,ء,ی,ئ,ے,ۓ,'
], languages=["ur"])
msg = "5000 live tweets fetched, and saved in file."
c = json.dumps(msg)
print(msg)