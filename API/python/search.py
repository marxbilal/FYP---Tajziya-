import tweepy
import pandas as pd
import sys
import json

class MyStreamListener(tweepy.Stream):
    df = pd.DataFrame(columns=['tweets','timestamp'])
    target = 100
    count = 0

    def on_status(self,status):
        dict = status._json
        self.add_to_df(dict)
        if(self.count == self.target):
            self.df.to_csv("./data/search_unclean_data.csv")
            msg = {'success': "Searching 100 tweets containing keyword: "+ keyword}
            c = json.dumps(msg)
            print(c)
            exit()
        else:
            self.count = self.count + 1
            
    def on_error(self,status_code):
        msg = {'error': "Python Exception "+ str(status_code)}
        c = json.dumps(msg)
        print(c)

    def add_to_df(self, dict):
        if(dict['truncated'] == True):
            tweet = pd.DataFrame({'tweets': dict['extended_tweet']['full_text'], 'timestamp': dict['created_at']},index = [self.count])
        else:
            tweet = pd.DataFrame({'tweets': dict['text'], 'timestamp': dict['created_at']},index = [self.count])
        self.df = pd.concat([self.df,tweet])
        
consumer_key="Wvu5aNI0IuUKqQLTDC9W3uuyF"
consumer_secret="IhD10WzLgtNmHzCdXVRwLKN3g4QJw6aOzVo1poYQqZ2LV42dhl"
access_token="1270342846911057923-1dk6FZBLvoHKPev6387c5Sd3AXKdLg"
access_token_secret="xdcoA3lH9tAgPfqPp3ihQZF6OpVq3OsDgv3hgbdwltMQo"

auth = tweepy.OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

if (not api):
    msg = {'error': "Python Exception Auth failed"}
    c = json.dumps(msg)
    print(c)
    sys.exit(-1)

myStreamListener = MyStreamListener(consumer_key,consumer_secret, access_token, access_token_secret)

    
if sys.argv[1] :
    keyword = sys.argv[1]
    track = [keyword]
    
    myStreamListener.filter(track=track, languages=["ur"] )
else:
    msg = {'error':"Python Error No keyword was entered!"}
    c = json.dumps(msg)
    print(c)

