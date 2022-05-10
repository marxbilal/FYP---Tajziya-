from ast import keyword
import sys
import os
from preprocess import preprocessFile
from sklearn.cluster import KMeans
from sklearn.cluster import KMeans
from sklearn.preprocessing import normalize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
import pandas as pd
import json
import random

def topKeywords(model,terms,k,n):
    order_centroids = model.cluster_centers_.argsort()[:, ::-1]
    topwords = []
    for i in range(k):
        words = []
        for ind in order_centroids[i, :n]:
            words.append(terms[ind])
        topwords.append({
            "cluster":i,
            "words":words
        })
    return topwords

def tfidf(data):
    tf_idf_vectorizor = TfidfVectorizer(max_features=5000)
    tf_idf = tf_idf_vectorizor.fit_transform(data['tweets'][:])
    tf_idf_norm = normalize(tf_idf)

    tf_idf_array = tf_idf_norm.toarray()
    terms = tf_idf_vectorizor.get_feature_names()

    return [tf_idf_array,terms]


def cluster(k,data):
    tf_idf_array,terms = tfidf(data)

    sklearn_pca = PCA(n_components=2)
    Y_sklearn = sklearn_pca.fit_transform(tf_idf_array)
    model = KMeans(n_clusters=k).fit(Y_sklearn)
    keywordModel = KMeans(n_clusters=k).fit(tf_idf_array)
    labels = model.labels_

    Y_sklearn = Y_sklearn.tolist()
    labels = labels.tolist()

    
    keywords = topKeywords(keywordModel,terms,k,10)

    cluster = [Y_sklearn, labels, keywords]

    return cluster

def transformToDataset(raw):
    cluster = []
    Y_sklearn, labels, keywords = raw

    clusterName = set(labels)
    for i in clusterName:
        hexColor = "#"+''.join([random.choice('ABCDEF0123456789') for i in range(6)])
        cluster.append({'label': i, 'data': [],'backgroundColor': hexColor})

    for i in range(0,len(Y_sklearn)):
        data = {
            'x' : Y_sklearn[i][0],
            'y' : Y_sklearn[i][1],
            'r' : 10
        }
        n = labels[i]
        cluster[n]['data'].append(data)

    cluster = {"data" : cluster,"keywords":keywords}
    
    return cluster



if __name__ == "__main__":
    try:
        if(sys.argv[1] == "file"):
            data = pd.read_csv('./data/file_tweets.csv', encoding='utf-8', on_bad_lines='skip')
            os.remove('./data/file_tweets.csv')
            data = preprocessFile(data)
        else:
            data = pd.read_csv('./data/preprocessed_default.csv', encoding='utf-8', on_bad_lines='skip')
        cluster = cluster(3,data)
        transformedCluster = transformToDataset(cluster)
        # print(transformedCluster)
        c = json.dumps(transformedCluster)
    except Exception as e:
        c = json.dumps({'error': "Python Exception" + str(e)})
    print(c)
