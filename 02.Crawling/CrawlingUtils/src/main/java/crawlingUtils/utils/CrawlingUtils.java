package crawlingUtils.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import org.asynchttpclient.AsyncCompletionHandler;
import org.asynchttpclient.AsyncHttpClient;
import org.asynchttpclient.Dsl;
import org.asynchttpclient.HttpResponseBodyPart;
import org.asynchttpclient.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class CrawlingUtils {

    private static final String DEFAULT_PATH = System.getProperty("user.dir");

    /**
     * @DATE 2020. 1. 21.
     * @DESC Get Chrome Version
     * @return
     */
    public static String getChromeVersion() {

        Process p;
        StringBuilder builder = new StringBuilder();

        try {
            p = Runtime.getRuntime().exec("reg query \"HKCU\\Software\\Google\\Chrome\\BLBeacon\" /v version");
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()),8*1024);
            String s = null;

            while ((s = stdInput.readLine()) != null) {

                builder.append(s);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        String version = "";
        if ( !"".equals(builder.toString()) && null != builder ) {

            String[] process = builder.toString().split("    ");
            version = process[3];
        }
        return version;
    }

    /**
     * @DATE 2020. 1. 21.
     * @DESC Find Local Chrome Driver
     * @return
     */
    public static boolean findLocalDirverChrome(String installedVersion) {

        boolean flag = false;

        File file = new File(DEFAULT_PATH+"\\chromeDriver"+installedVersion+".zip");

        if ( file.exists() ) {

            flag = true;
        }

        return flag;
    }

    /**
     * @DATE 2020. 1. 21.
     * @DESC Find Chrome Driver Version
     * @param version
     * @return
     */
    public static Map<String, Object> findDriverChrome(String version) {

        String chrome_driver_list = "https://chromedriver.storage.googleapis.com/?delimiter=/&prefix=";
        String search_version = version.substring(0, version.lastIndexOf("."));

        Document doc = CrawlingJsoup.getSitePage(chrome_driver_list);

        Elements element = doc.select("CommonPrefixes Prefix");
        String result = "";
        for ( Element el : element ) {
            if ( el.text().contains(search_version) ) {
                result = el.text();
            }
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("installedVersion", version);
        map.put("driverVersion", result);

        return map;
    }

    /**
     * @DATE 2020. 1. 21.
     * @DESC Download ChromeDriver
     * @param version
     */
    public static void driverDownload( Map<String, Object> paramMap ) {

        final String driverVersion = paramMap.get("driverVersion").toString();
        final String installedVersion = paramMap.get("installedVersion").toString();
        try {
            final AsyncHttpClient client = Dsl.asyncHttpClient();
            //FileOutputStream fileOutputStream = new FileOutputStream("C:\\Users\\BOOK_JONG\\Documents\\Streamingway\\chromeDriver.zip");
            final FileOutputStream fileOutputStream = new FileOutputStream(DEFAULT_PATH+"\\chromeDriver"+installedVersion+".zip");
            client.prepareGet("https://chromedriver.storage.googleapis.com/"+driverVersion+"chromedriver_win32.zip").execute(new AsyncCompletionHandler<FileOutputStream>() {

                @Override
                public State onBodyPartReceived(HttpResponseBodyPart bodyPart)
                  throws Exception {
                    fileOutputStream.getChannel().write(bodyPart.getBodyByteBuffer());
                    return State.CONTINUE;
                }

                @Override
                public FileOutputStream onCompleted(Response response)
                  throws Exception {


                    if ( fileOutputStream.getChannel().size() < 500 ) {
                        System.out.println("[ FAILE :: DOWNLOAD] DriverVersion "+driverVersion+" Not Find !!");
                        /*
                        System.out.println("[ RESEARCH :: DOWNLOAD] "+version+" => "+version.substring(version.length()-1)+" Change !");
                        fileOutputStream.close();
                        client.close();
                        driverDownload(version.substring(0, version.length()-1));*/
                    } else {
                        fileOutputStream.close();
                        System.out.println("[ SUCCESS :: DOWNLOAD] Completed !! ");
                        ZipUtils.unZip(DEFAULT_PATH+"\\chromeDriver"+installedVersion+".zip");
                    }

                    return fileOutputStream;
                }
            });


        } catch (FileNotFoundException e) {
            System.out.println("[ ERROR :: DOWNLOAD ] File Not Found !! ");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    /**
     * @DATE 2020. 1. 21.
     * @DESC Set Chrome Slelnum
     */
    public static void setChromeSelenium() {

        String installedVersion = getChromeVersion();

        if ( !findLocalDirverChrome(installedVersion) ) {
            driverDownload( findDriverChrome(installedVersion) );
        }else {
            System.out.println("[ SUCCESS :: Installed]");
        }
    }

    /**
     * @DATE 2020. 1. 21.
     * @DESC Selenium Chrome Start
     * @param options
     * @return
     */
    public static WebDriver initSeleniumChrome(ChromeOptions options) {

        System.setProperty("webdriver.chrome.driver", DEFAULT_PATH+"\\chromedriver.exe");
        WebDriver driver = new ChromeDriver(options);

        return driver;
    }

}
