from twython import TwythonStreamer

count = 0

class MyStreamer(TwythonStreamer):

    def on_success(self, data):
        global count
        if(count > 100):
            exit()
        else:
            count = count +1
        if 'text' in data:
            with open('D:\\tweets.csv', 'a', encoding='utf-8') as f:
                f.write(data['text'])
                print(data['text'])
                f.close()

    def on_error(self, status_code, data):
        print(status_code)

        # Want to stop trying to get data because of the error?
        # Uncomment the next line!
        # self.disconnect()

stream = MyStreamer('Wvu5aNI0IuUKqQLTDC9W3uuyF', 'IhD10WzLgtNmHzCdXVRwLKN3g4QJw6aOzVo1poYQqZ2LV42dhl',
                    '1270342846911057923-1dk6FZBLvoHKPev6387c5Sd3AXKdLg', 'xdcoA3lH9tAgPfqPp3ihQZF6OpVq3OsDgv3hgbdwltMQo')
stream.statuses.sample(languages="ur",  stall_warnings=False, threaded=False)
                   
