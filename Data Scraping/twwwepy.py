import tweepy

class IDPrinter(tweepy.Stream):

    def on_status(self, status):
        print(status.text)


printer = IDPrinter(
  "Wvu5aNI0IuUKqQLTDC9W3uuyF", "IhD10WzLgtNmHzCdXVRwLKN3g4QJw6aOzVo1poYQqZ2LV42dhl",
  "1270342846911057923-1dk6FZBLvoHKPev6387c5Sd3AXKdLg", "xdcoA3lH9tAgPfqPp3ihQZF6OpVq3OsDgv3hgbdwltMQo"
)
printer.sample(languages=["ur"])