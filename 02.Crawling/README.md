
기본 사용법.


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

===============================================================

[CrawlingUtls]
=============================
METHOD : getChromeVersion
DSC    :Local Installed Chrome Get Version
=============================

=============================
METHOD : findLocalDirverChrome
DSC    :Find Local Chrome Driver
=============================

=============================
METHOD : findDriverChrome
DSC    :Find Chrome Driver Version
=============================

=============================
METHOD : driverDownload
DSC    :Download ChromeDriver
=============================

=============================
METHOD : setChromeSelenium
DSC    :Set Chrome Slelnum
=============================

=============================
METHOD : initSeleniumChrome
DSC    :Selenium Chrome Start
=============================


[ZipUtils]
=============================
METHOD : unZip
DSC    :UnZip
=============================
