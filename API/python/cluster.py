from preprocess import *
from kneed import KneeLocator
import sys
from sklearn.cluster import KMeans
from sklearn.preprocessing import normalize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
import pandas as pd
import json


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
    # terms = tf_idf_vectorizer

    return [tf_idf_array, terms]

def KneePoint(tf_idf_array, terms):
    a = pd.DataFrame(tf_idf_array, columns=terms)
    wcss_list = [] 
    for i in range(2, 15): 
        kmeans = KMeans(n_clusters = i, init = 'k-means++')
        kmeans.fit(a) 
        wcss_list.append(kmeans.inertia_)
    kn = KneeLocator(range(2,15), wcss_list, curve='convex', direction='decreasing')
    optimal_cluster = kn.knee
    return optimal_cluster

def cluster(k, tf_idf_array, terms):

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
    
    colors = ['#5e6def','#ff69a2', '#81da5e', '#ffd143', '#ef0d12', '#4e3383','#3dcfb7', '#be6068', '#136c1d', '#d07fa7', '#9fe9f4', '#f1bdf4']
    color_index = 0
    for i in clusterName:
        hexColor = colors[color_index]
        color_index +=1
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
        user_input_file = False
        if(sys.argv[1] == "file"):
            user_input_file = True
            unclean_data = pd.read_csv(
                './data/file_tweets.csv', encoding='utf-8', on_bad_lines='skip')
            # os.remove('./data/file_tweets.csv')
            clean_data = preprocessFile(unclean_data)
        elif(sys.argv[1] == "search"):
            #something
        else:
            unclean_data = pd.read_csv(
                './data/tweets.csv', encoding='utf-8', on_bad_lines='skip')

            clean_data = pd.read_csv(
                './data/preprocessed_default.csv', encoding='utf-8', on_bad_lines='skip')

        tf_idf_array, terms = tfidf(clean_data)

        k = KneePoint(tf_idf_array, terms)

        labels, cluster = cluster(k, tf_idf_array, terms)

        #writing labeled file for media/wordcloud
        if(sys.argv[1] == "file"):
            unclean_data.insert(2, "cluster", labels, True)
            unclean_data.to_csv("./data/file_unclean_data.csv")

            clean_data.insert(2, "cluster", labels, True)
            clean_data.to_csv("./data/file_clean_data.csv")
        elif(sys.argv[1] == "search"):
            unclean_data.insert(2, "cluster", labels, True)
            unclean_data.to_csv("./data/search_unclean_data.csv")

            clean_data.insert(2, "cluster", labels, True)
            clean_data.to_csv("./data/search_clean_data.csv")
        else:
            unclean_data.insert(2, "cluster", labels, True)
            unclean_data.to_csv("./data/live_unclean_data.csv")

            clean_data.insert(2, "cluster", labels, True)
            clean_data.to_csv("./data/live_clean_data.csv")

        transformedCluster = transformToDataset(cluster)
        c = json.dumps(transformedCluster)

    except Exception as e:
        c = json.dumps({'error': "Python Exception " + str(e)})
    print(c)
