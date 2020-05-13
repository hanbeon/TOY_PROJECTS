package crawlingUtils.utils;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class CrawlingJsoup {

    public static Document getSitePage(String url) {

        Document doc = null;
        try {

            doc = Jsoup.connect(url).get();

        }catch(IOException e) {
            e.printStackTrace();
        }catch(Exception e) {
            e.printStackTrace();
        }

        return doc;
    }

}
