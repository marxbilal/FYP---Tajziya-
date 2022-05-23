from wordcloud import WordCloud
from bidi.algorithm import get_display
from arabic_reshaper import ArabicReshaper
import matplotlib.pyplot as plt
import pandas as pd
import sys

def json_for_single_wordcloud_dict(wordcloud_dict):
    list = []
    for key in wordcloud_dict:
        wordcloud_dict.get(key)
        dict = {
            "word" : key[::-1],
            "value" : wordcloud_dict.get(key),
        }
        list.append(dict) 
    return list

def wordcloud_dict_to_json(df):
    list = []
    for i in range(df['cluster'].max()+1):
        ith_cluster_text = " ".join(str(text) for text in df[df['cluster']==i]['tweets'])
        ith_wordcloud_dict = WordCloud().process_text(ith_cluster_text)
        item = {
            "label": "Cluster "+str(i),
            "data": json_for_single_wordcloud_dict(ith_wordcloud_dict)
        }
        list.append(item)

    return list


if __name__ == "__main__":
    try:
        if(sys.argv[1] == "file"):
            clean_df = pd.read_csv('./data/file_clean_data.csv', encoding='utf-8', on_bad_lines='skip')
        elif(sys.argv[1] == "search"):
            clean_df = pd.read_csv('./data/search_clean_data.csv', encoding='utf-8', on_bad_lines='skip')
        else:
            clean_df = pd.read_csv('./data/live_clean_data.csv', encoding='utf-8', on_bad_lines='skip')
        
        #wordcloud json for all tweets 
        # all_tweets_text = " ".join(str(tweet) for tweet in clean_df['tweets'])
        # wordcloud_dict0 = WordCloud().process_text(all_tweets_text)
        # all_tweets_wordcloud_json = json_for_single_wordcloud_dict(wordcloud_dict0)

        #wordcloud json for each cluster
        clusterwise_wordcloud_json = wordcloud_dict_to_json(clean_df)
        
        print(clusterwise_wordcloud_json)
    except Exception as e:
        print(False, e)