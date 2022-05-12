from ast import keyword
import sys
import os
from preprocess import preprocessFile
from sklearn.cluster import KMeans
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
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
    tf_idf_vectorizer = TfidfVectorizer(max_features=5000)
    tf_idf = tf_idf_vectorizer.fit_transform(data['tweets'][:])
    tf_idf_norm = normalize(tf_idf)

    tf_idf_array = tf_idf_norm.toarray()
    terms = tf_idf_vectorizer.get_feature_names()

    return [tf_idf_array,terms]


#returns the index with best silhouette score 
def silhouetteScore(tf_idf_array, k):
    range_n_clusters = range(2,k)
    silhouette_avg = []
    for i in range_n_clusters:
        kmeans = KMeans(n_clusters=i, random_state= 42)  
        kmeans.fit(tf_idf_array)  
        score = silhouette_score(tf_idf_array, kmeans.labels_, metric='euclidean')
        silhouette_avg.append(score)
    max_value = max(silhouette_avg)
    max_index =silhouette_avg.index(max_value)-2
    return max_index

def cluster(k,data):
    tf_idf_array,terms = tfidf(data)

    # returns the index with best silhouette score 
    k = silhouetteScore(tf_idf_array,15)

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
            
        cluster = cluster(data)
        transformedCluster = transformToDataset(cluster)
        # print(transformedCluster)
        c = json.dumps(transformedCluster)
    except Exception as e:
        c = json.dumps({'error': "Python Exception" + str(e)})
    print(c)
