from ast import keyword
from preprocess import *
from tagcloud import *
import sys
import os
#from sklearn.cluster import KMeans
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import normalize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
import pandas as pd
import json
import random


def topKeywords(model, terms, k, n):
    order_centroids = model.cluster_centers_.argsort()[:, ::-1]
    topwords = []
    for i in range(k):
        words = []
        for ind in order_centroids[i, :n]:
            words.append(terms[ind])
        topwords.append({
            "cluster": i,
            "words": words
        })
    return topwords


def tfidf(data):
    tf_idf_vectorizer = TfidfVectorizer(max_features=5000)
    tf_idf = tf_idf_vectorizer.fit_transform(data['tweets'][:])
    tf_idf_norm = normalize(tf_idf)

    tf_idf_array = tf_idf_norm.toarray()
    terms = tf_idf_vectorizer.get_feature_names_out()

    return [tf_idf_array, terms]


# returns the index with best silhouette score
def silhouetteScore(tf_idf_array, k):
    range_n_clusters = range(2, k)
    silhouette_avg = []
    for i in range_n_clusters:
        kmeans = KMeans(n_clusters=i, random_state=42)
        kmeans.fit(tf_idf_array)
        score = silhouette_score(
            tf_idf_array, kmeans.labels_, metric='euclidean')
        silhouette_avg.append(score)
    max_value = max(silhouette_avg)
    max_index = silhouette_avg.index(max_value)-2
    return max_index


def five_tweets_from_clusters(clusters):
    for i in range(len(clusters)):
        print("Cluster: " + str(i))
        for j in range(min(len(clusters[i]), 5)):
            print(clusters[i][j]+'\n')


def get_text_of_each_cluster(raw_df, clean_df, k, labels):
    unprocessed_clusters = []
    preprocessed_clusters = []
    for i in range(k):
        unprocessed_clusters.append([])
        preprocessed_clusters.append([])

    for i, row in raw_df.iterrows():
        unprocessed_clusters[labels[i]].append(row['tweets'])

    i = 0
    for i, row in clean_df.iterrows():
        preprocessed_clusters[labels[i]].append(row['tweets'])

    return [unprocessed_clusters, preprocessed_clusters]


def media_cluster(unclean_cluster_tweets):
    list = []

<<<<<<< Updated upstream
    for i in range(len(unclean_cluster_tweets)):
        for tweet in unclean_cluster_tweets[i]:
            dict = {
                "label": "Cluster "+str(i),
                "Type": "Tweet",
                "Tweet": tweet
            }
            list.append(dict)
    return list


def wordcloud_for_cluster(clusters_clean_text, cluster_index):
    tweets_text = " ".join(
        tweet for tweet in clusters_clean_text[cluster_index])
    # generate_word_cloud(clusters_clean_text[cluster_index])
    generate_word_cloud(tweets_text)


def cluster(k, tf_idf_array, terms):
=======
    return [tf_idf_array, terms]


def cluster(k, data):
    tf_idf_array, terms = tfidf(data)
>>>>>>> Stashed changes

    sklearn_pca = PCA(n_components=2)
    Y_sklearn = sklearn_pca.fit_transform(tf_idf_array)
    model = KMeans(n_clusters=k).fit(Y_sklearn)
    keywordModel = KMeans(n_clusters=k).fit(tf_idf_array)
    labels = model.labels_

    Y_sklearn = Y_sklearn.tolist()
    labels = labels.tolist()

    keywords = topKeywords(keywordModel, terms, k, 10)

    cluster = [Y_sklearn, labels, keywords]

    return [labels, cluster]



def transformToDataset(raw):
    cluster = []
    Y_sklearn, labels, keywords = raw

    clusterName = set(labels)
    for i in clusterName:
        hexColor = "#"+''.join([random.choice('ABCDEF0123456789')
                               for i in range(6)])
        cluster.append({'label': i, 'data': [], 'backgroundColor': hexColor})

    for i in range(0, len(Y_sklearn)):
        data = {
            'x': Y_sklearn[i][0],
            'y': Y_sklearn[i][1],
            'r': 10
        }
        n = labels[i]
        cluster[n]['data'].append(data)

    cluster = {"data": cluster, "keywords": keywords}

    return cluster


if __name__ == "__main__":
    try:
        if(sys.argv[1] == "file"):
<<<<<<< Updated upstream
            unclean_data = pd.read_csv(
                './data/file_tweets.csv', encoding='utf-8', on_bad_lines='skip')
            # os.remove('./data/file_tweets.csv')
            clean_data = preprocess_df(unclean_data)
        else:
            unclean_data = pd.read_csv(
                './data/tweets.csv', encoding='utf-8', on_bad_lines='skip')

            clean_data = pd.read_csv(
                './data/preprocessed_default.csv', encoding='utf-8', on_bad_lines='skip')

        tf_idf_array, terms = tfidf(clean_data)

        # returns the index with best silhouette score
        k = silhouetteScore(tf_idf_array, 15)

        labels, cluster = cluster(k, tf_idf_array, terms)

=======
            data = pd.read_csv('./data/file_tweets.csv',
                               encoding='utf-8', on_bad_lines='skip')
            os.remove('./data/file_tweets.csv')
            data = preprocessFile(data)
        else:
            data = pd.read_csv('./data/preprocessed_default.csv',
                               encoding='utf-8', on_bad_lines='skip')
        cluster = cluster(3, data)
>>>>>>> Stashed changes
        transformedCluster = transformToDataset(cluster)
        # print(transformedCluster)
        c = json.dumps(transformedCluster)

        unclean_cluster_tweets, clean_cluster_tweets = get_text_of_each_cluster(
            unclean_data, clean_data, k, labels)

        media_output = media_cluster(unclean_cluster_tweets)

        wordcloud_for_cluster(clean_cluster_tweets, 0)
        c = json.dumps("success")

    except Exception as e:
        c = json.dumps({'error': "Python Exception " + str(e)})
    print(c)
