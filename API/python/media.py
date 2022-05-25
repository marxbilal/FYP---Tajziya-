import pandas as pd
import sys
import json

def media_cluster_json(df):
    list = []
    for label in range(df['cluster'].max()+1):
        temp_df = df[df['cluster']==label]
        list1 = []
        for tweet in temp_df['tweets']:
            dict = {
                "label" : "Cluster "+str(label),
                "type" : "Tweet",
                "tweet" : tweet
            }
            list1.append(dict)
        list.append(list1)
    return list

if __name__ == "__main__":
    try:
        if len(sys.argv) == 1:
            df = pd.read_csv('./data/live_unclean_data.csv', encoding='utf-8', on_bad_lines='skip')
        elif(sys.argv[1] == "file"):
            df = pd.read_csv('./data/file_unclean_data.csv', encoding='utf-8', on_bad_lines='skip')
        elif(sys.argv[1] == "search"):
            df = pd.read_csv('./data/search_unclean_data.csv', encoding='utf-8', on_bad_lines='skip')
        else:
            df = pd.read_csv('./data/live_unclean_data.csv', encoding='utf-8', on_bad_lines='skip')
        output = media_cluster_json(df)
        print(json.dumps(output))
        
    except Exception as e:
        c = json.dumps({'error': "Python Exception " + str(e)})
        print(c)