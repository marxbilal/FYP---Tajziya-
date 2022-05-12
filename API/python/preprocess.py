import stanza
import pandas as pd
from urduhack import normalize as urduhack_normalize
from urduhack.preprocessing import normalize_whitespace
from urduhack.preprocessing import remove_punctuation
from urduhack.preprocessing import replace_urls
from urduhack.preprocessing import replace_emails
from urduhack.preprocessing import replace_numbers
from urduhack.preprocessing import remove_english_alphabets
from urduhack.normalization import remove_diacritics
import re

# stanza.download('ur')
nlp = stanza.Pipeline(lang='ur', processors='tokenize,lemma')

def remove_duplicate_words(string):
    x = string.split()
    x = sorted(set(x), key = x.index)
    return ' '.join(x)

stop_word = "نہیں نے ہاں ہر ہم ہمارا ہمارے ہماری ہو ہوا ہوتا ہوتے ہوتی ہوتیں ہوں ہونا ہونگے ہونے ہونی ہوئے ہوئی ہوئیں ہے ہی ہیں والا والوں والے والی وہ وہاں وہی وہیں یا یعنی یہ یہاں یہی یہیں اب ابھی اپنا اپنے اپنی اس اسے اسی اگر ان انہوں انہی انہیں او اور اے ایسا ایسے ایسی ایک آپ آتا آتے آتی آگے آنا آنے آنی آئے آئی آئیں آیا با بڑا بڑے بڑی بعد بعض بلکہ بہت بھی بے پاس پر پہلے پھر تا تاکہ تب تجھ تجھے تک تم تمام تمہارا تمہارے تمھارے تمہاری تمہیں تمھیں تھا تھے تھی تھیں تو تیری تیرے جا جاتا جاتی جاتے جاتی جانے جانی جاؤ جائے جائیں جب جس جن جنہوں جنہیں جو جیسا جیسے جیسی جیسوں چاہیئے چلا چاہے چونکہ حالانکہ دو دونوں دوں دے دی دیا دیں دیے دیتا دیتے دیتی دینا دینے دینی دیئے ڈالا ڈالنا ڈالنے ڈالنی ڈالے ڈالی ذرا رکھا رکھتا رکھتے رکھتی رکھنا رکھنے رکھے رکھی رہ رہا رہتا رہتے رہتی رہنا رہنے رہنی رہو رہے رہی رہیں زیادہ سا سامنے سب سکتا سو سے سی شاید صرف طرح طرف عین کا کبھی کچھ کہہ کر کرتا کرتے کرتی کرنا کرنے کرو کروں کرے کریں کس کسے کسی کہ کہا کہے کو کون کوئی کے کی کیا کیسے کیوں کیونکہ کیے کئے گا گویا گے گی گیا گئے گئی لا لاتا لاتے لاتی لانا لانے لانی لایا لائے لائی لگا لگے لگی لگیں لو لے لی لیا لیتا لیتے لیتی لیکن لیں لیے لئے مجھ مجھے مگر میرا میرے میری میں کہاں نا نہ نہایت"
stop_word = remove_duplicate_words(stop_word)
stop_word = stop_word.split()


def readfromDB():
    df = pd.read_csv('./data/tweets.csv',encoding='utf-8', on_bad_lines='skip')
    del df["Unnamed: 0"]
    df['timestamp'] = pd.to_datetime(
        df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')
    print("read from df")
    return df


def preprocess(word):
#   word = re.sub("\W", " ",word)
#   word = re.sub("[a-zA-Z0-9]","",word)
#   word = normalize_characters(word)
    word = remove_punctuation(word)
    word = normalize_whitespace(word)
    word = replace_urls(word)
    word = replace_emails(word)
    word = remove_diacritics(word)
    word = urduhack_normalize(word)
    word = replace_numbers(word)
    word = remove_english_alphabets(word)
    
#   STanza lemmentization normalize
    doc = nlp(word)
    a = doc.to_dict()
    if(len(a) != 0):
        a = a[0]
        word = ''
        for i in a:
            if not i['lemma'] in stop_word:
                if(i['id']==(a[-1]['id'])):
                    word=word+i['lemma']
                else:
                    word = word+i['lemma']+' '
    
    return word

# Applying pre-processing on original_dataframe to remove links, symbols, duplicates and stopwords
def preprocess_df(original_df):
    unprocessed_tweets = []
    for i in range(len(original_df.index)):
        tweet = original_df[original_df.columns[0]][i]
        unprocessed_tweets.append(tweet)

    preprocessed_tweets =[]
    for tweet in unprocessed_tweets:
        preprocessed_tweets.append(preprocess(tweet))

    preprocessed_df = pd.DataFrame(preprocessed_tweets,columns = ["tweets"])
    preprocessed_df['timestamp'] = pd.to_datetime(original_df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')

    return preprocessed_df


if __name__ == "__main__":
    df = readfromDB()

    preprocessed_df = preprocess_df(df)
    preprocessed_df.to_csv("./data/preprocessed.csv")
