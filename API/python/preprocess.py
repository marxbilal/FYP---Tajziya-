import stanza
import pandas as pd
from urduhack.preprocessing import normalize_whitespace
from urduhack.preprocessing import remove_punctuation
from urduhack.preprocessing import replace_urls
from urduhack.preprocessing import replace_emails
from urduhack.preprocessing import replace_numbers
from urduhack.preprocessing import remove_english_alphabets
import re

# stanza.download('ur')

nlp = stanza.Pipeline(lang='ur', processors='tokenize,lemma')

stop_word = 'ایت نہیں نے ہاں ہر ہم مےں ہو ہے ہی و والا وہ وہاں وہی وہیں یا یعنی یہ یہاں یہیںاب ابھی اپنا اٹھ اگر او اور اے ایسا ایک آ آپ آگے آنی آئی با بڑا بڑی بعد بعض بلکہ بہت بھی بے پاس پر پہلے پھر تا تاکہ تب تجھ تو تک تمام تمہارا تمھارا تم تمھ تھا تیری تیرا جا جاؤ جب جو جیسا جیسے جیسی جیس چاہیئے چل چاہ چونکہ حالاں حالانکہ دو دوں دے دینی ڈال ڈالنا ڈالنی ذرا رکھ رکھنی رہ رہنی زیادہ سا سامنے سب سک سو سے سی شاید صرف طرح طرف عین کا کبھی کچھ کہہ کر کون کوا کوئی کہ کہا کو کیسا کیوں کیونکہ گا گویا گے گی لا لاتا لاتی لانی لائے لگ لو لے لیکن لیے لئے مجھ مگر میرا میرے میں نا نہ نہایت یہیں'
stop_word = stop_word.split()


def readfromDB():
    df = pd.read_csv('./data/tweets.csv',encoding='utf-8', on_bad_lines='skip')
    df['timestamp'] = pd.to_datetime(
        df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')
    print("read from df")
    return df


def preprocess(word):

    word = re.sub("\W", " ", word)
    word = re.sub("[a-zA-Z0-9]", "", word)
    word = normalize_whitespace(word)
    word = remove_punctuation(word)
    word = replace_urls(word)
    word = replace_emails(word)
    #word = normalize(word)
    word = replace_numbers(word)
    # STanza lemmentization normalize

    doc = nlp(word)
    a = doc.to_dict()
    if(len(a) != 0):
        a = a[0]
        word = ''
        for i in a:
            if not i['lemma'] in stop_word:
                if(i['id'] == (a[-1]['id'])):
                    word = word+i['lemma']
                else:
                    word = word+i['lemma']+' '

    return word

def preprocessFile(df):
    # df = pd.read_csv(path, encoding='utf-8', on_bad_lines='skip')
    df['timestamp'] = pd.to_datetime( df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')

    list1 = []
    for i in range(len(df.index)):
        sent = df[df.columns[1]][i]
        list1.append(sent)

    sent_p = []
    for tweet in list1:
        sent_p.append(preprocess(tweet))

    df2 = pd.DataFrame(sent_p, columns=["tweets"])
    df2['timestamp'] = pd.to_datetime(
        df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')
        
    return df2


if __name__ == "__main__":
    df = readfromDB()

    list1 = []
    for i in range(len(df.index)):
        sent = df[df.columns[1]][i]
        list1.append(sent)

    sent_p = []
    for tweet in list1:
        sent_p.append(preprocess(tweet))

    df2 = pd.DataFrame(sent_p, columns=["tweets"])
    df2['timestamp'] = pd.to_datetime(
        df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')
    df2.to_csv("./data/preprocessed.csv")
