import json
import feedparser
from matplotlib.pyplot import title
from urduhack.preprocessing import remove_punctuation
from urduhack.preprocessing import remove_english_alphabets
from urduhack.normalization import remove_diacritics
from urduhack.preprocessing import normalize_whitespace
from datetime import datetime
import pandas as pd
import sys
import re

if __name__ == "__main__":
    df = pd.read_csv('./data/tweets.csv', encoding='utf-8', on_bad_lines='skip')
    if('type' not in df.index):
        del df["Unnamed: 0"]
        list = []
        for i in df['tweets']:
            list.append("Tweet")
        df['type'] = list

    # if('title' not in df.index):
    #     list = []
    #     for i in df['tweets']:
    #         list.append("Unkown User")
    #     df['title'] = list
    
    NewsFeed = feedparser.parse("https://www.nawaiwaqt.com.pk/rss/national")
    entry = NewsFeed.entries

    a=0
    # jangnews = 
    for i in entry:
        # print(df.head())
        # print(i.title)
        text = re.sub("[<=>]","",i.summary)
        text = remove_punctuation(text)
        text = remove_diacritics(text)
        text = remove_english_alphabets(text)
        text = normalize_whitespace(text)
        df= pd.concat([df,pd.DataFrame({"tweets":[text], "timestamp":[datetime.now().strftime("%a %b %d %H:%M:%S +0000 %Y")], "type":['News'],"title":[i.title]})],ignore_index=True)
        
    df.to_csv("./data/tweets.csv")
        # df['tweets'].append([text,datetime.now(),""])