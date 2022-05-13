from wordcloud import WordCloud
from bidi.algorithm import get_display
from arabic_reshaper import ArabicReshaper
import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv('./data/preprocessed_default.csv',
                   encoding='utf-8', on_bad_lines='skip')


def tagcloud():
    urduletters = "آ أ ا ب پ ت ٹ ث  ج چ ح خ  د ڈ ذ ر ڑ ز ژ  س ش ص ض ط ظ ع غ  ف ق ک گ ل م  ن ں و ؤ ہ ۂ ۃ  ھ ء ی ئ ے ۓ ".split()
    configuration = {
        "language": "Urdu"
    }
    reshaper = ArabicReshaper(configuration=configuration)

    # print(data['tweets'])
    # tweets_text = str(data['tweets'].tolist())
    tweets_text = " ".join(tweet for tweet in data['tweets'])
    # print(tweets_text)

    text = reshaper.reshape(tweets_text)
    text = get_display(text)

    # width=1200, height=600,
    word_cloud = WordCloud(collocations=False,  background_color='white', stopwords=urduletters,
                           scale=5,
                           #    min_font_size=10,
                           max_font_size=70,
                           font_path='./python/NotoNaskhArabic-Regular.ttf').generate(text)
    word_cloud.to_file("./data/tagcloud.png")
    plt.axis("off")
    # plt.imshow(word_cloud, interpolation="bilinear")
    # plt.imsave("./python/tagcloud.png", word_cloud)


if __name__ == "__main__":
    try:
        tagcloud()
        print(True)
    except Exception as e:
        print(False)

    
    
