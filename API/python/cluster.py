
from sklearn.cluster import KMeans
from sklearn.cluster import KMeans
from sklearn.preprocessing import normalize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
import pandas as pd
import json


data = pd.read_csv('./data/preprocessed.csv',
                   encoding='utf-8', on_bad_lines='skip')


def tfidf():

    tf_idf_vectorizor = TfidfVectorizer(max_features=5000)
    tf_idf = tf_idf_vectorizor.fit_transform(data['tweets'][:])
    tf_idf_norm = normalize(tf_idf)

    tf_idf_array = tf_idf_norm.toarray()
    a = pd.DataFrame(
        tf_idf_array, columns=tf_idf_vectorizor.get_feature_names_out())
    return tf_idf_array


def cluster(k):
    tf_idf_array = tfidf()
    model = KMeans(n_clusters=k).fit(tf_idf_array)
    labels = model.labels_
    sklearn_pca = PCA(n_components=3)
    Y_sklearn = sklearn_pca.fit_transform(tf_idf_array)

    Y_sklearn = Y_sklearn.tolist()
    labels = labels.tolist()
    cluster = [Y_sklearn, labels]
    return cluster


if __name__ == "__main__":
    tf_idf = tfidf()
    clusters = cluster(3)
    c = json.dumps(clusters)
    print(c)
