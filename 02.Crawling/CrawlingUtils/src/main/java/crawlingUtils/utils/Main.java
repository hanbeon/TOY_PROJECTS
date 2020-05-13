package crawlingUtils.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Main {

    public static final String DEFAULT_URL = "https://www.youtube.com/user/";
    public static final String DEFAULT_URL_END = "/community";

    public static final WebDriver DRIVER = CrawlingUtils.initSeleniumChrome(new ChromeOptions().addArguments("headless"));
    public static WebDriverWait WAIT = new WebDriverWait(DRIVER, 10);
    public static final String BASE_DIR = System.getProperty("user.dir");

    public static void main(String[] args) {
        // TODO Auto-generated method stub
    }

}
