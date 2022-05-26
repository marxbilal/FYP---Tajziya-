import pandas as pd
import sys
import json
import traceback

def media_cluster_json(df):
    list = []
    for label in range(df['cluster'].max()+1):
        temp_df = df[df['cluster']==label]
        list1 = []
        for i in temp_df.iloc:
            type = "Tweet"
            title = "Tweet"
            if('type' in i):
                type = i['type']
            elif('title' in i):
                title = i['title']
            dict = {
                "label" : "Cluster "+str(label),
                "type" : type,
                "title": title,
                "tweet" : i['tweets']
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
        traceback_info = traceback.format_exc()
        c = json.dumps({'error': "Python Exception " + str(traceback_info)})
        print(c)