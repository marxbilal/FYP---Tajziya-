import pandas as pd
from urduhack import normalize as urduhack_normalize
from urduhack.normalization import normalize_characters
from urduhack.preprocessing import normalize_whitespace
from urduhack.preprocessing import remove_punctuation
from urduhack.preprocessing import replace_urls
from urduhack.preprocessing import replace_emails
from urduhack.preprocessing import replace_numbers
from urduhack.preprocessing import remove_english_alphabets
from urduhack.normalization import remove_diacritics
import re

def remove_duplicate_words(string):
    x = string.split()
    x = sorted(set(x), key=x.index)
    return ' '.join(x)

stop_word = "نہیں نے ہاں ہر ہم ہمارا ہمارے ہماری ہو ہوا ہوتا ہوتے ہوتی ہوتیں ہوں ہونا ہونگے ہونے ہونی ہوئے ہوئی ہوئیں ہے ہی ہیں والا والوں والے والی وہ وہاں وہی وہیں یا یعنی یہ یہاں یہی یہیں اب ابھی اپنا اپنے اپنی اس اسے اسی اگر ان انہوں انہی انہیں او اور اے ایسا ایسے ایسی ایک آپ آتا آتے آتی آگے آنا آنے آنی آئے آئی آئیں آیا با بڑا بڑے بڑی بعد بعض بلکہ بہت بھی بے پاس پر پہلے پھر تا تاکہ تب تجھ تجھے تک تم تمام تمہارا تمہارے تمھارے تمہاری تمہیں تمھیں تھا تھے تھی تھیں تو تیری تیرے جا جاتا جاتی جاتے جاتی جانے جانی جاؤ جائے جائیں جب جس جن جنہوں جنہیں جو جیسا جیسے جیسی جیسوں چاہیئے چلا چاہے چونکہ حالانکہ دو دونوں دوں دے دی دیا دیں دیے دیتا دیتے دیتی دینا دینے دینی دیئے ڈالا ڈالنا ڈالنے ڈالنی ڈالے ڈالی ذرا رکھا رکھتا رکھتے رکھتی رکھنا رکھنے رکھے رکھی رہ رہا رہتا رہتے رہتی رہنا رہنے رہنی رہو رہے رہی رہیں زیادہ سا سامنے سب سکتا سو سے سی شاید صرف طرح طرف عین کا کبھی کچھ کہہ کر کرتا کرتے کرتی کرنا کرنے کرو کروں کرے کریں کس کسے کسی کہ کہا کہے کو کون کوئی کے کی کیا کیسے کیوں کیونکہ کیے کئے گا گویا گے گی گیا گئے گئی لا لاتا لاتے لاتی لانا لانے لانی لایا لائے لائی لگا لگے لگی لگیں لو لے لی لیا لیتا لیتے لیتی لیکن لیں لیے لئے مجھ مجھے مگر میرا میرے میری میں کہاں نا نہ نہایت"
urduletters = "آ أ ا ب پ ت ٹ ث  ج چ ح خ  د ڈ ذ ر ڑ ز ژ  س ش ص ض ط ظ ع غ  ف ق ک گ ل م  ن ں و ؤ ۂ ۃ ء ی ئ ے ۓ "
stop_word += " " + urduletters
stop_word = remove_duplicate_words(stop_word)
stop_word = stop_word.split()

def readfromDB():
    df = pd.read_csv('./data/tweets.csv',
                     encoding='utf-8', on_bad_lines='skip')
    # del df["Unnamed: 0"]
    df['timestamp'] = pd.to_datetime(
        df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')
    print("read from df")
    return df

def preprocess_line(sentence):
    sentence = re.sub("\n"," ",sentence)
    sentence = normalize_characters(sentence)
    sentence = replace_numbers(sentence)
    sentence = remove_punctuation(sentence)
    
    sentence = replace_urls(sentence)
    sentence = replace_emails(sentence)
    sentence = remove_diacritics(sentence)
    sentence = urduhack_normalize(sentence)
    sentence = remove_english_alphabets(sentence)

    new_sentence = ""
    for word in sentence.split(" "):
        if not word in stop_word:
            new_sentence = new_sentence + word + " "

    sentence = new_sentence
    sentence = normalize_whitespace(sentence)

    return sentence

def preprocessFile(df):
    # df = pd.read_csv(path, encoding='utf-8', on_bad_lines='skip')
    # del df["Unnamed: 0"]
    df['timestamp'] = pd.to_datetime(
        df['timestamp'])

    list1 = []
    for i in range(len(df.index)):
        sent = df[df.columns[1]][i]
        list1.append(sent)

    sent_p = []
    for tweet in list1:
        sent_p.append(preprocess_line(tweet))

    df2 = pd.DataFrame(sent_p, columns=["tweets"])
    df2['timestamp'] = pd.to_datetime(
        df['timestamp'], format='%a %b %d %H:%M:%S +0000 %Y')

    return df2

def preprocessUserFile(df):
    list1 = []
    for i in range(len(df.index)):
        sent = df[df.columns[1]][i]
        list1.append(sent)

    sent_p = []
    for tweet in list1:
        sent_p.append(preprocess_line(tweet))

    df2 = pd.DataFrame(sent_p, columns=["tweets"])
    
    return df2

if __name__ == "__main__":
    df = readfromDB()

    preprocessed_df = preprocessFile(df)
    preprocessed_df.to_csv("./data/testing_urduhack_normalize.csv")
