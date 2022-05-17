from wordcloud import WordCloud
from bidi.algorithm import get_display
from arabic_reshaper import ArabicReshaper
import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv('./data/preprocessed_default.csv',
                   encoding='utf-8', on_bad_lines='skip')

def generate_word_cloud(text):
    configuration = {
        "language": "Urdu"
    }
    reshaper = ArabicReshaper(configuration=configuration)

    text = reshaper.reshape(text)
    text = get_display(text)

    word_cloud = WordCloud(collocations = False, background_color = 'white', 
                           scale=5,
                           max_font_size=70,
                           #font_path='NotoNaskhArabic-Regular.ttf'
                           ).generate(text)
    plt.axis("off")
    plt.imshow(word_cloud, interpolation="bilinear")


def tagcloud():
    urduletters = "آ أ ا ب پ ت ٹ ث  ج چ ح خ  د ڈ ذ ر ڑ ز ژ  س ش ص ض ط ظ ع غ  ف ق ک گ ل م  ن ں و ؤ ۂ ۃ ء ی ئ ے ۓ ".split()
    configuration = {
        "language": "Urdu"
    }
    reshaper = ArabicReshaper(configuration=configuration)

    tweets_text = " ".join(tweet for tweet in data['tweets'])
    text = reshaper.reshape(tweets_text)
    text = get_display(text)

    word_cloud = WordCloud(collocations=False,  background_color='white', stopwords=urduletters,
                           scale=5,
                           max_font_size=70,
                           font_path='./python/NotoNaskhArabic-Regular.ttf').generate(text)
    word_cloud.to_file("./data/tagcloud.png")
    plt.axis("off")


if __name__ == "__main__":
    try:
        text = "میں ٹھیک ہوں، شکریہ! اور آپ؟"
        generate_word_cloud(text)
        print(True)
    except Exception as e:
        print(False, e)

    
    
