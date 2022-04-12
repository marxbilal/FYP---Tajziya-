import tweepy
import pandas as pd
import sys
#import timestamp
class MyStreamListener(tweepy.Stream):

    df = pd.DataFrame(columns=['tweets','timestamp'])
    target = 1000
    count = 0

    def on_status(self,status):

        # print(dir(status))
        # print('\n {}'.format(status.truncated))
        # exit()
        #print(self.count)

        dict = status._json
        self.add_to_df(dict)
        if(self.count == self.target):
            self.df.to_csv("..\\tweets.csv")
            exit()
        else:
            self.count = self.count + 1

    def on_error(self,status_code):
        print(status_code)

    def add_to_df(self, dict):
        if(dict['truncated'] == True):
            tweet = pd.DataFrame({'tweets': dict['extended_tweet']['full_text'], 'timestamp': dict['created_at']},index = [self.count])
        else:
            tweet = pd.DataFrame({'tweets': dict['text'], 'timestamp': dict['created_at']},index = [self.count])
        print('\n')
        # print("{} TRUNCATED = {} ".format(tweet,dict['truncated']))
        self.df = pd.concat([self.df,tweet])
        


consumer_key="Wvu5aNI0IuUKqQLTDC9W3uuyF"
consumer_secret="IhD10WzLgtNmHzCdXVRwLKN3g4QJw6aOzVo1poYQqZ2LV42dhl"
access_token="1270342846911057923-1dk6FZBLvoHKPev6387c5Sd3AXKdLg"
access_token_secret="xdcoA3lH9tAgPfqPp3ihQZF6OpVq3OsDgv3hgbdwltMQo"

auth = tweepy.OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

if (not api):
    print("Authentication failed!")
    sys.exit(-1)

#myStreamListener = MyStreamListener()
# myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
myStreamListener = MyStreamListener(consumer_key,consumer_secret, access_token, access_token_secret)
# myStream = tweepy.Stream(consumer_key,consumer_secret, access_token, access_token_secret) # auth = api.auth, listener=myStreamListener
myStreamListener.filter(track=['ہو'], languages=["ur"] )

